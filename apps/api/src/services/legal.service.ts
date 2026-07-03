import { prisma } from '@nyayaai/database';
import { CourtType, LegislationCategory } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';

export async function searchJudgments(filters: {
  court?: CourtType;
  judge?: string;
  citation?: string;
  year?: number;
  subject?: string;
  statute?: string;
  keywords?: string;
  page?: number;
  limit?: number;
}) {
  const page = filters.page || 1;
  const limit = Math.min(filters.limit || 20, 100);
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};

  if (filters.court) where.court = filters.court;
  if (filters.year) where.year = filters.year;
  if (filters.subject) where.subject = { contains: filters.subject, mode: 'insensitive' };
  if (filters.citation) where.citation = { contains: filters.citation, mode: 'insensitive' };
  if (filters.judge) where.judges = { has: filters.judge };
  if (filters.statute) where.statutes = { has: filters.statute };
  if (filters.keywords) {
    where.OR = [
      { title: { contains: filters.keywords, mode: 'insensitive' } },
      { summary: { contains: filters.keywords, mode: 'insensitive' } },
      { subject: { contains: filters.keywords, mode: 'insensitive' } },
    ];
  }

  const [judgments, total] = await Promise.all([
    prisma.judgment.findMany({
      where,
      skip,
      take: limit,
      orderBy: { judgmentDate: 'desc' },
      select: {
        id: true,
        title: true,
        citation: true,
        court: true,
        courtName: true,
        judges: true,
        year: true,
        subject: true,
        summary: true,
        isLandmark: true,
        judgmentDate: true,
      },
    }),
    prisma.judgment.count({ where }),
  ]);

  return {
    data: judgments,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
}

export async function getJudgmentById(id: string) {
  const judgment = await prisma.judgment.findUnique({ where: { id } });
  if (!judgment) throw new AppError(404, 'Judgment not found');
  return judgment;
}

export async function getLandmarkJudgments(limit = 10) {
  return prisma.judgment.findMany({
    where: { isLandmark: true },
    take: limit,
    orderBy: { year: 'desc' },
    select: {
      id: true,
      title: true,
      citation: true,
      court: true,
      year: true,
      subject: true,
      summary: true,
      judgmentDate: true,
    },
  });
}

export async function searchLegislation(filters: {
  category?: LegislationCategory;
  keywords?: string;
  year?: number;
  page?: number;
  limit?: number;
}) {
  const page = filters.page || 1;
  const limit = Math.min(filters.limit || 20, 100);
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = { isActive: true };
  if (filters.category) where.category = filters.category;
  if (filters.year) where.year = filters.year;
  if (filters.keywords) {
    where.OR = [
      { title: { contains: filters.keywords, mode: 'insensitive' } },
      { shortTitle: { contains: filters.keywords, mode: 'insensitive' } },
      { content: { contains: filters.keywords, mode: 'insensitive' } },
    ];
  }

  const [legislations, total] = await Promise.all([
    prisma.legislation.findMany({ where, skip, take: limit, orderBy: { year: 'desc' } }),
    prisma.legislation.count({ where }),
  ]);

  return {
    data: legislations,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
}

export async function getConstitutionArticles(filters?: {
  part?: string;
  fundamentalRights?: boolean;
  keywords?: string;
}) {
  const where: Record<string, unknown> = {};
  if (filters?.part) where.part = filters.part;
  if (filters?.fundamentalRights) where.isFundamentalRight = true;
  if (filters?.keywords) {
    where.OR = [
      { title: { contains: filters.keywords, mode: 'insensitive' } },
      { content: { contains: filters.keywords, mode: 'insensitive' } },
      { articleNumber: { contains: filters.keywords } },
    ];
  }

  return prisma.constitutionArticle.findMany({
    where,
    orderBy: { articleNumber: 'asc' },
  });
}

export async function getAdvocates(filters?: {
  practiceArea?: string;
  city?: string;
  minRating?: number;
  page?: number;
  limit?: number;
}) {
  const page = filters?.page || 1;
  const limit = Math.min(filters?.limit || 20, 50);
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {
    verificationStatus: 'VERIFIED',
    isAvailable: true,
  };
  if (filters?.practiceArea) {
    where.practiceAreas = { has: filters.practiceArea };
  }
  if (filters?.minRating) {
    where.rating = { gte: filters.minRating };
  }

  const advocates = await prisma.advocateProfile.findMany({
    where,
    skip,
    take: limit,
    orderBy: { rating: 'desc' },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          avatarUrl: true,
          profile: { select: { firstName: true, lastName: true, city: true, state: true } },
        },
      },
    },
  });

  let filtered = advocates;
  if (filters?.city) {
    filtered = advocates.filter(
      (a: (typeof advocates)[number]) => a.user.profile?.city?.toLowerCase() === filters.city!.toLowerCase()
    );
  }

  return { data: filtered, meta: { page, limit, total: filtered.length } };
}
