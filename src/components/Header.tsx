import React from 'react';
import {
  GitPullRequest,
  Award,
  Flame,
  BookOpen,
  LayoutGrid,
  Code2,
  Settings,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import { Language, ScoreDeltaEvent } from '../types/challenge';
import { UI_TEXT, getRankForScore, getNextRank } from '../data/translations';

export type ActiveTab = 'hub' | 'arena' | 'playbook';

interface HeaderProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  score: number;
  lastScoreDelta: ScoreDeltaEvent | null;
  streak: number;
  lang: Language;
  codeCommentsLang: Language;
  onOpenSettingsModal: () => void;
  onOpenProModal: () => void;
  completedCount: number;
  totalCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  score,
  lastScoreDelta,
  streak,
  lang,
  codeCommentsLang,
  onOpenSettingsModal,
  onOpenProModal,
  completedCount,
  totalCount,
}) => {
  const t = UI_TEXT[lang];
  const currentRank = getRankForScore(score);
  const nextRank = getNextRank(score);

  return (
    <header className="border-b border-[#30363d] bg-[#0d1117] px-4 sm:px-6 py-2.5 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Left: Logo + BETA Badge + Mobile Settings */}
        <div className="w-full lg:w-auto flex items-center justify-between gap-3">
          <button
            onClick={() => onSelectTab('hub')}
            className="flex items-center gap-2.5 text-left group focus-visible:ring-1 focus-visible:ring-[#58a6ff] rounded-lg outline-none"
          >
            <div className="bg-[#161b22] border border-[#30363d] group-hover:border-[#58a6ff]/60 p-2 rounded-lg text-[#f0f6fc] transition-colors">
              <GitPullRequest className="w-4 h-4 text-[#58a6ff]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-bold tracking-tight text-[#f0f6fc]">
                  Review<span className="text-[#58a6ff]">TheGame</span>
                </h1>
                <span
                  title={t.betaTooltip}
                  className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#161b22] text-[#8b949e] border border-[#30363d]"
                >
                  {t.betaBadge}
                </span>
              </div>
              <p className="text-[11px] text-[#8b949e] hidden sm:block">
                {t.tagline}
              </p>
            </div>
          </button>

          {/* Mobile Quick Settings Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenSettingsModal}
              className="min-h-[36px] min-w-[78px] px-2.5 py-1 rounded-lg bg-[#161b22] border border-[#30363d] text-xs font-mono font-medium text-[#c9d1d9] hover:border-[#58a6ff]/50 flex items-center justify-center gap-1.5 transition-colors"
              aria-label={t.settingsBtnLabel}
            >
              <Settings className="w-3.5 h-3.5 text-[#8b949e]" />
              <span>{lang.toUpperCase()}/{codeCommentsLang.toUpperCase()}</span>
            </button>
          </div>
        </div>

        {/* Center Navigation Tabs — fixed min-widths to prevent layout shift */}
        <nav className="w-full lg:w-auto grid grid-cols-3 bg-[#161b22] p-1 rounded-lg border border-[#30363d]">
          <button
            onClick={() => onSelectTab('hub')}
            className={`min-h-[34px] min-w-[116px] px-3 py-1 rounded-md text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'hub'
                ? 'bg-[#21262d] text-[#f0f6fc] border border-[#30363d]'
                : 'text-[#8b949e] hover:text-[#c9d1d9] border border-transparent'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{t.navHub}</span>
            <span className="text-[10px] font-mono tabular-nums px-1.5 py-0.2 rounded bg-[#0d1117] text-[#8b949e] border border-[#30363d]/60">
              {completedCount}/{totalCount}
            </span>
          </button>

          <button
            onClick={() => onSelectTab('arena')}
            className={`min-h-[34px] min-w-[116px] px-3 py-1 rounded-md text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'arena'
                ? 'bg-[#21262d] text-[#f0f6fc] border border-[#30363d]'
                : 'text-[#8b949e] hover:text-[#c9d1d9] border border-transparent'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{t.navArena}</span>
          </button>

          <button
            onClick={() => onSelectTab('playbook')}
            className={`min-h-[34px] min-w-[116px] px-3 py-1 rounded-md text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'playbook'
                ? 'bg-[#21262d] text-[#f0f6fc] border border-[#30363d]'
                : 'text-[#8b949e] hover:text-[#c9d1d9] border border-transparent'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{t.navPlaybook}</span>
          </button>
        </nav>

        {/* Right Controls: Rank, Streak, XP Score + Delta, PRO Badge, Settings */}
        <div className="w-full lg:w-auto flex items-center justify-between lg:justify-end gap-2 flex-wrap">
          {/* Developer Rank Pill */}
          <div
            className={`hidden xl:flex items-center gap-1.5 min-w-[196px] justify-center px-2.5 py-1.5 rounded-lg border text-xs font-medium ${currentRank.badgeColor}`}
            title={
              nextRank
                ? `${lang === 'pl' ? 'Kolejna ranga od' : 'Next rank at'}: ${nextRank.minScore} XP`
                : 'Max Rank'
            }
          >
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{currentRank.title[lang]}</span>
          </div>

          {/* Streak Counter */}
          <div
            className="min-h-[36px] min-w-[56px] px-2.5 py-1 rounded-lg border bg-[#161b22] border-[#30363d] flex items-center justify-center gap-1.5 text-xs font-mono tabular-nums font-semibold text-[#c9d1d9]"
            title={lang === 'pl' ? 'Seria bezbłędnych recenzji' : 'Flawless review streak'}
          >
            <Flame className={`w-3.5 h-3.5 ${streak > 0 ? 'text-[#3fb950]' : 'text-[#484f58]'}`} />
            <span>{streak}</span>
          </div>

          {/* XP Score Badge with Real-Time Delta Indicator */}
          <div className="min-h-[36px] min-w-[172px] flex items-center justify-between gap-2 bg-[#161b22] border border-[#30363d] px-3 py-1 rounded-lg font-mono tabular-nums">
            <div className="flex items-center gap-1.5">
              <Award className={`w-3.5 h-3.5 shrink-0 ${score < 0 ? 'text-[#f85149]' : 'text-[#58a6ff]'}`} />
              <span className="text-[11px] text-[#8b949e]">{t.scoreLabel}:</span>
              <span
                className={`text-xs sm:text-sm font-bold ${
                  score < 0 ? 'text-[#f85149]' : 'text-[#f0f6fc]'
                }`}
              >
                {score}
              </span>
            </div>

            {lastScoreDelta && (
              <span
                key={lastScoreDelta.id}
                className={`animate-score-delta text-[10px] font-bold px-1.5 py-0.5 rounded border tabular-nums ${
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

          {/* PRO Button (Opens Coming Soon Modal, NOT a toggle) */}
          <button
            type="button"
            onClick={onOpenProModal}
            className="min-h-[36px] min-w-[72px] flex items-center justify-center gap-1.5 px-2.5 py-1 text-xs font-mono font-semibold rounded-lg bg-[#161b22] text-[#8b949e] border border-[#30363d] hover:text-[#f0f6fc] hover:border-[#484f58] transition-colors"
            title={t.proModalTitle}
          >
            <Lock className="w-3 h-3 text-[#8b949e]" />
            <span>{t.proBadgeLabel}</span>
          </button>

          {/* Settings Button (Opens SettingsModal with 2 independent language selectors) */}
          <button
            type="button"
            onClick={onOpenSettingsModal}
            className="hidden lg:flex min-h-[36px] min-w-[96px] px-2.5 py-1 rounded-lg bg-[#161b22] border border-[#30363d] text-xs font-mono font-medium text-[#c9d1d9] hover:text-[#f0f6fc] hover:border-[#58a6ff]/50 transition-colors items-center justify-center gap-1.5"
            title={t.settingsBtnLabel}
          >
            <Settings className="w-3.5 h-3.5 text-[#8b949e]" />
            <span className="tabular-nums">
              {lang.toUpperCase()} · //{codeCommentsLang.toUpperCase()}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
