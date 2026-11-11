import React, { useState, useEffect } from 'react';
import {
  Challenge,
  DiagnosticOption,
  Language,
  ScoreDeltaEvent,
} from '../types/challenge';
import { UI_TEXT } from '../data/translations';
import {
  Crosshair,
  Lock,
  HelpCircle,
  AlertCircle,
  CheckCircle2,
  XCircle,
  MessageSquareCode,
  Send,
  ListChecks,
  ArrowRight,
  BookOpenCheck,
  Award,
} from 'lucide-react';

interface ActionPanelProps {
  challenge: Challenge;
  lang: Language;
  score: number;
  sessionPenaltyTotal: number;
  lastScoreDelta: ScoreDeltaEvent | null;
  isLineLocked: boolean;
  lockedLineNumber: number | null;
  isChallengeSolved: boolean;
  isLastInTier: boolean;
  wrongOptionIds: ('A' | 'B' | 'C' | 'D')[];
  shownHints: string[];
  penaltyMessage: string | null;
  onSelectOption: (option: DiagnosticOption) => void;
  onSubmitCustomComment: (commentText: string) => void;
  onShowHint: () => void;
  onReopenSeniorModal: () => void;
  onNextChallenge: () => void;
}

export const ActionPanel: React.FC<ActionPanelProps> = ({
  challenge,
  lang,
  score,
  sessionPenaltyTotal,
  lastScoreDelta,
  isLineLocked,
  lockedLineNumber,
  isChallengeSolved,
  isLastInTier,
  wrongOptionIds,
  shownHints,
  penaltyMessage,
  onSelectOption,
  onSubmitCustomComment,
  onShowHint,
  onReopenSeniorModal,
  onNextChallenge,
}) => {
  const t = UI_TEXT[lang];
  const localized = challenge.i18n[lang];

  const [diagnosisMode, setDiagnosisMode] = useState<'abcd' | 'custom_comment'>('abcd');
  const [customText, setCustomText] = useState('');

  // Reset local mode/input when challenge changes
  useEffect(() => {
    setCustomText('');
    setDiagnosisMode('abcd');
  }, [challenge.id]);

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 space-y-4">
      {/* Live XP & Session Penalty Bar right in user's line of sight */}
      <div className="bg-[#0d1117] border border-[#30363d] rounded-lg px-3.5 py-2.5 flex items-center justify-between gap-2 text-xs font-mono tabular-nums">
        <div className="flex items-center gap-2">
          <Award className={`w-3.5 h-3.5 shrink-0 ${score < 0 ? 'text-[#f85149]' : 'text-[#58a6ff]'}`} />
          <span className="text-[#8b949e] font-sans">{t.currentTotalXpLabel}:</span>
          <span className={`font-bold ${score < 0 ? 'text-[#f85149]' : 'text-[#f0f6fc]'}`}>
            {score} XP
          </span>
          {lastScoreDelta && (
            <span
              key={lastScoreDelta.id}
              className={`animate-score-delta text-[11px] font-bold px-1.5 py-0.5 rounded border ${
                lastScoreDelta.delta < 0
                  ? 'bg-[#f85149]/15 text-[#f85149] border-[#f85149]/40'
                  : 'bg-[#238636]/20 text-[#3fb950] border-[#3fb950]/40'
              }`}
            >
              {lastScoreDelta.delta > 0
                ? `+${lastScoreDelta.delta}`
                : lastScoreDelta.delta}{' '}
              XP
            </span>
          )}
        </div>

        <div className="text-right">
          <span className="text-[#8b949e] font-sans hidden sm:inline mr-1.5">
            {t.sessionPenaltiesLabel}:
          </span>
          <span
            className={`font-semibold ${
              sessionPenaltyTotal > 0 ? 'text-[#f85149]' : 'text-[#3fb950]'
            }`}
          >
            {sessionPenaltyTotal > 0 ? `-${sessionPenaltyTotal} XP` : '0 XP'}
          </span>
        </div>
      </div>

      {/* STEP 1: Line Hunt Status */}
      <div className="space-y-3 pb-4 border-b border-[#30363d]">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-mono font-bold ${
                isLineLocked
                  ? 'bg-[#238636] text-white'
                  : 'bg-[#21262d] text-[#f0f6fc] border border-[#30363d]'
              }`}
            >
              1
            </span>
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#f0f6fc]">
              {t.step1Title}
            </h3>
          </div>

          {/* Hint Button with stable min-width */}
          <button
            onClick={onShowHint}
            disabled={isChallengeSolved || shownHints.length >= localized.hints.length}
            className={`min-h-[34px] min-w-[165px] px-3 py-1 text-xs font-medium rounded-lg border flex items-center justify-center gap-1.5 tabular-nums transition-colors ${
              isChallengeSolved || shownHints.length >= localized.hints.length
                ? 'bg-[#0d1117] text-[#484f58] border-[#30363d] cursor-not-allowed'
                : 'bg-[#21262d] text-[#c9d1d9] border-[#30363d] hover:border-[#58a6ff]/50 hover:text-[#f0f6fc]'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#8b949e]" />
            <span>
              {shownHints.length >= localized.hints.length
                ? t.noMoreHints
                : `${t.hintBtn} (${shownHints.length}/${localized.hints.length})`}
            </span>
          </button>
        </div>

        {isLineLocked ? (
          <div className="bg-[#238636]/10 border border-[#238636]/50 rounded-lg p-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#3fb950]">
              <CheckCircle2 className="w-4 h-4 text-[#3fb950] shrink-0" />
              <span>
                {t.step1LockedSuccess}:{' '}
                <span className="font-mono bg-[#0d1117] px-2 py-0.5 rounded border border-[#238636]/50 text-[#f0f6fc] tabular-nums">
                  #{lockedLineNumber}
                </span>
              </span>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#3fb950]">
              STEP 2 READY
            </span>
          </div>
        ) : (
          <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-3.5 space-y-2">
            <div className="flex items-start gap-2.5 text-xs text-[#c9d1d9] leading-relaxed">
              <Crosshair className="w-4 h-4 text-[#58a6ff] shrink-0 mt-0.5" />
              <span>{t.step1Instruction}</span>
            </div>
            <div className="text-[11px] font-mono text-[#8b949e] pl-6">
              {t.step1Warning}
            </div>
          </div>
        )}

        {/* Shown Hints */}
        {shownHints.length > 0 && (
          <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-3 space-y-1.5">
            {shownHints.map((hint, i) => (
              <p
                key={i}
                className="text-xs text-[#c9d1d9] flex items-start gap-2 leading-relaxed"
              >
                <span className="font-mono font-bold text-[#58a6ff] shrink-0">
                  #{i + 1}:
                </span>
                <span>{hint}</span>
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Immediate Penalty / Error Banner */}
      {penaltyMessage && (
        <div
          role="alert"
          className="bg-[#f85149]/10 border border-[#f85149]/60 text-[#ffa198] rounded-lg p-3 text-xs font-medium flex items-center justify-between gap-2.5"
        >
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-[#f85149] shrink-0 mt-0.5" />
            <span>{penaltyMessage}</span>
          </div>
          {lastScoreDelta && lastScoreDelta.delta < 0 && (
            <span className="shrink-0 font-mono font-bold text-[11px] px-2 py-0.5 rounded bg-[#f85149]/20 text-[#f85149] border border-[#f85149]/40 tabular-nums">
              {lastScoreDelta.delta} XP
            </span>
          )}
        </div>
      )}

      {/* STEP 2: Technical Diagnosis (Locked until Step 1 succeeds) */}
      {!isLineLocked ? (
        <div className="bg-[#0d1117] border border-dashed border-[#30363d] rounded-lg p-6 text-center space-y-2 select-none">
          <div className="w-9 h-9 rounded-lg bg-[#161b22] border border-[#30363d] flex items-center justify-center mx-auto text-[#8b949e]">
            <Lock className="w-4 h-4" />
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-[#c9d1d9]">
            {t.step2LockedTitle}
          </h4>
          <p className="text-xs text-[#8b949e] max-w-sm mx-auto leading-relaxed">
            {t.step2LockedDesc}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-[#1f6feb] text-white flex items-center justify-center text-xs font-mono font-bold">
                2
              </span>
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#f0f6fc]">
                {t.step2Title}
              </h3>
            </div>

            {/* Mode Switcher: Standard ABCD vs Custom Comment */}
            <div className="grid grid-cols-2 bg-[#0d1117] p-1 rounded-lg border border-[#30363d]">
              <button
                type="button"
                onClick={() => setDiagnosisMode('abcd')}
                className={`min-h-[30px] px-2.5 py-1 rounded text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                  diagnosisMode === 'abcd'
                    ? 'bg-[#21262d] text-[#f0f6fc] border border-[#30363d]'
                    : 'text-[#8b949e] hover:text-[#c9d1d9] border border-transparent'
                }`}
              >
                <ListChecks className="w-3 h-3 shrink-0" />
                <span className="truncate">{t.modeStandardTab}</span>
              </button>
              <button
                type="button"
                onClick={() => setDiagnosisMode('custom_comment')}
                className={`min-h-[30px] px-2.5 py-1 rounded text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                  diagnosisMode === 'custom_comment'
                    ? 'bg-[#21262d] text-[#f0f6fc] border border-[#30363d]'
                    : 'text-[#8b949e] hover:text-[#c9d1d9] border border-transparent'
                }`}
              >
                <MessageSquareCode className="w-3 h-3 shrink-0 text-[#58a6ff]" />
                <span className="truncate">{t.modeCustomCommentTab}</span>
              </button>
            </div>
          </div>

          {diagnosisMode === 'abcd' ? (
            <div className="space-y-2.5">
              <p className="text-xs text-[#8b949e]">{t.step2Subtitle}</p>

              <div className="space-y-2">
                {challenge.options.map((opt) => {
                  const isWrong = wrongOptionIds.includes(opt.id);
                  const isSolvedCorrect = isChallengeSolved && opt.isCorrect;

                  return (
                    <button
                      key={opt.id}
                      disabled={isWrong || isChallengeSolved}
                      onClick={() => onSelectOption(opt)}
                      className={`w-full min-h-[48px] p-3.5 rounded-lg border text-left flex items-start gap-3 transition-colors ${
                        isSolvedCorrect
                          ? 'bg-[#238636]/15 border-[#3fb950] text-[#f0f6fc] cursor-default'
                          : isWrong
                          ? 'bg-[#f85149]/10 border-[#f85149]/40 text-[#8b949e] cursor-not-allowed opacity-75'
                          : isChallengeSolved
                          ? 'bg-[#0d1117]/60 border-[#30363d] text-[#8b949e] cursor-not-allowed opacity-60'
                          : 'bg-[#0d1117] border-[#30363d] hover:border-[#58a6ff] hover:bg-[#21262d]/60 text-[#c9d1d9]'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border ${
                          isSolvedCorrect
                            ? 'bg-[#238636] border-[#3fb950] text-white'
                            : isWrong
                            ? 'bg-[#f85149]/20 border-[#f85149] text-[#f85149]'
                            : 'bg-[#161b22] border-[#30363d] text-[#8b949e]'
                        }`}
                      >
                        {opt.id}
                      </span>

                      <span className="text-xs sm:text-[13px] leading-relaxed flex-1">
                        {opt.text[lang]}
                      </span>

                      {isSolvedCorrect && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#3fb950] shrink-0 mt-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          OK
                        </span>
                      )}

                      {isWrong && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#f85149] shrink-0 mt-1 tabular-nums">
                          <XCircle className="w-3.5 h-3.5" />
                          -30 XP
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Custom Review Comment Mode */
            <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#f0f6fc]">
                <MessageSquareCode className="w-4 h-4 text-[#58a6ff]" />
                <span>{t.customCommentHeader}</span>
              </div>
              <p className="text-xs text-[#8b949e] leading-relaxed">
                {t.proHardcorePrompt}
              </p>
              <textarea
                rows={4}
                disabled={isChallengeSolved}
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder={t.proHardcorePlaceholder}
                className="w-full bg-[#161b22] border border-[#30363d] focus:border-[#58a6ff] rounded-lg p-3 text-xs sm:text-sm text-[#f0f6fc] placeholder-[#484f58] outline-none font-mono disabled:opacity-60"
              />
              <button
                type="button"
                onClick={() => {
                  if (!isChallengeSolved && customText.trim().length >= 8) {
                    onSubmitCustomComment(customText);
                  }
                }}
                disabled={isChallengeSolved || customText.trim().length < 8}
                className="w-full min-h-[40px] py-2 px-4 rounded-lg bg-[#1f6feb] hover:bg-[#388bfd] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t.proHardcoreSubmitBtn}</span>
              </button>
            </div>
          )}

          {/* Post-Solution Action Bar */}
          {isChallengeSolved && (
            <div className="bg-[#238636]/10 border border-[#238636]/50 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#3fb950]">
                <CheckCircle2 className="w-4 h-4 text-[#3fb950] shrink-0" />
                <span>{t.challengeSolvedBanner}</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2.5">
                <button
                  onClick={onReopenSeniorModal}
                  className="w-full sm:flex-1 min-h-[38px] px-3.5 py-2 rounded-lg bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] text-xs font-semibold text-[#f0f6fc] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <BookOpenCheck className="w-3.5 h-3.5 text-[#58a6ff]" />
                  <span>{t.reopenExplanationBtn}</span>
                </button>
                <button
                  onClick={onNextChallenge}
                  className="w-full sm:flex-1 min-h-[38px] px-3.5 py-2 rounded-lg bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>{isLastInTier ? t.finishTierBtn : t.nextChallengeBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
