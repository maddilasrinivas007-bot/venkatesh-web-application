import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '@nyayaai/database';
import { aiService } from '../services/ai.service';
import { authenticate, AuthRequest } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

const querySchema = z.object({
  query: z.string().min(3).max(2000),
  conversationId: z.string().uuid().optional(),
});

router.post(
  '/chat',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const { query, conversationId } = querySchema.parse(req.body);
    const userId = req.authUser!.userId;

    let conversation;
    if (conversationId) {
      conversation = await prisma.conversation.findFirst({
        where: { id: conversationId, userId: req.authUser!.userId },
      });
    }

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          userId,
          title: query.slice(0, 100),
        },
      });
    }

    await prisma.aIMessage.create({
      data: {
        conversationId: conversation.id,
        role: 'user',
        content: query,
      },
    });

    const aiResponse = await aiService.queryLegalAssistant(query);

    const assistantMessage = await prisma.aIMessage.create({
      data: {
        conversationId: conversation.id,
        role: 'assistant',
        content: aiResponse.answer,
        citations: JSON.parse(JSON.stringify({
          constitutional: aiResponse.constitutionalProvisions,
          statutory: aiResponse.statutoryProvisions,
          precedents: aiResponse.judicialPrecedents,
        })),
        metadata: JSON.parse(JSON.stringify({
          practicalGuidance: aiResponse.practicalGuidance,
          requiredDocuments: aiResponse.requiredDocuments,
          authorities: aiResponse.authorities,
          proceduralRoadmap: aiResponse.proceduralRoadmap,
          estimatedTimeline: aiResponse.estimatedTimeline,
          potentialRisks: aiResponse.potentialRisks,
          confidence: aiResponse.confidence,
        })),
      },
    });

    res.json({
      success: true,
      data: {
        conversationId: conversation.id,
        response: aiResponse,
        messageId: assistantMessage.id,
      },
    });
  })
);

router.post(
  '/public-chat',
  asyncHandler(async (req, res) => {
    const { query } = z.object({ query: z.string().min(3).max(500) }).parse(req.body);
    const response = await aiService.queryLegalAssistant(query);
    res.json({ success: true, data: response });
  })
);

router.get(
  '/conversations',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const conversations = await prisma.conversation.findMany({
      where: { userId: req.authUser!.userId },
      orderBy: { updatedAt: 'desc' },
      include: {
        messages: { take: 1, orderBy: { createdAt: 'desc' } },
        _count: { select: { messages: true } },
      },
    });
    res.json({ success: true, data: conversations });
  })
);

router.get(
  '/conversations/:id',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const conversation = await prisma.conversation.findFirst({
      where: { id: String(req.params.id), userId: req.authUser!.userId },
      include: { messages: { orderBy: { createdAt: 'asc' } } },
    });
    if (!conversation) {
      res.status(404).json({ success: false, error: 'Conversation not found' });
      return;
    }
    res.json({ success: true, data: conversation });
  })
);

router.post(
  '/summarize',
  authenticate,
  asyncHandler(async (req, res) => {
    const { text } = z.object({ text: z.string().min(50) }).parse(req.body);
    const summary = await aiService.summarizeJudgment(text);
    res.json({ success: true, data: { summary } });
  })
);

router.post(
  '/generate-document',
  authenticate,
  asyncHandler(async (req, res) => {
    const { type, details } = z
      .object({
        type: z.string(),
        details: z.record(z.string()),
      })
      .parse(req.body);

    const content = await aiService.generateDocument(type, details);
    res.json({ success: true, data: { content, type } });
  })
);

router.post(
  '/review-contract',
  authenticate,
  asyncHandler(async (req, res) => {
    const { text } = z.object({ text: z.string().min(100) }).parse(req.body);
    const analysis = await aiService.reviewContract(text);
    res.json({ success: true, data: analysis });
  })
);

export default router;
