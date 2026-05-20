import prisma from '../../config/database';
import { NotFoundError } from '../../utils/errors';

export class ConsultationService {
  async listDoctors() {
    return prisma.anak_doctors.findMany({ orderBy: { rating: 'desc' } });
  }

  async getDoctorDetail(doctorId: string) {
    const doctor = await prisma.anak_doctors.findUnique({
      where: { id: doctorId },
      include: { time_slots: { where: { available: true }, orderBy: { date: 'asc' } } },
    });
    if (!doctor) throw new NotFoundError('Dokter tidak ditemukan');
    return doctor;
  }

  async bookAppointment(doctorId: string, childId: string, date: string, time: string, notes?: string) {
    const doctor = await prisma.anak_doctors.findUnique({ where: { id: doctorId } });
    if (!doctor) throw new NotFoundError('Dokter tidak ditemukan');

    return prisma.anak_appointments.create({
      data: { doctor_id: doctorId, child_id: childId, date: new Date(date), time, notes },
      include: { doctor: true },
    });
  }

  async listAppointments(parentId: string) {
    const children = await prisma.anak_children.findMany({
      where: { parent_id: parentId }, select: { id: true },
    });
    const childIds = children.map((c) => c.id);

    return prisma.anak_appointments.findMany({
      where: { child_id: { in: childIds } },
      include: { doctor: true, child: true, payment: true },
      orderBy: { created_at: 'desc' },
    });
  }

  async updateAppointmentStatus(appointmentId: string, status: 'CONFIRMED' | 'COMPLETED' | 'CANCELLED') {
    return prisma.anak_appointments.update({
      where: { id: appointmentId },
      data: { status, updated_at: new Date() },
    });
  }

  async createPayment(appointmentId: string, amount: number, method?: string) {
    return prisma.anak_payments.create({
      data: { appointment_id: appointmentId, amount, method },
    });
  }

  async getChatMessages(appointmentId: string) {
    return prisma.anak_chat_messages.findMany({
      where: { appointment_id: appointmentId },
      orderBy: { created_at: 'asc' },
    });
  }

  async sendMessage(appointmentId: string, senderId: string, content: string, type: 'TEXT' | 'IMAGE' | 'FILE' = 'TEXT') {
    return prisma.anak_chat_messages.create({
      data: { appointment_id: appointmentId, sender_id: senderId, content, type },
    });
  }
}

export const consultationService = new ConsultationService();
