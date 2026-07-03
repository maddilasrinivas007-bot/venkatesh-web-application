import { Router } from 'express';
import { prisma } from '@nyayaai/database';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { UserRole } from '@nyayaai/shared';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

router.use(authenticate);
router.use(authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN));

router.get(
  '/stats',
  asyncHandler(async (_req, res) => {
    const [users, advocates, judgments, documents, conversations] = await Promise.all([
      prisma.user.count(),
      prisma.advocateProfile.count({ where: { verificationStatus: 'VERIFIED' } }),
      prisma.judgment.count(),
      prisma.document.count(),
      prisma.conversation.count(),
    ]);

    res.json({
      success: true,
      data: { users, advocates, judgments, documents, conversations },
    });
  })
);

router.get(
  '/users',
  asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = Math.min(parseInt(req.query.limit as string) || 20, 100);
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          role: true,
          status: true,
          createdAt: true,
          profile: { select: { firstName: true, lastName: true } },
        },
      }),
      prisma.user.count(),
    ]);

    res.json({
      success: true,
      data: users,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  })
);

router.patch(
  '/advocates/:id/verify',
  asyncHandler(async (req: AuthRequest, res) => {
    const { status } = req.body as { status: 'VERIFIED' | 'REJECTED' };
    const profile = await prisma.advocateProfile.update({
      where: { id: String(req.params.id) },
      data: { verificationStatus: status },
    });

    await prisma.auditLog.create({
      data: {
        userId: req.authUser!.userId,
        action: 'ADVOCATE_VERIFICATION',
        resource: 'advocate_profile',
        resourceId: profile.id,
        details: { status },
      },
    });

    res.json({ success: true, data: profile });
  })
);

router.get(
  '/audit-logs',
  asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 50;
    const skip = (page - 1) * limit;

    const logs = await prisma.auditLog.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { email: true, profile: { select: { firstName: true, lastName: true } } } },
      },
    });

    res.json({ success: true, data: logs });
  })
);

export default router;
