import type { Language, DifficultyTier } from '../types/challenge';

export interface RankInfo {
  id: string;
  minScore: number;
  title: { pl: string; en: string };
  badgeColor: string;
}

export const RANKS: RankInfo[] = [
  {
    id: 'intern',
    minScore: -9999,
    title: { pl: 'Stażysta PR', en: 'PR Intern' },
    badgeColor: 'text-[#8b949e] border-[#30363d] bg-[#161b22]',
  },
  {
    id: 'junior_auditor',
    minScore: 150,
    title: { pl: 'Junior Code Reviewer', en: 'Junior Code Reviewer' },
    badgeColor: 'text-[#c9d1d9] border-[#30363d] bg-[#161b22]',
  },
  {
    id: 'clean_coder',
    minScore: 450,
    title: { pl: 'Strażnik Czystego Kodu', en: 'Clean Code Guardian' },
    badgeColor: 'text-[#58a6ff] border-[#1f6feb]/40 bg-[#1f6feb]/10',
  },
  {
    id: 'security_hawk',
    minScore: 900,
    title: { pl: 'Audytor Bezpieczeństwa', en: 'Security Auditor' },
    badgeColor: 'text-[#58a6ff] border-[#58a6ff]/40 bg-[#1f6feb]/15',
  },
  {
    id: 'principal_architect',
    minScore: 1400,
    title: { pl: 'Principal Staff Reviewer', en: 'Principal Staff Reviewer' },
    badgeColor: 'text-[#f0f6fc] border-[#58a6ff]/60 bg-[#1f6feb]/20',
  },
];

export function getRankForScore(score: number): RankInfo {
  let current = RANKS[0];
  for (const r of RANKS) {
    if (score >= r.minScore) {
      current = r;
    }
  }
  return current;
}

export function getNextRank(score: number): RankInfo | null {
  for (const r of RANKS) {
    if (r.minScore > score) {
      return r;
    }
  }
  return null;
}

export const TIER_META: Record<
  DifficultyTier,
  {
    badge: string;
    color: string;
    borderGlow: string;
    accentText: string;
    bgPill: string;
    title: { pl: string; en: string };
    subtitle: { pl: string; en: string };
    description: { pl: string; en: string };
    viewLabel: { pl: string; en: string };
  }
> = {
  junior: {
    badge: 'L1',
    color: 'bg-[#161b22]',
    borderGlow: 'hover:border-[#58a6ff]/50 border-[#30363d]',
    accentText: 'text-[#8b949e]',
    bgPill: 'bg-[#21262d] text-[#c9d1d9] border-[#30363d]',
    title: {
      pl: 'Początkujący (Junior)',
      en: 'Beginner (Junior)',
    },
    subtitle: {
      pl: 'Podstawy języka i pułapki składniowe',
      en: 'Language fundamentals & syntax traps',
    },
    description: {
      pl: 'Czysty widok pliku IDE (10–20 linii). Wyłapuj klasyczne błędy zasięgu zmiennych, niejawnej konwersji typów oraz pominięte instrukcje return.',
      en: 'Clean IDE file view (10–20 lines). Spot classic variable scoping bugs, implicit type coercion, and missing return statements.',
    },
    viewLabel: {
      pl: 'IDE View',
      en: 'IDE View',
    },
  },
  mid: {
    badge: 'L2',
    color: 'bg-[#161b22]',
    borderGlow: 'hover:border-[#58a6ff]/50 border-[#30363d]',
    accentText: 'text-[#8b949e]',
    bgPill: 'bg-[#21262d] text-[#c9d1d9] border-[#30363d]',
    title: {
      pl: 'Średniozaawansowany (Mid)',
      en: 'Intermediate (Mid)',
    },
    subtitle: {
      pl: 'Git Pull Request & Refaktoryzacja',
      en: 'Git Pull Request & Refactoring',
    },
    description: {
      pl: 'Widok Git Diff (+ / -). Szukaj cichych mutacji tablic w pamięci, zgubionych awaitów i nieobsłużonych wyjątków wprowadzonych podczas refaktoringu.',
      en: 'Real Git Diff view (+ / -). Hunt down silent in-memory array mutations, missing awaits, and unhandled exceptions introduced during refactoring.',
    },
    viewLabel: {
      pl: 'Git Diff',
      en: 'Git Diff',
    },
  },
  senior: {
    badge: 'L3',
    color: 'bg-[#161b22]',
    borderGlow: 'hover:border-[#58a6ff]/50 border-[#30363d]',
    accentText: 'text-[#8b949e]',
    bgPill: 'bg-[#21262d] text-[#c9d1d9] border-[#30363d]',
    title: {
      pl: 'Zaawansowany (Senior)',
      en: 'Advanced (Senior)',
    },
    subtitle: {
      pl: 'Incydenty produkcyjne & Audyt kodu AI',
      en: 'Production Incidents & AI Code Audit',
    },
    description: {
      pl: 'Krytyczne luki bezpieczeństwa (IDOR, SQL Injection), wyścigi wielowątkowe (Race Conditions / Double Spend) oraz pułapki wygenerowane przez AI.',
      en: 'Critical security vulnerabilities (IDOR, SQL Injection), concurrency Race Conditions (Double Spend), and AI-generated code traps.',
    },
    viewLabel: {
      pl: 'Security & AI Audit',
      en: 'Security & AI Audit',
    },
  },
};

export const UI_TEXT: Record<Language, Record<string, string>> = {
  pl: {
    tagline: 'LeetCode uczy pisać algorytmy. ReviewTheGame uczy robić Code Review na produkcji.',
    betaBadge: 'BETA',
    betaTooltip: 'Wersja BETA — Twój postęp zapisywany jest lokalnie w przeglądarce (localStorage).',
    navHub: 'Poziomy',
    navArena: 'Arena',
    navPlaybook: 'Playbook',
    scoreLabel: 'XP',
    streakLabel: 'Seria',
    proBadgeLabel: 'PRO',
    settingsBtnLabel: 'Ustawienia',
    hubHeroEyebrow: 'SYMULATOR INŻYNIERII CODE REVIEW',
    hubHeroTitle: 'Czytaj kod jak Senior. Wyłapuj błędy zanim trafią na produkcję.',
    hubHeroDesc:
      'Wybierz ścieżkę trudności dopasowaną do Twojego doświadczenia. Najpierw wskaż podejrzaną linię kodu, a następnie postaw precyzyjną diagnozę techniczną — każde błędne kliknięcie odejmuje punkty.',
    hubNotForBeginners:
      'Uwaga: Ta aplikacja nie uczy składni od zera (czym jest pętla for czy zmienna). To symulator dla osób znających podstawy, które chcą ćwiczyć profesjonalne Code Review.',
    selectTierBtn: 'Rozpocznij ścieżkę',
    continueTierBtn: 'Kontynuuj ścieżkę',
    completedCount: 'Ukończono',
    challengesInTier: 'Wyzwań w ścieżce',
    aiTrapBadge: 'AI Code Trap',
    gitDiffBadge: 'GIT DIFF',
    ideViewBadge: 'IDE FILE',
    rewardLabel: 'Nagroda bazowa',
    flawlessBonusLabel: 'Bonus za bezbłędność',
    step1Title: 'Krok 1: Wskaż błędną linię',
    step1Instruction:
      'Przeanalizuj kod po lewej i kliknij dokładnie tę linię, w której występuje błąd. Opcje diagnozy odblokują się po trafieniu.',
    step1Warning: 'Każde kliknięcie poprawnej linii to kara -25 XP.',
    step1LockedSuccess: 'Wskazano linię błędu',
    step2Title: 'Krok 2: Diagnoza techniczna',
    step2Subtitle: 'Wybierz właściwe uzasadnienie techniczne (błędna odpowiedź: -30 XP):',
    step2LockedTitle: 'Krok 2: Diagnoza zablokowana',
    step2LockedDesc:
      'Warianty odpowiedzi A, B, C, D są ukryte, aby wykluczyć zgadywanie. Kliknij błędną linię w edytorze kodu, aby odblokować diagnozę.',
    wrongLinePenaltyMsg: 'W linii #{line} nie ma błędu. Naliczono karę -25 XP.',
    alreadyClickedLineMsg: 'Linia #{line} była już sprawdzana (brak błędu).',
    wrongOptionPenaltyMsg: 'Nietrafiona diagnoza techniczna. Naliczono karę -30 XP.',
    weakProPenaltyMsg:
      'Zbyt ogólny komentarz. Wskaż techniczną przyczynę błędu lub konkretną poprawkę. Naliczono karę -30 XP.',
    hintBtn: 'Podpowiedź (-15 XP)',
    noMoreHints: 'Brak podpowiedzi',
    modeStandardTab: 'Opcje ABCD',
    modeCustomCommentTab: 'Wpisz własny komentarz',
    customCommentHeader: 'Własny komentarz Code Review',
    proHardcorePrompt:
      'Zamiast wybierać gotową opcję ABCD, napisz własny komentarz do Pull Requesta wyjaśniający przyczynę błędu oraz propozycję naprawy:',
    proHardcorePlaceholder:
      'np. W tej linii występuje problem z..., ponieważ... Aby to naprawić, należy użyć...',
    proHardcoreSubmitBtn: 'Zatwierdź komentarz',
    clickTargetHint: 'Wskaż linię z błędem (-25 XP za pudło)',
    lineHitBadge: 'TRAFIONA',
    lineMissBadge: '-25 XP',
    markLineBadge: 'Wybierz',
    backToHub: 'Wróć do wyboru poziomu',
    challengeSolvedBanner: 'Wyzwanie ukończone. Przejrzyj kod lub przejdź do kolejnego zadania.',
    reopenExplanationBtn: 'Podsumowanie Seniora',
    replayCompletedNote: 'Powtórka (XP już odebrane)',
    seniorModalTitle: 'Pull Request Zatrzymany — Poprawna Diagnoza',
    seniorModalSubtitle: 'Zidentyfikowałeś błąd i zablokowałeś wdrożenie regresji na produkcję.',
    pointsEarnedLabel: 'Bilans wyzwania',
    flawlessBadge: 'Bezbłędny strzał (+30 XP)',
    summarySectionTitle: 'Przyczyna techniczna',
    whyItMattersTitle: 'Skutki na produkcji',
    howToFixTitle: 'Rekomendowana poprawka',
    relevanceQuestion: 'Czy to wyzwanie było reprezentatywne dla tego poziomu trudności?',
    relevanceUp: 'Dobry przypadek',
    relevanceDown: 'Zbyt sztuczne',
    relevanceThanks: 'Dziękujemy za ocenę wyzwania.',
    openAiModalBtn: 'Wpisz własny komentarz PR',
    nextChallengeBtn: 'Następne wyzwanie',
    finishTierBtn: 'Wróć do wyboru poziomu',
    footerText: 'ReviewTheGame — Symulator inżynierii Code Review i audytu bezpieczeństwa',
    footerLegalNote: 'BETA: Zgodność GDPR/RODO (wyłącznie lokalny zapis stanu w localStorage).',
    // Score tracking & breakdown
    currentTotalXpLabel: 'Twój wynik całkowity',
    sessionPenaltiesLabel: 'Kary w tym zadaniu',
    noPenaltiesLabel: '0 XP (brak błędów)',
    breakdownTitle: 'Szczegółowe rozliczenie punktów (XP)',
    breakdownBaseLabel: 'Punkty bazowe za zadanie',
    breakdownFlawlessLabel: 'Bonus za bezbłędną detekcję (Flawless)',
    breakdownCustomBonusLabel: 'Bonus za własny komentarz PR',
    breakdownPenaltiesLabel: 'Odjęte punkty podczas prób (linie / ABCD / podpowiedzi)',
    breakdownNetChallengeLabel: 'Przyznane za ukończenie',
    breakdownNetSessionLabel: 'Bilans netto w tym zadaniu',
    breakdownTotalScoreLabel: 'Aktualne saldo konta',
    // Settings Modal
    settingsModalTitle: 'Ustawienia środowiska',
    settingsModalSubtitle: 'Skonfiguruj niezależnie język interfejsu oraz język komentarzy wewnątrz kodu.',
    settingsUiLangLabel: '1. Język interfejsu i Seniora',
    settingsUiLangDesc:
      'Steruje przyciskami, opisami zadań, wariantami ABCD, Playbookiem oraz wyjaśnieniami Seniora.',
    settingsCodeLangLabel: '2. Język komentarzy w kodzie (// ...)',
    settingsCodeLangDesc:
      'Steruje wyłącznie komentarzami wewnątrz edytora kodu. Nazwy zmiennych, funkcji i składnia pozostają zawsze po angielsku.',
    settingsCodeRuleNote:
      'Standard branżowy: W zespołach deweloperskich kod i identyfikatory piszemy po angielsku, nawet gdy rozmowa toczy się po polsku.',
    settingsCloseBtn: 'Gotowe',
    // PRO Coming Soon Modal
    proModalTitle: 'Moduł PRO — W trakcie prac',
    proModalBadge: 'COMING SOON • Q1 2027',
    proModalDesc:
      'Zaawansowany moduł subskrypcyjny PRO jest obecnie w fazie inżynieryjnej. Podstawowa rozgrywka oraz tryb wpisywania własnych komentarzy PR są w pełni darmowe i dostępne od ręki.',
    proFeature1Title: 'Personal AI Mentor & Skill Radar',
    proFeature1Desc: 'Analiza Twoich nawyków i automatyczny profil luk kompetencyjnych (np. współbieżność, OWASP).',
    proFeature2Title: 'Daily Production Incidents',
    proFeature2Desc: 'Nowe scenariusze na bazie głośnych awarii produkcyjnych ze świata IT.',
    proFeature3Title: 'Verified Code Auditor Certificate',
    proFeature3Desc: 'Weryfikowalny certyfikat audytu kodu i bezpieczeństwa do profilu LinkedIn oraz CV.',
    proModalCloseBtn: 'Rozumiem, wróć do gry',
  },
  en: {
    tagline: 'LeetCode teaches writing algorithms. ReviewTheGame teaches production Code Review.',
    betaBadge: 'BETA',
    betaTooltip: 'BETA Release — Your progress is stored locally in your browser (localStorage).',
    navHub: 'Levels',
    navArena: 'Arena',
    navPlaybook: 'Playbook',
    scoreLabel: 'XP',
    streakLabel: 'Streak',
    proBadgeLabel: 'PRO',
    settingsBtnLabel: 'Settings',
    hubHeroEyebrow: 'CODE REVIEW ENGINEERING SIMULATOR',
    hubHeroTitle: 'Read code like a Senior. Catch bugs before they hit production.',
    hubHeroDesc:
      'Select a difficulty tier tailored to your experience. First locate the exact faulty line in the code, then select the technical diagnosis — every wrong click deducts points.',
    hubNotForBeginners:
      'Note: This platform does NOT teach basic syntax from scratch (variables or loops). It is designed for developers who know the basics and want to master production Code Review.',
    selectTierBtn: 'Start Track',
    continueTierBtn: 'Continue Track',
    completedCount: 'Completed',
    challengesInTier: 'Challenges in track',
    aiTrapBadge: 'AI Code Trap',
    gitDiffBadge: 'GIT DIFF',
    ideViewBadge: 'IDE FILE',
    rewardLabel: 'Base Reward',
    flawlessBonusLabel: 'Flawless Bonus',
    step1Title: 'Step 1: Locate Faulty Line',
    step1Instruction:
      'Inspect the code on the left and click the exact line containing the bug. Diagnostic options unlock once you hit the faulty line.',
    step1Warning: 'Every wrong line click deducts -25 XP.',
    step1LockedSuccess: 'Faulty line locked',
    step2Title: 'Step 2: Technical Diagnosis',
    step2Subtitle: 'Select the exact technical root cause (wrong answer: -30 XP):',
    step2LockedTitle: 'Step 2: Diagnosis Locked',
    step2LockedDesc:
      'Options A, B, C, D remain hidden to prevent guessing. Click the faulty line in the code editor first to unlock diagnosis.',
    wrongLinePenaltyMsg: 'Line #{line} has no bug. Penalty applied: -25 XP.',
    alreadyClickedLineMsg: 'Line #{line} was already inspected (clean).',
    wrongOptionPenaltyMsg: 'Incorrect technical diagnosis. Penalty applied: -30 XP.',
    weakProPenaltyMsg:
      'Comment too vague. State the technical root cause or a concrete fix. Penalty applied: -30 XP.',
    hintBtn: 'Hint (-15 XP)',
    noMoreHints: 'No hints left',
    modeStandardTab: 'ABCD Options',
    modeCustomCommentTab: 'Write custom comment',
    customCommentHeader: 'Custom Code Review Comment',
    proHardcorePrompt:
      'Instead of picking an ABCD option, write your own Pull Request review comment explaining the root cause and how to fix it:',
    proHardcorePlaceholder:
      'e.g. This line causes an issue because... To fix it safely, we should...',
    proHardcoreSubmitBtn: 'Submit Comment',
    clickTargetHint: 'Click faulty line (-25 XP on miss)',
    lineHitBadge: 'LOCKED',
    lineMissBadge: '-25 XP',
    markLineBadge: 'Select',
    backToHub: 'Back to Level Hub',
    challengeSolvedBanner: 'Challenge solved. Inspect the code or proceed to the next challenge.',
    reopenExplanationBtn: 'Senior Breakdown',
    replayCompletedNote: 'Replay (XP already claimed)',
    seniorModalTitle: 'Pull Request Blocked — Accurate Diagnosis',
    seniorModalSubtitle: 'You pinpointed the defect and prevented a production regression.',
    pointsEarnedLabel: 'Challenge Balance',
    flawlessBadge: 'Flawless Hit (+30 XP)',
    summarySectionTitle: 'Technical Root Cause',
    whyItMattersTitle: 'Production Impact',
    howToFixTitle: 'Recommended Fix',
    relevanceQuestion: 'Was this challenge representative for this difficulty tier?',
    relevanceUp: 'Realistic case',
    relevanceDown: 'Too synthetic',
    relevanceThanks: 'Thanks for rating this challenge.',
    openAiModalBtn: 'Write custom PR comment',
    nextChallengeBtn: 'Next Challenge',
    finishTierBtn: 'Return to Level Hub',
    footerText: 'ReviewTheGame — Production Code Review & Security Audit Simulator',
    footerLegalNote: 'BETA: GDPR compliant (functional localStorage only, zero third-party trackers).',
    // Score tracking & breakdown
    currentTotalXpLabel: 'Current Total XP',
    sessionPenaltiesLabel: 'Penalties in this task',
    noPenaltiesLabel: '0 XP (flawless so far)',
    breakdownTitle: 'Detailed XP Score Breakdown',
    breakdownBaseLabel: 'Base challenge reward',
    breakdownFlawlessLabel: 'Flawless detection bonus',
    breakdownCustomBonusLabel: 'Custom PR comment bonus',
    breakdownPenaltiesLabel: 'Penalties deducted during attempt (lines / ABCD / hints)',
    breakdownNetChallengeLabel: 'Awarded on completion',
    breakdownNetSessionLabel: 'Net balance on this challenge',
    breakdownTotalScoreLabel: 'Updated Total XP Balance',
    // Settings Modal
    settingsModalTitle: 'Environment Settings',
    settingsModalSubtitle: 'Independently configure the UI language and the inline code comments language.',
    settingsUiLangLabel: '1. Interface & Senior Language',
    settingsUiLangDesc:
      'Controls all UI buttons, task descriptions, ABCD options, Playbook, and Senior explanations.',
    settingsCodeLangLabel: '2. Code Comments Language (// ...)',
    settingsCodeLangDesc:
      'Controls ONLY inline comments inside the code editor. Variable names, function names, and syntax always remain in English.',
    settingsCodeRuleNote:
      'Industry standard: Production code identifiers and syntax are always written in English, regardless of team spoken language.',
    settingsCloseBtn: 'Done',
    // PRO Coming Soon Modal
    proModalTitle: 'PRO Module — Under Development',
    proModalBadge: 'COMING SOON • Q1 2027',
    proModalDesc:
      'The advanced PRO subscription module is currently in development. All core challenges and the custom PR review comment mode are completely free and available right now.',
    proFeature1Title: 'Personal AI Mentor & Skill Radar',
    proFeature1Desc: 'Tracks your review habits and maps blind spots across concurrency, OWASP security, and state management.',
    proFeature2Title: 'Daily Production Incidents',
    proFeature2Desc: 'Fresh challenges inspired by real-world post-mortems and high-profile outages.',
    proFeature3Title: 'Verified Code Auditor Certificate',
    proFeature3Desc: 'Verifiable code auditing credential for your LinkedIn profile and engineering CV.',
    proModalCloseBtn: 'Got it, back to simulator',
  },
};
