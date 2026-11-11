import React, { useEffect } from 'react';
import {
  Challenge,
  Language,
  RelevanceRating,
  AiEvaluation,
} from '../types/challenge';
import { UI_TEXT } from '../data/translations';
import {
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Wrench,
  MessageSquareCode,
  ThumbsUp,
  ThumbsDown,
  Zap,
  Star,
  AlertTriangle,
  X,
  Award,
} from 'lucide-react';

interface SeniorFeedbackModalProps {
  challenge: Challenge;
  lang: Language;
  isOpen: boolean;
  totalScore: number;
  earnedPoints: number;
  basePointsAwarded: number;
  flawlessBonusAwarded: number;
  customBonusAwarded: number;
  sessionPenalties: number;
  wasFlawless: boolean;
  wasReplay?: boolean;
  proEvaluation: AiEvaluation | null;
  relevanceRating?: RelevanceRating;
  onRateRelevance: (challengeId: string, rating: RelevanceRating) => void;
  onClose: () => void;
  onNextLevel: () => void;
  onOpenAiReview: () => void;
  isLastInTier: boolean;
}

export const SeniorFeedbackModal: React.FC<SeniorFeedbackModalProps> = ({
  challenge,
  lang,
  isOpen,
  totalScore,
  earnedPoints,
  basePointsAwarded,
  flawlessBonusAwarded,
  customBonusAwarded,
  sessionPenalties,
  wasFlawless,
  wasReplay = false,
  proEvaluation,
  relevanceRating,
  onRateRelevance,
  onClose,
  onNextLevel,
  onOpenAiReview,
  isLastInTier,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const t = UI_TEXT[lang];
  const localized = challenge.i18n[lang];
  const netSessionBalance = earnedPoints - sessionPenalties;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#161b22] border border-[#30363d] rounded-xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#30363d]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#238636]/15 border border-[#238636]/50 flex items-center justify-center text-[#3fb950] shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#f0f6fc]">
                {t.seniorModalTitle}
              </h2>
              <p className="text-xs text-[#8b949e]">
                {t.seniorModalSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            {wasFlawless && !wasReplay && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#238636]/15 border border-[#3fb950]/40 text-[#3fb950] text-[11px] font-mono font-semibold">
                <Zap className="w-3.5 h-3.5" />
                {t.flawlessBadge}
              </span>
            )}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="min-h-[36px] min-w-[36px] p-1.5 rounded-lg text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d] flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Explicit XP Score Breakdown Table */}
        <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-4 space-y-2.5 font-mono text-xs tabular-nums">
          <div className="flex items-center justify-between pb-2 border-b border-[#30363d]/70">
            <span className="font-sans font-semibold text-[#c9d1d9] flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#58a6ff]" />
              {t.breakdownTitle}
            </span>
            {wasReplay && (
              <span className="text-[11px] text-[#8b949e] font-sans">
                {t.replayCompletedNote}
              </span>
            )}
          </div>

          <div className="space-y-1.5 text-[12px]">
            <div className="flex items-center justify-between text-[#8b949e]">
              <span className="font-sans">{t.breakdownBaseLabel}:</span>
              <span className="text-[#c9d1d9] font-semibold">
                +{basePointsAwarded} XP
              </span>
            </div>

            <div className="flex items-center justify-between text-[#8b949e]">
              <span className="font-sans">{t.breakdownFlawlessLabel}:</span>
              <span
                className={
                  flawlessBonusAwarded > 0
                    ? 'text-[#3fb950] font-semibold'
                    : 'text-[#484f58]'
                }
              >
                +{flawlessBonusAwarded} XP
              </span>
            </div>

            {customBonusAwarded > 0 && (
              <div className="flex items-center justify-between text-[#8b949e]">
                <span className="font-sans">{t.breakdownCustomBonusLabel}:</span>
                <span className="text-[#58a6ff] font-semibold">
                  +{customBonusAwarded} XP
                </span>
              </div>
            )}

            <div className="flex items-center justify-between text-[#8b949e]">
              <span className="font-sans">{t.breakdownPenaltiesLabel}:</span>
              <span
                className={
                  sessionPenalties > 0
                    ? 'text-[#f85149] font-semibold'
                    : 'text-[#484f58]'
                }
              >
                {sessionPenalties > 0 ? `-${sessionPenalties} XP` : '0 XP'}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-[#30363d]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="font-sans text-[#8b949e]">
                {t.breakdownNetSessionLabel}:
              </span>
              <span
                className={`font-bold text-sm ${
                  netSessionBalance >= 0 ? 'text-[#3fb950]' : 'text-[#f85149]'
                }`}
              >
                {netSessionBalance >= 0
                  ? `+${netSessionBalance} XP`
                  : `${netSessionBalance} XP`}
              </span>
            </div>

            <div className="flex items-center gap-2 bg-[#161b22] border border-[#30363d] px-3 py-1 rounded-md">
              <span className="font-sans text-[#8b949e]">
                {t.breakdownTotalScoreLabel}:
              </span>
              <span
                className={`font-bold text-sm ${
                  totalScore < 0 ? 'text-[#f85149]' : 'text-[#f0f6fc]'
                }`}
              >
                {totalScore} XP
              </span>
            </div>
          </div>
        </div>

        {/* Optional Custom Comment Evaluation Card */}
        {proEvaluation && (
          <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#f0f6fc] flex items-center gap-1.5">
                <MessageSquareCode className="w-4 h-4 text-[#58a6ff]" />
                {lang === 'pl'
                  ? 'Ocena Twojego komentarza Code Review:'
                  : 'Evaluation of Your Code Review Comment:'}
              </span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-3.5 h-3.5 ${
                      s <= proEvaluation.rating
                        ? 'fill-[#58a6ff] text-[#58a6ff]'
                        : 'text-[#30363d]'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-[#c9d1d9] leading-relaxed">
              {proEvaluation.feedback}
            </p>
          </div>
        )}

        {/* Senior Technical Explanation Sections */}
        <div className="space-y-3 text-xs sm:text-sm">
          {/* Summary */}
          <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-4">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#58a6ff] flex items-center gap-1.5 mb-1.5">
              <ShieldCheck className="w-4 h-4" />
              {t.summarySectionTitle}
            </span>
            <p className="text-[#f0f6fc] font-medium leading-relaxed">
              {localized.seniorExplanation.summary}
            </p>
          </div>

          {/* Why it matters in production */}
          <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-4">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#f85149] flex items-center gap-1.5 mb-1.5">
              <AlertTriangle className="w-4 h-4" />
              {t.whyItMattersTitle}
            </span>
            <p className="text-[#8b949e] leading-relaxed">
              {localized.seniorExplanation.whyItMatters}
            </p>
          </div>

          {/* How to fix and snippet */}
          <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-4 space-y-2.5">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#3fb950] flex items-center gap-1.5">
              <Wrench className="w-4 h-4" />
              {t.howToFixTitle}
            </span>
            <p className="text-[#c9d1d9] leading-relaxed">
              {localized.seniorExplanation.howToFix}
            </p>
            <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-3 font-mono text-xs text-[#7ee787] overflow-x-auto">
              <pre className="min-w-full w-max">
                {localized.seniorExplanation.fixedCodeSnippet}
              </pre>
            </div>
          </div>
        </div>

        {/* Challenge Relevance Feedback */}
        <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="text-xs font-semibold text-[#c9d1d9] block">
              {t.relevanceQuestion}
            </span>
            {relevanceRating && (
              <span className="text-[11px] text-[#3fb950] block">
                ✓ {t.relevanceThanks}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onRateRelevance(challenge.id, 'up')}
              className={`min-h-[36px] px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                relevanceRating === 'up'
                  ? 'bg-[#238636]/20 border-[#3fb950] text-[#3fb950]'
                  : 'bg-[#161b22] border-[#30363d] text-[#8b949e] hover:text-[#f0f6fc]'
              }`}
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>{t.relevanceUp}</span>
            </button>

            <button
              onClick={() => onRateRelevance(challenge.id, 'down')}
              className={`min-h-[36px] px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                relevanceRating === 'down'
                  ? 'bg-[#f85149]/15 border-[#f85149] text-[#f85149]'
                  : 'bg-[#161b22] border-[#30363d] text-[#8b949e] hover:text-[#f0f6fc]'
              }`}
            >
              <ThumbsDown className="w-3.5 h-3.5" />
              <span>{t.relevanceDown}</span>
            </button>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-2.5 border-t border-[#30363d]">
          <button
            onClick={onOpenAiReview}
            className="w-full sm:w-auto min-h-[40px] px-4 py-2 rounded-lg bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#f0f6fc] font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <MessageSquareCode className="w-4 h-4 text-[#58a6ff]" />
            <span>{t.openAiModalBtn}</span>
          </button>

          <button
            onClick={onNextLevel}
            className="w-full sm:w-auto min-h-[40px] px-5 py-2 rounded-lg bg-[#238636] hover:bg-[#2ea043] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <span>{isLastInTier ? t.finishTierBtn : t.nextChallengeBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
