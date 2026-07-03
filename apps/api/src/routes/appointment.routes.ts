import { Router } from 'express';
import { z } from 'zod';
import { AppointmentStatus } from '@prisma/client';
import * as appointmentService from '../services/appointment.service';
import { authenticate, AuthRequest } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

router.use(authenticate);

router.get(
  '/',
  asyncHandler(async (req: AuthRequest, res) => {
    const appointments = await appointmentService.getAppointments(
      req.authUser!.userId,
      req.authUser!.role
    );
    res.json({ success: true, data: appointments });
  })
);

router.post(
  '/',
  asyncHandler(async (req: AuthRequest, res) => {
    const data = z.object({
      advocateId: z.string().uuid(),
      scheduledAt: z.string().transform((s) => new Date(s)),
      duration: z.number().optional(),
      type: z.string().optional(),
      notes: z.string().optional(),
    }).parse(req.body);

    const appointment = await appointmentService.createAppointment({
      ...data,
      clientId: req.authUser!.userId,
    });
    res.status(201).json({ success: true, data: appointment });
  })
);

router.patch(
  '/:id/status',
  asyncHandler(async (req: AuthRequest, res) => {
    const { status } = z.object({ status: z.nativeEnum(AppointmentStatus) }).parse(req.body);
    const updated = await appointmentService.updateAppointmentStatus(
      String(req.params.id),
      req.authUser!.userId,
      status
    );
    res.json({ success: true, data: updated });
  })
);

router.get(
  '/notifications',
  asyncHandler(async (req: AuthRequest, res) => {
    const notifications = await appointmentService.getNotifications(req.authUser!.userId);
    res.json({ success: true, data: notifications });
  })
);

export default router;
