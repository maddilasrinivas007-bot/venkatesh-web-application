import { prisma } from '@nyayaai/database';
import { CaseStatus, CasePriority } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';

export async function getCases(userId: string, role: string) {
  const where = role === 'ADVOCATE'
    ? { advocateId: userId }
    : { clientId: userId };

  return prisma.case.findMany({
    where,
    orderBy: { updatedAt: 'desc' },
    include: {
      client: { select: { profile: { select: { firstName: true, lastName: true } } } },
      advocate: { select: { profile: { select: { firstName: true, lastName: true } } } },
      _count: { select: { documents: true, timeline: true } },
    },
  });
}

export async function getCaseById(caseId: string, userId: string) {
  const caseRecord = await prisma.case.findFirst({
    where: {
      id: caseId,
      OR: [{ clientId: userId }, { advocateId: userId }],
    },
    include: {
      client: { select: { profile: true, email: true } },
      advocate: { select: { profile: true, email: true } },
      documents: { orderBy: { createdAt: 'desc' } },
      timeline: { orderBy: { eventDate: 'desc' } },
      notes: { orderBy: { createdAt: 'desc' } },
    },
  });

  if (!caseRecord) throw new AppError(404, 'Case not found');
  return caseRecord;
}

export async function createCase(data: {
  title: string;
  description?: string;
  category?: string;
  clientId: string;
  priority?: CasePriority;
  courtName?: string;
}) {
  return prisma.case.create({
    data: {
      title: data.title,
      description: data.description,
      category: data.category,
      clientId: data.clientId,
      priority: data.priority || 'MEDIUM',
      courtName: data.courtName,
      status: 'ACTIVE',
    },
    include: {
      timeline: true,
    },
  });
}

export async function updateCaseStatus(caseId: string, userId: string, status: CaseStatus) {
  const existing = await prisma.case.findFirst({
    where: { id: caseId, OR: [{ clientId: userId }, { advocateId: userId }] },
  });
  if (!existing) throw new AppError(404, 'Case not found');

  return prisma.case.update({
    where: { id: caseId },
    data: { status },
  });
}

export async function addTimelineEvent(caseId: string, userId: string, data: {
  title: string;
  description?: string;
  eventDate: Date;
}) {
  const existing = await prisma.case.findFirst({
    where: { id: caseId, OR: [{ clientId: userId }, { advocateId: userId }] },
  });
  if (!existing) throw new AppError(404, 'Case not found');

  return prisma.caseTimeline.create({
    data: { caseId, ...data },
  });
}
