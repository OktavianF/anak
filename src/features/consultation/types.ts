// Consultation feature types
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  price: number;
  image: string;
  experience: number;
  bio: string;
  availableSlots: TimeSlot[];
}

export interface TimeSlot {
  date: string;
  time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  doctorId: string;
  childId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file';
}
