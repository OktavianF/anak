export interface ChcDomain {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  borderColor: string;
  shadowColor: string;
  gameScreen: string;
  childFriendlyTitle: string;
}

/**
 * 3 Domain CHC yang didukung:
 * - Gf  (Fluid Reasoning)    - Penalaran Logis
 * - Gv  (Visual Processing)  - Pemrosesan Visual
 * - Gsm (Working Memory)     - Memori Kerja
 */
export const chcDomainsData: ChcDomain[] = [
  {
    id: 'fluid-reasoning',
    title: 'Puzzle & Logic',
    subtitle: 'Gf',
    description: 'Ayo berpikir seperti detektif! 🕵️',
    icon: '🧩',
    color: 'from-blue-400 via-indigo-500 to-purple-500',
    borderColor: 'border-blue-300',
    shadowColor: 'shadow-blue-300/40',
    gameScreen: 'number-sequence-game',
    childFriendlyTitle: 'Detektif Pintar',
  },
  {
    id: 'visual-processing',
    title: 'Magic Eyes',
    subtitle: 'Gv',
    description: 'Lihat dunia dengan mata ajaib! 👁️✨',
    icon: '👁️',
    color: 'from-cyan-400 via-teal-500 to-blue-600',
    borderColor: 'border-cyan-300',
    shadowColor: 'shadow-cyan-300/40',
    gameScreen: 'pattern-recognition-game',
    childFriendlyTitle: 'Mata Ajaib',
  },
  {
    id: 'working-memory',
    title: 'Memory Palace',
    subtitle: 'Gsm',
    description: 'Bangun istana memori super kuat! 🏰',
    icon: '🧠',
    color: 'from-emerald-400 via-green-500 to-teal-600',
    borderColor: 'border-emerald-300',
    shadowColor: 'shadow-emerald-300/40',
    gameScreen: 'memory-game',
    childFriendlyTitle: 'Raja Memori',
  },
];
