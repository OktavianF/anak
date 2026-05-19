# Games Feature - Modular Architecture

## Struktur Folder

```
src/features/games/
├── components/
│   ├── shared/                    # Komponen reusable untuk semua game
│   │   ├── index.ts              # Export semua shared components
│   │   ├── types.ts              # Type definitions
│   │   ├── GameLayout.tsx        # Layout wrapper
│   │   ├── GameHeader.tsx        # Header dengan back & reset
│   │   ├── GameStats.tsx         # Stats (level, score, lives, timer)
│   │   ├── GameStartScreen.tsx   # Intro screen sebelum game
│   │   ├── GameCompletionScreen.tsx # Screen setelah selesai
│   │   ├── DifficultyBadge.tsx   # Badge tingkat kesulitan
│   │   ├── LivesIndicator.tsx    # Indikator nyawa
│   │   ├── TimerDisplay.tsx      # Display countdown timer
│   │   ├── HintButton.tsx        # Tombol hint
│   │   ├── AnswerFeedback.tsx    # Feedback benar/salah
│   │   └── ChoiceButton.tsx      # Tombol pilihan jawaban
│   ├── DomainCard.tsx
│   ├── DomainIllustrations.tsx
│   └── index.ts
├── hooks/
│   ├── useGameState.ts           # State management untuk game
│   ├── useGameTimer.ts           # Timer management
│   ├── useGameAssessment.ts      # CHC assessment calculation
│   └── index.ts
├── pages/
│   ├── MemoryGameScreen.tsx      # (legacy)
│   ├── NumberSequenceGameScreen.tsx # (legacy)
│   ├── PatternRecognitionGameScreen.tsx # (legacy)
│   └── NumberSequenceGame.tsx    # (NEW - modular version)
├── constants/
│   ├── recommendationRules.ts
│   └── recommendationRulesV2.ts  # Age × Score matrix
├── types/
│   └── assessmentParams.ts
└── types.ts
```

## Cara Menggunakan Komponen

### 1. Basic Game Structure

```tsx
import {
  GameLayout,
  GameHeader,
  GameStats,
  GameStartScreen,
  GameCompletionScreen,
} from '../components/shared';
import { useGameState } from '../hooks';

export default function MyGame({ navigateTo, addSticker, updateGameAssessment }) {
  const gameState = useGameState({
    maxLevel: 15,
    maxLives: 3,
    initialTimePerLevel: 30,
    onGameComplete: handleComplete,
    onGameOver: handleGameOver,
  });

  // Start Screen
  if (!gameState.isStarted) {
    return (
      <GameStartScreen
        title="Nama Game"
        subtitle="Deskripsi singkat"
        description="Cara bermain..."
        icon={<MyIcon />}
        theme="blue"
        onStart={gameState.startGame}
        onBack={() => navigateTo('game')}
      />
    );
  }

  // Completion Screen
  if (gameState.isCompleted) {
    return (
      <GameCompletionScreen
        title="Selamat!"
        message="Kamu berhasil!"
        score={gameState.score}
        stats={[...]}
        onPlayAgain={gameState.resetGame}
        onExit={() => navigateTo('game')}
      />
    );
  }

  // Main Game
  return (
    <GameLayout theme="blue">
      <GameHeader
        title="Nama Game"
        theme="blue"
        onBack={() => navigateTo('game')}
        onReset={gameState.resetGame}
      />
      <GameStats
        level={gameState.currentLevel}
        maxLevel={15}
        score={gameState.score}
        lives={gameState.lives}
        maxLives={3}
        timeLeft={gameState.timeLeft}
      />
      {/* Game content here */}
    </GameLayout>
  );
}
```

### 2. Available Themes

```typescript
type GameTheme = 'purple' | 'blue' | 'green' | 'orange' | 'pink';
```

| Theme  | Use Case                     |
|--------|------------------------------|
| purple | Pattern Recognition (Gf)     |
| blue   | Number Sequence (Gf)         |
| green  | Memory Games (Gsm)           |
| orange | Visual Processing (Gv)       |
| pink   | Fun/Reward games             |

### 3. Game State Hook

```typescript
const gameState = useGameState({
  maxLevel: 15,
  maxLives: 3,
  initialTimePerLevel: 30,
  onLevelComplete: (level, score) => {},
  onGameComplete: (finalScore, stats) => {},
  onGameOver: (score, level) => {},
});

// Properties
gameState.isStarted      // boolean
gameState.isCompleted    // boolean
gameState.currentLevel   // number
gameState.score          // number
gameState.lives          // number
gameState.timeLeft       // number
gameState.hintsUsed      // number
gameState.answerFeedback // 'correct' | 'wrong' | null
gameState.showHint       // boolean

// Actions
gameState.startGame()
gameState.resetGame()
gameState.nextLevel()
gameState.addScore(points)
gameState.loseLife()
gameState.useHint()
gameState.recordCorrectAnswer()
gameState.recordError()
gameState.setAnswerFeedback(type)
gameState.completeGame()

// Computed
gameState.getDifficulty() // 'easy' | 'medium' | 'hard'
gameState.getStats()      // GameStats object
```

### 4. Answer Feedback

```tsx
import { AnswerFeedback, ChoiceButton, ChoiceGrid } from '../components/shared';

// Grid of choices
<ChoiceGrid columns={2} gap={3}>
  {choices.map((choice) => (
    <ChoiceButton
      key={choice}
      value={choice}
      isSelected={selected === choice}
      feedbackType={selected === choice ? answerFeedback : null}
      onClick={handleAnswer}
      disabled={!!answerFeedback}
    >
      {choice}
    </ChoiceButton>
  ))}
</ChoiceGrid>

// Feedback message
<AnswerFeedback
  type={answerFeedback}
  correctMessage="🎉 Benar!"
  wrongMessage="❌ Coba lagi!"
/>
```

### 5. Hint System

```tsx
import { HintButton, HintBox } from '../components/shared';

<div className="flex justify-between">
  <DifficultyBadge difficulty="medium" />
  <HintButton
    isActive={gameState.showHint}
    onUseHint={gameState.useHint}
  />
</div>

<HintBox
  show={gameState.showHint}
  text="Petunjuk: Perhatikan pola warna..."
/>
```

## Best Practices

1. **Selalu gunakan shared components** untuk konsistensi UI
2. **Gunakan useGameState** untuk state management
3. **Pilih theme yang sesuai** dengan domain CHC
4. **Sertakan assessment** di onGameComplete
5. **Handle game over** dengan GameOverScreen
6. **Berikan feedback visual** untuk setiap aksi

## CHC Domain Mapping

| Domain | Games | Theme |
|--------|-------|-------|
| Gf (Fluid Reasoning) | Pattern Recognition, Number Sequence | purple, blue |
| Gv (Visual Processing) | Puzzle, Tangram, Find Difference | orange |
| Gsm (Working Memory) | Memory Card, Simon Says | green |
