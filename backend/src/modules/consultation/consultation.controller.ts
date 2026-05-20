import { Request, Response, NextFunction } from 'express';
import { consultationService } from './consultation.service';
import { sendSuccess } from '../../utils/apiResponse';

export class ConsultationController {
  async listDoctors(_req: Request, res: Response, next: NextFunction) {
    try {
      const doctors = await consultationService.listDoctors();
      sendSuccess({ res, message: 'Daftar dokter', data: doctors });
    } catch (error) { next(error); }
  }

  async getDoctorDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const doctor = await consultationService.getDoctorDetail(req.params.id as string);
      sendSuccess({ res, message: 'Detail dokter', data: doctor });
    } catch (error) { next(error); }
  }

  async bookAppointment(req: Request, res: Response, next: NextFunction) {
    try {
      const { doctorId, childId, date, time, notes } = req.body;
      const appointment = await consultationService.bookAppointment(doctorId, childId, date, time, notes);
      sendSuccess({ res, statusCode: 201, message: 'Appointment berhasil dibuat', data: appointment });
    } catch (error) { next(error); }
  }

  async listAppointments(req: Request, res: Response, next: NextFunction) {
    try {
      const appointments = await consultationService.listAppointments(req.user!.userId);
      sendSuccess({ res, message: 'Daftar appointment', data: appointments });
    } catch (error) { next(error); }
  }

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await consultationService.updateAppointmentStatus(req.params.id as string, req.body.status);
      sendSuccess({ res, message: 'Status diperbarui', data: result });
    } catch (error) { next(error); }
  }

  async createPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const payment = await consultationService.createPayment(req.body.appointmentId, req.body.amount, req.body.method);
      sendSuccess({ res, statusCode: 201, message: 'Payment berhasil dibuat', data: payment });
    } catch (error) { next(error); }
  }

  async getChat(req: Request, res: Response, next: NextFunction) {
    try {
      const messages = await consultationService.getChatMessages(req.params.id as string);
      sendSuccess({ res, message: 'Chat messages', data: messages });
    } catch (error) { next(error); }
  }

  async sendMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const message = await consultationService.sendMessage(req.params.id as string, req.user!.userId, req.body.content, req.body.type);
      sendSuccess({ res, statusCode: 201, message: 'Pesan terkirim', data: message });
    } catch (error) { next(error); }
  }
}

export const consultationController = new ConsultationController();
