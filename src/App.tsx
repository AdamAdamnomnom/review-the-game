import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CHALLENGES } from './data/challenges';
import {
  DiagnosticOption,
  Language,
  RelevanceRating,
  ScoreDeltaEvent,
} from './types/challenge';
import { TIER_META, UI_TEXT } from './data/translations';
import { Header, ActiveTab } from './components/Header';
import { LevelSelectHub } from './components/LevelSelectHub';
import { PlaybookView } from './components/PlaybookView';
import { CodeViewer } from './components/CodeViewer';
import { ActionPanel } from './components/ActionPanel';
import { SeniorFeedbackModal } from './components/SeniorFeedbackModal';
import { AiReviewModal, evaluateReviewComment } from './components/AiReviewModal';
import { SettingsModal, ProComingSoonModal } from './components/SettingsModal';
import {
  Terminal,
  Shield,
  ArrowLeft,
  Bot,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';

type PenaltyState =
  | { type: 'wrong_line'; line: number }
  | { type: 'already_clicked_line'; line: number }
  | { type: 'wrong_option' }
  | { type: 'weak_pro_diagnosis' };

function loadJsonFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function triggerVictoryConfetti() {
  try {
    confetti({
      particleCount: 65,
      spread: 60,
      origin: { y: 0.65 },
    });
  } catch {
    // Fallback if canvas context is unavailable
  }
}

export default function App() {
  // 1. UI & Senior Language (default: 'pl')
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('rtg_v2_lang');
    return saved === 'en' || saved === 'pl' ? saved : 'pl';
  });

  // 2. Code Inline Comments Language (default: 'en')
  const [codeCommentsLang, setCodeCommentsLang] = useState<Language>(() => {
    const saved = localStorage.getItem('rtg_v2_code_lang');
    return saved === 'en' || saved === 'pl' ? saved : 'en';
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('hub');

  const [currentChallengeId, setCurrentChallengeId] = useState<string>(() => {
    return localStorage.getItem('rtg_v2_current_id') || CHALLENGES[0].id;
  });

  const [score, setScore] = useState<number>(() => {
    const saved = localStorage.getItem('rtg_v2_score');
    return saved !== null && !Number.isNaN(Number(saved)) ? Number(saved) : 0;
  });

  const [streak, setStreak] = useState<number>(() => {
    const saved = localStorage.getItem('rtg_v2_streak');
    return saved !== null && !Number.isNaN(Number(saved)) ? Number(saved) : 0;
  });

  const [completedChallengeIds, setCompletedChallengeIds] = useState<string[]>(
    () => loadJsonFromStorage<string[]>('rtg_v2_completed', [])
  );

  const [aiBonusClaimedIds, setAiBonusClaimedIds] = useState<string[]>(
    () => loadJsonFromStorage<string[]>('rtg_v2_ai_claimed', [])
  );

  const [relevanceRatings, setRelevanceRatings] = useState<
    Record<string, RelevanceRating>
  >(() => loadJsonFromStorage<Record<string, RelevanceRating>>('rtg_v2_relevance', {}));

  // Per-challenge 2-step detection state
  const [isLineLocked, setIsLineLocked] = useState<boolean>(false);
  const [lockedLineNumber, setLockedLineNumber] = useState<number | null>(null);
  const [isChallengeSolved, setIsChallengeSolved] = useState<boolean>(false);
  const [wasReplaySolve, setWasReplaySolve] = useState<boolean>(false);
  const [wrongClickedLines, setWrongClickedLines] = useState<number[]>([]);
  const [wrongOptionIds, setWrongOptionIds] = useState<('A' | 'B' | 'C' | 'D')[]>([]);
  const [shownHintCount, setShownHintCount] = useState<number>(0);
  const [weakCommentPenaltyCount, setWeakCommentPenaltyCount] = useState<number>(0);
  const [penaltyState, setPenaltyState] = useState<PenaltyState | null>(null);
  const [lastScoreDelta, setLastScoreDelta] = useState<ScoreDeltaEvent | null>(null);

  // Modals & completion breakdown state
  const [isSeniorModalOpen, setIsSeniorModalOpen] = useState<boolean>(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
  const [isProModalOpen, setIsProModalOpen] = useState<boolean>(false);

  const [earnedPoints, setEarnedPoints] = useState<number>(0);
  const [basePointsAwarded, setBasePointsAwarded] = useState<number>(0);
  const [flawlessBonusAwarded, setFlawlessBonusAwarded] = useState<number>(0);
  const [customBonusAwarded, setCustomBonusAwarded] = useState<number>(0);
  const [wasFlawless, setWasFlawless] = useState<boolean>(false);
  const [submittedProComment, setSubmittedProComment] = useState<string | null>(null);

  const currentChallenge =
    CHALLENGES.find((c) => c.id === currentChallengeId) || CHALLENGES[0];
  const tierChallenges = CHALLENGES.filter(
    (c) => c.tier === currentChallenge.tier
  );
  const currentTierMeta = TIER_META[currentChallenge.tier];
  const t = UI_TEXT[lang];
  const localized = currentChallenge.i18n[lang];

  // Select code snippet based on independent codeCommentsLang setting
  const displayedCode =
    codeCommentsLang === 'pl'
      ? currentChallenge.codePl || currentChallenge.code
      : currentChallenge.codeEn || currentChallenge.code;

  // Total penalties incurred in current challenge attempt
  const sessionPenaltyTotal =
    wrongClickedLines.length * 25 +
    wrongOptionIds.length * 30 +
    shownHintCount * 15 +
    weakCommentPenaltyCount * 30;

  const shownHints = localized.hints.slice(0, shownHintCount);

  const penaltyMessage: string | null = (() => {
    if (!penaltyState) return null;
    switch (penaltyState.type) {
      case 'wrong_line':
        return t.wrongLinePenaltyMsg.replace('{line}', penaltyState.line.toString());
      case 'already_clicked_line':
        return t.alreadyClickedLineMsg.replace('{line}', penaltyState.line.toString());
      case 'wrong_option':
        return t.wrongOptionPenaltyMsg;
      case 'weak_pro_diagnosis':
        return t.weakProPenaltyMsg;
    }
  })();

  const proEvaluation = submittedProComment
    ? evaluateReviewComment(currentChallenge, submittedProComment, lang)
    : null;

  // Persist core state in localStorage
  useEffect(() => {
    try {
      localStorage.setItem('rtg_v2_lang', lang);
      localStorage.setItem('rtg_v2_code_lang', codeCommentsLang);
      localStorage.setItem('rtg_v2_current_id', currentChallengeId);
      localStorage.setItem('rtg_v2_score', score.toString());
      localStorage.setItem('rtg_v2_streak', streak.toString());
      localStorage.setItem(
        'rtg_v2_completed',
        JSON.stringify(completedChallengeIds)
      );
      localStorage.setItem(
        'rtg_v2_ai_claimed',
        JSON.stringify(aiBonusClaimedIds)
      );
      localStorage.setItem(
        'rtg_v2_relevance',
        JSON.stringify(relevanceRatings)
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [
    lang,
    codeCommentsLang,
    currentChallengeId,
    score,
    streak,
    completedChallengeIds,
    aiBonusClaimedIds,
    relevanceRatings,
  ]);

  // Reset per-challenge interaction state when challenge changes
  useEffect(() => {
    setIsLineLocked(false);
    setLockedLineNumber(null);
    setIsChallengeSolved(false);
    setWasReplaySolve(false);
    setWrongClickedLines([]);
    setWrongOptionIds([]);
    setShownHintCount(0);
    setWeakCommentPenaltyCount(0);
    setPenaltyState(null);
    setLastScoreDelta(null);
    setSubmittedProComment(null);
  }, [currentChallengeId]);

  const recordScoreDelta = (delta: number, reason: string) => {
    setLastScoreDelta({
      id: Date.now() + Math.random(),
      delta,
      reason,
    });
  };

  const handleSelectChallengeFromHub = (challengeId: string) => {
    setCurrentChallengeId(challengeId);
    setActiveTab('arena');
  };

  // STEP 1: Line Hunt Click Handler
  const handleClickLine = (lineNumber: number) => {
    if (isLineLocked || isChallengeSolved) return;

    const lines = displayedCode.split('\n');
    const clickedLineText = lines[lineNumber - 1] ?? '';
    if (currentChallenge.viewMode === 'git_diff' && clickedLineText.startsWith('@@')) {
      return;
    }

    const acceptable = currentChallenge.acceptableLines || [
      currentChallenge.targetLineNumber,
    ];
    const isHit = acceptable.includes(lineNumber);

    if (isHit) {
      setIsLineLocked(true);
      setLockedLineNumber(lineNumber);
      setPenaltyState(null);
    } else {
      if (wrongClickedLines.includes(lineNumber)) {
        setPenaltyState({ type: 'already_clicked_line', line: lineNumber });
        return;
      }
      setWrongClickedLines((prev) => [...prev, lineNumber]);
      setScore((prev) => prev - 25);
      recordScoreDelta(-25, 'wrong_line');
      setStreak(0);
      setPenaltyState({ type: 'wrong_line', line: lineNumber });
    }
  };

  // Hint Handler (-15 XP immediately on use)
  const handleShowHint = () => {
    if (isChallengeSolved) return;
    if (shownHintCount < localized.hints.length) {
      setShownHintCount((prev) => prev + 1);
      setScore((prev) => prev - 15);
      recordScoreDelta(-15, 'hint');
    }
  };

  // STEP 2A: ABCD Option Click Handler
  const handleSelectOption = (option: DiagnosticOption) => {
    if (!isLineLocked || isChallengeSolved) return;

    if (option.isCorrect) {
      const alreadyCompleted = completedChallengeIds.includes(currentChallenge.id);
      const flawless =
        wrongClickedLines.length === 0 &&
        wrongOptionIds.length === 0 &&
        shownHintCount === 0 &&
        weakCommentPenaltyCount === 0;
      const basePts = alreadyCompleted ? 0 : currentChallenge.points;
      const flawlessPts = !alreadyCompleted && flawless ? 30 : 0;
      const netReward = basePts + flawlessPts;

      setIsChallengeSolved(true);
      setWasReplaySolve(alreadyCompleted);
      setBasePointsAwarded(basePts);
      setFlawlessBonusAwarded(flawlessPts);
      setCustomBonusAwarded(0);
      setEarnedPoints(netReward);
      setWasFlawless(flawless);
      setSubmittedProComment(null);

      if (!alreadyCompleted) {
        setScore((prev) => prev + netReward);
        recordScoreDelta(netReward, 'solved');
        if (flawless) {
          setStreak((prev) => prev + 1);
        }
        setCompletedChallengeIds((prev) => [...prev, currentChallenge.id]);
      } else {
        setLastScoreDelta(null);
      }

      setPenaltyState(null);
      triggerVictoryConfetti();
      setIsSeniorModalOpen(true);
    } else {
      if (!wrongOptionIds.includes(option.id)) {
        setWrongOptionIds((prev) => [...prev, option.id]);
        setScore((prev) => prev - 30);
        recordScoreDelta(-30, 'wrong_option');
        setStreak(0);
        setPenaltyState({ type: 'wrong_option' });
      }
    }
  };

  // STEP 2B: Custom Comment Diagnosis Submission
  const handleSubmitCustomComment = (commentText: string) => {
    if (!isLineLocked || isChallengeSolved) return;

    const evaluation = evaluateReviewComment(
      currentChallenge,
      commentText,
      lang
    );

    if (evaluation.rating < 3) {
      setWeakCommentPenaltyCount((prev) => prev + 1);
      setScore((prev) => prev - 30);
      recordScoreDelta(-30, 'weak_comment');
      setStreak(0);
      setPenaltyState({ type: 'weak_pro_diagnosis' });
      return;
    }

    const alreadyCompleted = completedChallengeIds.includes(currentChallenge.id);
    const alreadyClaimedAi = aiBonusClaimedIds.includes(currentChallenge.id);
    const flawless =
      wrongClickedLines.length === 0 &&
      wrongOptionIds.length === 0 &&
      shownHintCount === 0 &&
      weakCommentPenaltyCount === 0;
    const basePts = alreadyCompleted ? 0 : currentChallenge.points;
    const flawlessPts = !alreadyCompleted && flawless ? 30 : 0;
    const customBonusPts = alreadyClaimedAi ? 0 : evaluation.bonusPoints;
    const netReward = basePts + flawlessPts + customBonusPts;

    setSubmittedProComment(commentText);
    setIsChallengeSolved(true);
    setWasReplaySolve(alreadyCompleted && alreadyClaimedAi);
    setBasePointsAwarded(basePts);
    setFlawlessBonusAwarded(flawlessPts);
    setCustomBonusAwarded(customBonusPts);
    setEarnedPoints(netReward);
    setWasFlawless(flawless);

    if (netReward > 0) {
      setScore((prev) => prev + netReward);
      recordScoreDelta(netReward, 'solved_custom');
    } else {
      setLastScoreDelta(null);
    }
    if (!alreadyCompleted) {
      if (flawless) {
        setStreak((prev) => prev + 1);
      }
      setCompletedChallengeIds((prev) => [...prev, currentChallenge.id]);
    }
    if (!alreadyClaimedAi && evaluation.bonusPoints > 0) {
      setAiBonusClaimedIds((prev) => [...prev, currentChallenge.id]);
    }

    setPenaltyState(null);
    triggerVictoryConfetti();
    setIsSeniorModalOpen(true);
  };

  const handleRateRelevance = (
    challengeId: string,
    rating: RelevanceRating
  ) => {
    setRelevanceRatings((prev) => ({
      ...prev,
      [challengeId]: rating,
    }));
  };

  const currentIdxInTier = tierChallenges.findIndex(
    (c) => c.id === currentChallenge.id
  );
  const isLastInTier = currentIdxInTier === tierChallenges.length - 1;

  const handleNextChallenge = () => {
    setIsSeniorModalOpen(false);
    if (!isLastInTier && currentIdxInTier >= 0) {
      setCurrentChallengeId(tierChallenges[currentIdxInTier + 1].id);
    } else {
      setActiveTab('hub');
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#f0f6fc] flex flex-col font-sans selection:bg-[#1f6feb]/40">
      {/* Top Navigation & Gamification Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        score={score}
        lastScoreDelta={lastScoreDelta}
        streak={streak}
        lang={lang}
        codeCommentsLang={codeCommentsLang}
        onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
        onOpenProModal={() => setIsProModalOpen(true)}
        completedCount={completedChallengeIds.length}
        totalCount={CHALLENGES.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'hub' && (
          <LevelSelectHub
            challenges={CHALLENGES}
            completedChallengeIds={completedChallengeIds}
            currentChallengeId={currentChallengeId}
            lang={lang}
            score={score}
            onSelectChallenge={handleSelectChallengeFromHub}
            onOpenPlaybook={() => setActiveTab('playbook')}
          />
        )}

        {activeTab === 'playbook' && (
          <PlaybookView
            lang={lang}
            onStartArena={() => setActiveTab('arena')}
          />
        )}

        {activeTab === 'arena' && (
          <div className="space-y-5">
            {/* Top Arena Sub-Navigation: Back to Hub + Tier Level Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <button
                onClick={() => setActiveTab('hub')}
                className="min-h-[36px] min-w-[180px] self-start px-3 py-1.5 rounded-lg bg-[#161b22] border border-[#30363d] hover:border-[#58a6ff]/50 text-xs font-semibold text-[#c9d1d9] hover:text-[#f0f6fc] flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t.backToHub}</span>
              </button>

              {/* In-Tier Level Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md border bg-[#161b22] text-[#c9d1d9] border-[#30363d]">
                  {currentTierMeta.badge} · {currentTierMeta.title[lang]}
                </span>
                {tierChallenges.map((c) => {
                  const isCurrent = c.id === currentChallenge.id;
                  const isDone = completedChallengeIds.includes(c.id);
                  return (
                    <button
                      key={c.id}
                      onClick={() => setCurrentChallengeId(c.id)}
                      className={`min-h-[34px] min-w-[48px] px-2.5 py-1 rounded-md font-mono tabular-nums text-xs flex items-center justify-center gap-1 border transition-colors ${
                        isCurrent
                          ? 'bg-[#1f6feb] text-white border-[#58a6ff] font-bold'
                          : isDone
                          ? 'bg-[#161b22] text-[#3fb950] border-[#238636]/60 hover:border-[#3fb950]'
                          : 'bg-[#161b22] text-[#8b949e] border-[#30363d] hover:text-[#f0f6fc]'
                      }`}
                    >
                      {isDone && <CheckCircle2 className="w-3 h-3 text-[#3fb950]" />}
                      <span>#{c.levelInTier}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Challenge Context Header Card */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold font-mono tabular-nums px-2 py-0.5 rounded bg-[#21262d] text-[#f0f6fc] border border-[#30363d]">
                    {currentTierMeta.badge} #{currentChallenge.levelInTier}/{tierChallenges.length}
                  </span>
                  <span className="text-xs font-medium text-[#8b949e] flex items-center gap-1 font-mono">
                    <Terminal className="w-3.5 h-3.5 text-[#58a6ff]" />
                    {currentChallenge.language.toUpperCase()}
                  </span>
                  <span className="text-[10px] font-semibold font-mono px-2 py-0.5 rounded bg-[#0d1117] text-[#8b949e] border border-[#30363d]">
                    {currentChallenge.viewMode === 'git_diff' ? t.gitDiffBadge : t.ideViewBadge}
                  </span>
                  {currentChallenge.isAiTrap && (
                    <span className="text-[10px] font-semibold font-mono px-2 py-0.5 rounded bg-[#21262d] text-[#c9d1d9] border border-[#30363d] flex items-center gap-1">
                      <Bot className="w-3 h-3 text-[#58a6ff]" />
                      {t.aiTrapBadge}
                    </span>
                  )}
                </div>

                <h2 className="text-base sm:text-lg font-bold text-[#f0f6fc] tracking-tight">
                  {localized.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#8b949e] leading-relaxed max-w-3xl">
                  {localized.description}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-3 self-start md:self-center">
                <div className="bg-[#0d1117] border border-[#30363d] px-3.5 py-2 rounded-lg text-right font-mono tabular-nums">
                  <span className="text-[10px] font-sans text-[#8b949e] block leading-none mb-1">
                    {t.rewardLabel}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[#f0f6fc]">
                    +{currentChallenge.points} XP
                  </span>
                </div>
              </div>
            </div>

            {/* 2-Column Arena Layout: Code Viewer (7 cols) & 2-Step Action Panel (5 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              <div className="lg:col-span-7">
                <CodeViewer
                  code={displayedCode}
                  fileName={currentChallenge.fileName}
                  viewMode={currentChallenge.viewMode}
                  language={currentChallenge.language}
                  lang={lang}
                  codeCommentsLang={codeCommentsLang}
                  isAiTrap={currentChallenge.isAiTrap}
                  isLineLocked={isLineLocked}
                  lockedLineNumber={lockedLineNumber}
                  wrongClickedLines={wrongClickedLines}
                  onClickLine={handleClickLine}
                />
              </div>

              <div className="lg:col-span-5 space-y-4">
                <ActionPanel
                  challenge={currentChallenge}
                  lang={lang}
                  score={score}
                  sessionPenaltyTotal={sessionPenaltyTotal}
                  lastScoreDelta={lastScoreDelta}
                  isLineLocked={isLineLocked}
                  lockedLineNumber={lockedLineNumber}
                  isChallengeSolved={isChallengeSolved}
                  isLastInTier={isLastInTier}
                  wrongOptionIds={wrongOptionIds}
                  shownHints={shownHints}
                  penaltyMessage={penaltyMessage}
                  onSelectOption={handleSelectOption}
                  onSubmitCustomComment={handleSubmitCustomComment}
                  onShowHint={handleShowHint}
                  onReopenSeniorModal={() => setIsSeniorModalOpen(true)}
                  onNextChallenge={handleNextChallenge}
                />

                {/* Quick Playbook Guidance Card */}
                <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-3.5 text-xs text-[#8b949e] flex items-center justify-between gap-3">
                  <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-[#58a6ff] shrink-0 mt-0.5" />
                    <span>
                      {lang === 'pl'
                        ? 'Wskazówka: W widoku Git Diff zwracaj uwagę zarówno na dodane linie (+), jak i usunięte zabezpieczenia (-).'
                        : 'Tip: In Git Diff view, inspect both newly added lines (+) and deleted security checks (-).'}
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveTab('playbook')}
                    className="shrink-0 text-[#58a6ff] hover:underline font-semibold flex items-center gap-1"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Playbook</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#30363d] bg-[#0d1117] px-6 py-4 mt-12 text-xs text-[#8b949e]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>{t.footerText}</span>
          <span className="text-[11px] text-[#484f58]">{t.footerLegalNote}</span>
        </div>
      </footer>

      {/* Senior Feedback & Explicit XP Breakdown Modal */}
      <SeniorFeedbackModal
        challenge={currentChallenge}
        lang={lang}
        isOpen={isSeniorModalOpen}
        totalScore={score}
        earnedPoints={earnedPoints}
        basePointsAwarded={basePointsAwarded}
        flawlessBonusAwarded={flawlessBonusAwarded}
        customBonusAwarded={customBonusAwarded}
        sessionPenalties={sessionPenaltyTotal}
        wasFlawless={wasFlawless}
        wasReplay={wasReplaySolve}
        proEvaluation={proEvaluation}
        relevanceRating={relevanceRatings[currentChallenge.id]}
        onRateRelevance={handleRateRelevance}
        onClose={() => setIsSeniorModalOpen(false)}
        onNextLevel={handleNextChallenge}
        onOpenAiReview={() => {
          setIsSeniorModalOpen(false);
          setIsAiModalOpen(true);
        }}
        isLastInTier={isLastInTier}
      />

      {/* Custom Comment Modal */}
      <AiReviewModal
        challenge={currentChallenge}
        lang={lang}
        isOpen={isAiModalOpen}
        alreadyClaimedBonus={aiBonusClaimedIds.includes(currentChallenge.id)}
        onClose={() => {
          setIsAiModalOpen(false);
          if (isChallengeSolved) {
            setIsSeniorModalOpen(true);
          }
        }}
        onEvaluateComment={(text) => {
          setSubmittedProComment(text);
        }}
        onAwardBonus={(pts, text) => {
          setSubmittedProComment(text);
          if (!aiBonusClaimedIds.includes(currentChallenge.id) && pts > 0) {
            setScore((prev) => prev + pts);
            recordScoreDelta(pts, 'custom_bonus');
            setCustomBonusAwarded((prev) => prev + pts);
            setEarnedPoints((prev) => prev + pts);
            setAiBonusClaimedIds((prev) => [...prev, currentChallenge.id]);
          }
        }}
      />

      {/* Settings Modal (2 Independent Language Selectors: UI vs Code Comments) */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        uiLang={lang}
        codeCommentsLang={codeCommentsLang}
        onChangeUiLang={setLang}
        onChangeCodeCommentsLang={setCodeCommentsLang}
        onClose={() => setIsSettingsModalOpen(false)}
      />

      {/* PRO Coming Soon Modal */}
      <ProComingSoonModal
        isOpen={isProModalOpen}
        lang={lang}
        onClose={() => setIsProModalOpen(false)}
      />
    </div>
  );
}
