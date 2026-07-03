import { Router } from 'express';
import authRoutes from './auth.routes';
import aiRoutes from './ai.routes';
import legalRoutes from './legal.routes';
import adminRoutes from './admin.routes';
import caseRoutes from './case.routes';
import appointmentRoutes from './appointment.routes';
import contentRoutes from './content.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/ai', aiRoutes);
router.use('/legal', legalRoutes);
router.use('/admin', adminRoutes);
router.use('/cases', caseRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/content', contentRoutes);

router.get('/health', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      service: 'NyayaAI API',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    },
  });
});

export default router;
