export type Language = 'pl' | 'en';

export type DifficultyTier = 'junior' | 'mid' | 'senior';

export type BugCategory =
  | 'logic'        // Błąd logiki / algorytmu
  | 'security'     // Luka bezpieczeństwa / wyciek danych
  | 'performance'  // Problem wydajnościowy / wyciek pamięci
  | 'typing'       // Błąd typowania / standardu języka
  | 'async'        // Problem ze współbieżnością / asynchronicznością
  | 'ai_trap';     // Halucynacja AI / pułapka Vibe Codingu

export type ViewMode = 'ide' | 'git_diff';

export interface DiagnosticOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: {
    pl: string;
    en: string;
  };
  isCorrect: boolean;
}

export interface LocalizedChallengeText {
  title: string;
  description: string;
  hints: string[];
  seniorExplanation: {
    summary: string;
    whyItMatters: string;
    howToFix: string;
    fixedCodeSnippet: string;
  };
}

export interface Challenge {
  id: string;
  tier: DifficultyTier;
  levelInTier: number;
  fileName: string;
  language: 'javascript' | 'typescript' | 'python' | 'csharp';
  viewMode: ViewMode;
  isAiTrap?: boolean;
  code: string;
  codeEn: string;
  codePl: string;
  targetLineNumber: number;
  acceptableLines?: number[];
  category: BugCategory;
  points: number;
  options: DiagnosticOption[];
  aiKeywords: {
    cause: string[];
    fix: string[];
  };
  i18n: {
    pl: LocalizedChallengeText;
    en: LocalizedChallengeText;
  };
}

export interface AiEvaluation {
  rating: number; // 1-5
  feedback: string;
  strengths: string[];
  missedPoints: string[];
  bonusPoints: number;
}

export type RelevanceRating = 'up' | 'down';

export interface ScoreDeltaEvent {
  id: number;
  delta: number;
  reason: string;
}
