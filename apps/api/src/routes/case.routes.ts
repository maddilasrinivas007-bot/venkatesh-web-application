import { Router } from 'express';
import { z } from 'zod';
import { CaseStatus, CasePriority } from '@prisma/client';
import * as caseService from '../services/case.service';
import { authenticate, AuthRequest } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

router.use(authenticate);

router.get(
  '/',
  asyncHandler(async (req: AuthRequest, res) => {
    const cases = await caseService.getCases(req.authUser!.userId, req.authUser!.role);
    res.json({ success: true, data: cases });
  })
);

router.get(
  '/:id',
  asyncHandler(async (req: AuthRequest, res) => {
    const caseRecord = await caseService.getCaseById(String(req.params.id), req.authUser!.userId);
    res.json({ success: true, data: caseRecord });
  })
);

router.post(
  '/',
  asyncHandler(async (req: AuthRequest, res) => {
    const data = z.object({
      title: z.string().min(3),
      description: z.string().optional(),
      category: z.string().optional(),
      priority: z.nativeEnum(CasePriority).optional(),
      courtName: z.string().optional(),
    }).parse(req.body);

    const caseRecord = await caseService.createCase({
      ...data,
      clientId: req.authUser!.userId,
    });
    res.status(201).json({ success: true, data: caseRecord });
  })
);

router.patch(
  '/:id/status',
  asyncHandler(async (req: AuthRequest, res) => {
    const { status } = z.object({ status: z.nativeEnum(CaseStatus) }).parse(req.body);
    const updated = await caseService.updateCaseStatus(
      String(req.params.id),
      req.authUser!.userId,
      status
    );
    res.json({ success: true, data: updated });
  })
);

router.post(
  '/:id/timeline',
  asyncHandler(async (req: AuthRequest, res) => {
    const data = z.object({
      title: z.string().min(1),
      description: z.string().optional(),
      eventDate: z.string().transform((s) => new Date(s)),
    }).parse(req.body);

    const event = await caseService.addTimelineEvent(
      String(req.params.id),
      req.authUser!.userId,
      data
    );
    res.status(201).json({ success: true, data: event });
  })
);

export default router;
