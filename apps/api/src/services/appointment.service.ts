import { prisma } from '@nyayaai/database';
import { AppointmentStatus } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';

export async function getAppointments(userId: string, role: string) {
  const where = role === 'ADVOCATE'
    ? { advocateId: userId }
    : { clientId: userId };

  return prisma.appointment.findMany({
    where,
    orderBy: { scheduledAt: 'desc' },
    include: {
      client: { select: { profile: { select: { firstName: true, lastName: true } }, email: true } },
      advocate: { select: { profile: { select: { firstName: true, lastName: true } }, email: true } },
    },
  });
}

export async function createAppointment(data: {
  clientId: string;
  advocateId: string;
  scheduledAt: Date;
  duration?: number;
  type?: string;
  notes?: string;
}) {
  const advocate = await prisma.advocateProfile.findFirst({
    where: { userId: data.advocateId, verificationStatus: 'VERIFIED', isAvailable: true },
  });
  if (!advocate) throw new AppError(404, 'Advocate not available');

  return prisma.appointment.create({
    data: {
      clientId: data.clientId,
      advocateId: data.advocateId,
      scheduledAt: data.scheduledAt,
      duration: data.duration || 30,
      type: data.type || 'video',
      notes: data.notes,
      fee: advocate.consultationFee,
      status: 'SCHEDULED',
    },
    include: {
      advocate: { select: { profile: { select: { firstName: true, lastName: true } } } },
    },
  });
}

export async function updateAppointmentStatus(
  appointmentId: string,
  userId: string,
  status: AppointmentStatus
) {
  const appointment = await prisma.appointment.findFirst({
    where: {
      id: appointmentId,
      OR: [{ clientId: userId }, { advocateId: userId }],
    },
  });
  if (!appointment) throw new AppError(404, 'Appointment not found');

  return prisma.appointment.update({
    where: { id: appointmentId },
    data: { status },
  });
}

export async function getNotifications(userId: string, limit = 20) {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

export async function markNotificationRead(notificationId: string, userId: string) {
  return prisma.notification.updateMany({
    where: { id: notificationId, userId },
    data: { isRead: true },
  });
}
