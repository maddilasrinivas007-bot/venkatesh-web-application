import { Router } from 'express';
import { prisma } from '@nyayaai/database';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

router.get(
  '/blog',
  asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 20);
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where: { isPublished: true },
        skip,
        take: limit,
        orderBy: { publishedAt: 'desc' },
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          coverImage: true,
          author: true,
          tags: true,
          publishedAt: true,
        },
      }),
      prisma.blogPost.count({ where: { isPublished: true } }),
    ]);

    res.json({ success: true, data: posts, meta: { page, limit, total } });
  })
);

router.get(
  '/blog/:slug',
  asyncHandler(async (req, res) => {
    const post = await prisma.blogPost.findFirst({
      where: { slug: String(req.params.slug), isPublished: true },
    });
    if (!post) {
      res.status(404).json({ success: false, error: 'Post not found' });
      return;
    }
    res.json({ success: true, data: post });
  })
);

router.get(
  '/notifications',
  asyncHandler(async (req, res) => {
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 50);
    const notifications = await prisma.governmentNotification.findMany({
      take: limit,
      orderBy: { publishedAt: 'desc' },
    });
    res.json({ success: true, data: notifications });
  })
);

router.post(
  '/newsletter',
  asyncHandler(async (req, res) => {
    const { email } = req.body as { email: string };
    if (!email || !email.includes('@')) {
      res.status(400).json({ success: false, error: 'Valid email required' });
      return;
    }
    res.json({ success: true, message: 'Successfully subscribed to NyayaAI newsletter' });
  })
);

export default router;
