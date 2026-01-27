export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  price: number;
  image: string;
  availability: 'Online' | 'Busy';
  ratingCount: number;
  education: string;
  verified: boolean;
}

export const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Zaky Ainur Rahman',
    specialty: 'Dokter Umum',
    experience: '2 Tahun',
    rating: 4.8,
    price: 20000,
    image: 'https://i.pravatar.cc/150?img=14',
    availability: 'Online',
    ratingCount: 150,
    education: 'Universitas Veteran Jawa Timur',
    verified: true,
  },
  {
    id: 2,
    name: 'Dr. Nizar Hakim',
    specialty: 'Dokter Anak',
    experience: '5 Tahun',
    rating: 4.9,
    price: 35000,
    image: 'https://i.pravatar.cc/150?img=12',
    availability: 'Online',
    ratingCount: 230,
    education: 'Universitas Airlangga',
    verified: true,
  },
  {
    id: 3,
    name: 'Dr. Iren Sari',
    specialty: 'Psikolog Anak',
    experience: '3 Tahun',
    rating: 4.7,
    price: 40000,
    image: 'https://i.pravatar.cc/150?img=32',
    availability: 'Busy',
    ratingCount: 180,
    education: 'Universitas Indonesia',
    verified: true,
  },
];
