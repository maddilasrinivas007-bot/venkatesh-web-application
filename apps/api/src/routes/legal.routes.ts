import { Router } from 'express';
import { z } from 'zod';
import { CourtType } from '@prisma/client';
import * as legalService from '../services/legal.service';
import { optionalAuth } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

router.get(
  '/judgments',
  optionalAuth,
  asyncHandler(async (req, res) => {
    const filters = {
      court: req.query.court as CourtType | undefined,
      judge: req.query.judge as string | undefined,
      citation: req.query.citation as string | undefined,
      year: req.query.year ? parseInt(req.query.year as string) : undefined,
      subject: req.query.subject as string | undefined,
      statute: req.query.statute as string | undefined,
      keywords: req.query.q as string | undefined,
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 20,
    };
    const result = await legalService.searchJudgments(filters);
    res.json({ success: true, ...result });
  })
);

router.get(
  '/judgments/landmark',
  asyncHandler(async (_req, res) => {
    const judgments = await legalService.getLandmarkJudgments();
    res.json({ success: true, data: judgments });
  })
);

router.get(
  '/judgments/:id',
  asyncHandler(async (req, res) => {
    const judgment = await legalService.getJudgmentById(String(req.params.id));
    res.json({ success: true, data: judgment });
  })
);

router.get(
  '/legislation',
  asyncHandler(async (req, res) => {
    const result = await legalService.searchLegislation({
      category: req.query.category as never,
      keywords: req.query.q as string | undefined,
      year: req.query.year ? parseInt(req.query.year as string) : undefined,
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 20,
    });
    res.json({ success: true, ...result });
  })
);

router.get(
  '/constitution',
  asyncHandler(async (req, res) => {
    const articles = await legalService.getConstitutionArticles({
      part: req.query.part as string | undefined,
      fundamentalRights: req.query.fundamentalRights === 'true',
      keywords: req.query.q as string | undefined,
    });
    res.json({ success: true, data: articles });
  })
);

router.get(
  '/advocates',
  asyncHandler(async (req, res) => {
    const result = await legalService.getAdvocates({
      practiceArea: req.query.practiceArea as string | undefined,
      city: req.query.city as string | undefined,
      minRating: req.query.minRating ? parseFloat(req.query.minRating as string) : undefined,
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 20,
    });
    res.json({ success: true, ...result });
  })
);

export default router;
