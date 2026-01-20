<div align="center">

# ANAK

### Aplikasi Edukatif untuk Tumbuh Kembang Anak Indonesia

[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](https://github.com/your-repo/anak)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB.svg?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

[Demo](https://anak-demo.vercel.app) · [Dokumentasi](docs/) · [Laporkan Bug](https://github.com/your-repo/anak/issues) · [Request Fitur](https://github.com/your-repo/anak/issues)

</div>

---

## Tentang Proyek

**ANAK** adalah platform edukasi digital yang dirancang khusus untuk mendukung tumbuh kembang anak usia dini di Indonesia. Aplikasi ini menggabungkan pendekatan **gamifikasi** dengan **asesmen psikologis berbasis Cattell-Horn-Carroll (CHC) Theory** untuk memberikan pengalaman belajar yang menyenangkan sekaligus terukur.

### Mengapa ANAK?

- **Berbasis Riset** — Asesmen dikembangkan berdasarkan teori psikologi perkembangan anak yang tervalidasi
- **Lokal & Relevan** — Konten disesuaikan dengan konteks budaya dan kurikulum Indonesia  
- **Child-Safe** — Sistem PIN untuk memisahkan akses anak dan orang tua
- **Gamifikasi** — Sistem reward dan achievement untuk meningkatkan engagement

---

## Fitur

<table>
<tr>
<td width="50%">

### Mode Anak

**Permainan Edukatif**
- Puzzle & Pattern Recognition
- Memory Training Games
- Word & Number Sequences
- Creative Coloring

**Asesmen Perkembangan**
- Kognitif (CHC-based)
- Linguistik
- Motorik
- Kepribadian & Minat Bakat

**Gamifikasi**
- Koleksi Stiker Digital
- Progress Tracking
- Achievement System

</td>
<td width="50%">

### Mode Orang Tua

**Dashboard & Monitoring**
- Laporan Perkembangan Anak
- Visualisasi Data & Grafik
- Rekomendasi Aktivitas

**Konsultasi Profesional**
- Direktori Psikolog Anak
- Sistem Booking Konsultasi
- Riwayat Konsultasi

**Komunitas**
- Forum Diskusi
- Artikel Parenting
- Tips & Panduan

</td>
</tr>
</table>

---

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| **Framework** | React 18.3 + TypeScript 5.9 |
| **Build Tool** | Vite 6.3 (SWC) |
| **Styling** | Tailwind CSS 3.x |
| **UI Components** | Radix UI Primitives |
| **Animation** | Framer Motion |
| **Charts** | Recharts |
| **Forms** | React Hook Form |
| **Icons** | Lucide React |

---

## Arsitektur

Proyek menggunakan **Feature-Sliced Design** untuk skalabilitas dan maintainability.

```
src/
├── app/                      # Application layer
│   ├── App.tsx              # Root component & routing
│   └── screens/             # Screen composition
│
├── features/                 # Feature modules
│   ├── auth/                # Authentication & onboarding
│   ├── children/            # Child profile management
│   ├── games/               # Educational games
│   ├── assessments/         # Developmental assessments
│   ├── reports/             # Progress reports
│   ├── consultation/        # Professional consultation
│   └── community/           # Parent community
│
├── shared/                   # Shared resources
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base components (Radix)
│   │   └── figma/          # Design system components
│   └── hooks/               # Custom React hooks
│
├── lib/                      # External library configs
├── layouts/                  # Layout components
└── assets/                   # Static assets
```

### Custom Hooks

| Hook | Deskripsi |
|------|-----------|
| `useAuth` | Manajemen autentikasi, mode switching, PIN validation |
| `useChildProfile` | CRUD operasi profil anak |
| `useChc` | State management hasil tes CHC |
| `useChcAssessments` | Data asesmen perkembangan |
| `useNavigation` | Screen navigation state |
| `useStickers` | Sistem reward & notifikasi |

---

## Quick Start

### Prerequisites

- Node.js ≥ 18.0.0
- npm ≥ 9.0.0 atau yarn ≥ 1.22.0

### Installation

```bash
# Clone repository
git clone https://github.com/your-repo/anak.git
cd anak

# Install dependencies
npm install

# Start development server
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server dengan HMR |
| `npm run build` | Build production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint untuk type checking |
| `npm run lint:fix` | Auto-fix linting issues |
| `npm run format` | Format code dengan Prettier |

---

## Configuration

### Path Aliases

Proyek menggunakan path alias untuk clean imports:

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Usage:**
```typescript
import { Button } from '@/shared/components/ui';
import { useAuth } from '@/shared/hooks';
```

### Environment Variables

```env
# .env.example
VITE_API_BASE_URL=https://api.example.com
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

---

## Development Guidelines

### Code Style

- **Components**: Functional components dengan TypeScript interfaces
- **Naming**: PascalCase untuk komponen, camelCase untuk functions/variables
- **Exports**: Named exports untuk utilities, default exports untuk pages

### Commit Convention

```
<type>(<scope>): <subject>

Types: feat, fix, docs, style, refactor, test, chore
Example: feat(games): add new memory game level
```

### Branch Strategy

```
main          # Production-ready code
├── develop   # Integration branch
├── feature/* # New features
├── fix/*     # Bug fixes
└── release/* # Release preparation
```

---

## Deployment

### Production Build

```bash
npm run build
```

Output akan tersedia di folder `dist/`.

### Deployment Platforms

| Platform | Status | Config |
|----------|--------|--------|
| Vercel | Recommended | Zero-config |
| Netlify | Supported | `netlify.toml` |
| Docker | Supported | `Dockerfile` |

---

## Contributing

Kontribusi sangat diterima. Silakan baca [CONTRIBUTING.md](CONTRIBUTING.md) untuk panduan lengkap.

1. Fork repository
2. Buat feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m 'feat: add new feature'`)
4. Push ke branch (`git push origin feature/new-feature`)
5. Buat Pull Request

---

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

## Acknowledgments

- [Radix UI](https://www.radix-ui.com/) — Accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [Lucide](https://lucide.dev/) — Beautiful open-source icons
- [Framer Motion](https://www.framer.com/motion/) — Production-ready animations

---

<div align="center">

**ANAK** — Membangun Generasi Indonesia yang Cerdas dan Berkarakter

Dibuat untuk Kompetisi KMIPN 2026

</div>
