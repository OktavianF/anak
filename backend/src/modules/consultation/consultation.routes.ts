import { Router } from 'express';
import { consultationController } from './consultation.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/doctors', consultationController.listDoctors);
router.get('/doctors/:id', consultationController.getDoctorDetail);
router.post('/appointments', consultationController.bookAppointment);
router.get('/appointments', consultationController.listAppointments);
router.patch('/appointments/:id/status', consultationController.updateStatus);
router.post('/payments', consultationController.createPayment);
router.get('/appointments/:id/chat', consultationController.getChat);
router.post('/appointments/:id/chat', consultationController.sendMessage);

export default router;
