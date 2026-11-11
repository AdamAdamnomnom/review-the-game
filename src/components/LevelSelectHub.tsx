import React from 'react';
import {
  Challenge,
  DifficultyTier,
  Language,
} from '../types/challenge';
import { TIER_META, UI_TEXT, getRankForScore, getNextRank } from '../data/translations';
import {
  CheckCircle2,
  Play,
  BookOpen,
  Bot,
  GitPullRequest,
  FileCode2,
  Info,
  Trophy,
} from 'lucide-react';

interface LevelSelectHubProps {
  challenges: Challenge[];
  completedChallengeIds: string[];
  currentChallengeId: string;
  lang: Language;
  score: number;
  onSelectChallenge: (challengeId: string) => void;
  onOpenPlaybook: () => void;
}

const TIERS: DifficultyTier[] = ['junior', 'mid', 'senior'];

export const LevelSelectHub: React.FC<LevelSelectHubProps> = ({
  challenges,
  completedChallengeIds,
  currentChallengeId,
  lang,
  score,
  onSelectChallenge,
  onOpenPlaybook,
}) => {
  const t = UI_TEXT[lang];
  const currentRank = getRankForScore(score);
  const nextRank = getNextRank(score);

  return (
    <div className="space-y-6 pb-8">
      {/* Hero Banner — Clean Graphite Surface */}
      <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-6 sm:p-7">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2.5">
            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded bg-[#21262d] border border-[#30363d] text-[10px] font-mono font-semibold uppercase tracking-wider text-[#8b949e]">
              <span>{t.hubHeroEyebrow}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#f0f6fc]">
              {t.hubHeroTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#8b949e] leading-relaxed">
              {t.hubHeroDesc}
            </p>
          </div>

          {/* Rank & Playbook Quick Card */}
          <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-4 min-w-[260px] space-y-3 shrink-0">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-[#58a6ff]" />
                <span className="text-xs text-[#8b949e]">
                  {lang === 'pl' ? 'Aktualna ranga:' : 'Current Rank:'}
                </span>
              </div>
              <span className="text-xs font-mono tabular-nums font-bold text-[#f0f6fc]">
                {score} XP
              </span>
            </div>

            <div className={`px-3 py-2 rounded-md border text-xs font-semibold flex items-center justify-between ${currentRank.badgeColor}`}>
              <span>{currentRank.title[lang]}</span>
              <span className="font-mono text-[10px] text-[#8b949e] tabular-nums">
                {completedChallengeIds.length}/{challenges.length}
              </span>
            </div>

            {nextRank && (
              <p className="text-[11px] text-[#8b949e] tabular-nums">
                {lang === 'pl'
                  ? `Następny awans: ${nextRank.title.pl} (${nextRank.minScore} XP)`
                  : `Next promotion: ${nextRank.title.en} (${nextRank.minScore} XP)`}
              </p>
            )}

            <button
              onClick={onOpenPlaybook}
              className="w-full min-h-[38px] px-3 py-2 rounded-lg bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] hover:border-[#58a6ff]/50 text-xs font-semibold text-[#f0f6fc] flex items-center justify-center gap-2 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#58a6ff]" />
              <span>
                {lang === 'pl'
                  ? 'Otwórz Code Review Playbook'
                  : 'Open Code Review Playbook'}
              </span>
            </button>
          </div>
        </div>

        {/* Positioning Disclaimer Banner */}
        <div className="mt-5 pt-4 border-t border-[#30363d] flex items-start sm:items-center gap-2 text-xs text-[#8b949e]">
          <Info className="w-4 h-4 text-[#8b949e] shrink-0 mt-0.5 sm:mt-0" />
          <span>{t.hubNotForBeginners}</span>
        </div>
      </div>

      {/* 3 Difficulty Tiers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {TIERS.map((tier) => {
          const meta = TIER_META[tier];
          const tierChallenges = challenges.filter((c) => c.tier === tier);
          const completedInTier = tierChallenges.filter((c) =>
            completedChallengeIds.includes(c.id)
          ).length;
          const progressPct =
            tierChallenges.length > 0
              ? Math.round((completedInTier / tierChallenges.length) * 100)
              : 0;

          const nextChallenge =
            tierChallenges.find((c) => !completedChallengeIds.includes(c.id)) ||
            tierChallenges[0];

          return (
            <div
              key={tier}
              className="bg-[#161b22] border border-[#30363d] hover:border-[#484f58] rounded-xl p-5 flex flex-col justify-between transition-colors"
            >
              <div className="space-y-4">
                {/* Tier Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#0d1117] border border-[#30363d] text-[#58a6ff]">
                        {meta.badge}
                      </span>
                      <h3 className="text-base font-bold text-[#f0f6fc] tracking-tight">
                        {meta.title[lang]}
                      </h3>
                    </div>
                    <p className="text-xs text-[#8b949e] mt-1">
                      {meta.subtitle[lang]}
                    </p>
                  </div>

                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded border bg-[#0d1117] text-[#8b949e] border-[#30363d] shrink-0">
                    {meta.viewLabel[lang]}
                  </span>
                </div>

                {/* Tier Description */}
                <p className="text-xs text-[#8b949e] leading-relaxed">
                  {meta.description[lang]}
                </p>

                {/* Progress Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#8b949e] font-medium">
                      {t.completedCount}
                    </span>
                    <span className="font-mono tabular-nums font-semibold text-[#c9d1d9]">
                      {completedInTier}/{tierChallenges.length} ({progressPct}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#0d1117] rounded-full overflow-hidden border border-[#30363d]">
                    <div
                      className={`h-full transition-all duration-300 ${
                        completedInTier === tierChallenges.length
                          ? 'bg-[#3fb950]'
                          : 'bg-[#58a6ff]'
                      }`}
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>

                {/* Challenge List inside Tier */}
                <div className="space-y-2 pt-2">
                  {tierChallenges.map((c) => {
                    const isDone = completedChallengeIds.includes(c.id);
                    const isCurrent = c.id === currentChallengeId;

                    return (
                      <button
                        key={c.id}
                        onClick={() => onSelectChallenge(c.id)}
                        className={`w-full min-h-[44px] px-3 py-2 rounded-lg border text-left flex items-center justify-between gap-2 transition-colors ${
                          isCurrent
                            ? 'bg-[#1f6feb]/15 border-[#58a6ff] text-[#f0f6fc]'
                            : isDone
                            ? 'bg-[#0d1117] border-[#238636]/50 text-[#c9d1d9] hover:border-[#3fb950]'
                            : 'bg-[#0d1117] border-[#30363d] text-[#c9d1d9] hover:border-[#484f58] hover:bg-[#21262d]/40'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-[#3fb950] shrink-0" />
                          ) : c.viewMode === 'git_diff' ? (
                            <GitPullRequest className="w-4 h-4 text-[#8b949e] shrink-0" />
                          ) : (
                            <FileCode2 className="w-4 h-4 text-[#8b949e] shrink-0" />
                          )}
                          <div className="min-w-0">
                            <div className="text-xs font-semibold truncate">
                              {c.levelInTier}. {c.i18n[lang].title}
                            </div>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="text-[10px] font-mono text-[#8b949e]">
                                {c.fileName}
                              </span>
                              {c.isAiTrap && (
                                <span className="inline-flex items-center gap-1 text-[9px] font-mono font-medium px-1.5 py-0.2 rounded bg-[#21262d] text-[#c9d1d9] border border-[#30363d]">
                                  <Bot className="w-2.5 h-2.5 text-[#58a6ff]" />
                                  AI AUDIT
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <span className="text-xs font-mono tabular-nums font-semibold text-[#8b949e] shrink-0">
                          +{c.points} XP
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tier CTA Button */}
              <div className="pt-4 mt-4 border-t border-[#30363d]">
                <button
                  onClick={() => onSelectChallenge(nextChallenge.id)}
                  className="w-full min-h-[40px] py-2 px-4 rounded-lg bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#f0f6fc] font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Play className="w-3.5 h-3.5 text-[#58a6ff]" />
                  <span>
                    {completedInTier > 0 ? t.continueTierBtn : t.selectTierBtn}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
