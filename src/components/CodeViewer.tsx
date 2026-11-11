import React from 'react';
import { ViewMode, Language } from '../types/challenge';
import { UI_TEXT } from '../data/translations';
import {
  FileCode2,
  GitCommit,
  CheckCircle2,
  XCircle,
  Crosshair,
  Bot,
} from 'lucide-react';

interface CodeViewerProps {
  code: string;
  fileName: string;
  viewMode: ViewMode;
  language: string;
  lang: Language;
  codeCommentsLang: Language;
  isAiTrap?: boolean;
  isLineLocked: boolean;
  lockedLineNumber: number | null;
  wrongClickedLines: number[];
  onClickLine: (lineNumber: number) => void;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  code,
  fileName,
  viewMode,
  language,
  lang,
  codeCommentsLang,
  isAiTrap,
  isLineLocked,
  lockedLineNumber,
  wrongClickedLines,
  onClickLine,
}) => {
  const lines = code.split('\n');
  const t = UI_TEXT[lang];

  return (
    <div className="bg-[#0d1117] border border-[#30363d] rounded-xl overflow-hidden">
      {/* Editor Top Bar */}
      <div className="bg-[#161b22] border-b border-[#30363d] px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 font-mono min-w-0">
          {viewMode === 'git_diff' ? (
            <GitCommit className="w-4 h-4 text-[#8b949e] shrink-0" />
          ) : (
            <FileCode2 className="w-4 h-4 text-[#8b949e] shrink-0" />
          )}
          <span className="text-[#f0f6fc] font-semibold truncate">
            {fileName}
          </span>
          <span className="px-1.5 py-0.5 rounded bg-[#21262d] border border-[#30363d] uppercase text-[10px] tracking-wider text-[#8b949e]">
            {language}
          </span>
          <span
            className="px-1.5 py-0.5 rounded bg-[#0d1117] border border-[#30363d] text-[10px] text-[#8b949e]"
            title={
              lang === 'pl'
                ? 'Język komentarzy w kodzie'
                : 'Inline code comments language'
            }
          >
            // {codeCommentsLang.toUpperCase()}
          </span>
          {isAiTrap && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#21262d] border border-[#30363d] text-[#c9d1d9] text-[10px] font-medium">
              <Bot className="w-3 h-3 text-[#58a6ff]" />
              {t.aiTrapBadge}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-[11px] shrink-0">
          {isLineLocked ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#238636]/15 border border-[#238636]/50 text-[#3fb950] font-mono font-semibold tabular-nums">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {t.step1LockedSuccess} #{lockedLineNumber}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#21262d] border border-[#30363d] text-[#8b949e] font-medium">
              <Crosshair className="w-3.5 h-3.5 text-[#58a6ff]" />
              {t.clickTargetHint}
            </span>
          )}
        </div>
      </div>

      {/* Horizontal Scroll Container: inner min-w-full w-max inline-block guarantees backgrounds span 100% of scrollWidth */}
      <div className="font-mono text-xs sm:text-[13px] overflow-x-auto py-1.5 leading-relaxed">
        <div className="min-w-full w-max inline-block align-top">
          {lines.map((lineContent, idx) => {
            const lineNumber = idx + 1;
            const isLockedTarget =
              isLineLocked && lockedLineNumber === lineNumber;
            const isWrongClicked = wrongClickedLines.includes(lineNumber);

            const isDiffAdd =
              viewMode === 'git_diff' && lineContent.startsWith('+');
            const isDiffDelete =
              viewMode === 'git_diff' && lineContent.startsWith('-');
            const isDiffHeader =
              viewMode === 'git_diff' && lineContent.startsWith('@@');

            let lineBgClass =
              'hover:bg-[#161b22] text-[#c9d1d9] border-l-2 border-transparent';
            if (isDiffHeader) {
              lineBgClass =
                'bg-[#161b22] text-[#8b949e] font-semibold border-l-2 border-[#30363d]';
            } else if (isDiffAdd) {
              lineBgClass =
                'bg-[#238636]/15 text-[#7ee787] hover:bg-[#238636]/25 border-l-2 border-[#3fb950]';
            } else if (isDiffDelete) {
              lineBgClass =
                'bg-[#f85149]/15 text-[#ffa198] hover:bg-[#f85149]/25 border-l-2 border-[#f85149]';
            }

            if (isWrongClicked) {
              lineBgClass =
                'bg-[#f85149]/15 text-[#8b949e] border-l-2 border-[#f85149]';
            }

            if (isLockedTarget) {
              lineBgClass =
                'bg-[#238636]/25 text-[#f0f6fc] border-l-2 border-[#3fb950]';
            }

            const isInteractive = !isDiffHeader && !isLineLocked;

            return (
              <div
                key={lineNumber}
                role={isInteractive ? 'button' : undefined}
                tabIndex={isInteractive ? 0 : undefined}
                onClick={
                  isInteractive ? () => onClickLine(lineNumber) : undefined
                }
                onKeyDown={
                  isInteractive
                    ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onClickLine(lineNumber);
                        }
                      }
                    : undefined
                }
                className={`group min-h-[38px] py-1 flex items-center justify-between ${
                  isInteractive ? 'cursor-pointer' : 'cursor-default'
                } transition-colors duration-100 relative select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#58a6ff] ${lineBgClass}`}
              >
                <div className="flex items-center">
                  {/* Line Number Gutter */}
                  <div className="w-12 sm:w-14 text-right pr-3.5 text-[#484f58] group-hover:text-[#8b949e] font-mono text-xs tabular-nums select-none shrink-0 border-r border-[#30363d]/60 mr-3">
                    {isDiffHeader ? '@@' : lineNumber}
                  </div>

                  {/* Diff Marker (+ / -) */}
                  {viewMode === 'git_diff' && (
                    <span className="w-5 text-center font-bold text-xs shrink-0 select-none">
                      {isDiffAdd ? '+' : isDiffDelete ? '-' : ' '}
                    </span>
                  )}

                  {/* Code Line Content */}
                  <pre className="font-mono pr-6 whitespace-pre">
                    {viewMode === 'git_diff' && (isDiffAdd || isDiffDelete)
                      ? lineContent.slice(1)
                      : lineContent || ' '}
                  </pre>
                </div>

                {/* Right-side Status / Hover Pill */}
                <div className="pr-3 pl-2 shrink-0 flex items-center">
                  {isLockedTarget ? (
                    <span className="text-[10px] font-mono font-bold bg-[#238636] text-white px-2 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {t.lineHitBadge}
                    </span>
                  ) : isWrongClicked ? (
                    <span className="text-[10px] font-mono font-bold bg-[#f85149]/20 text-[#f85149] border border-[#f85149]/40 px-2 py-0.5 rounded flex items-center gap-1 tabular-nums">
                      <XCircle className="w-3 h-3" />
                      {t.lineMissBadge}
                    </span>
                  ) : isInteractive ? (
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-100 text-[10px] font-mono bg-[#21262d] border border-[#30363d] text-[#c9d1d9] px-2 py-0.5 rounded flex items-center gap-1">
                      <Crosshair className="w-3 h-3 text-[#58a6ff]" />
                      {t.markLineBadge}
                    </span>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
