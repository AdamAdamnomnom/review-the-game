import React, { useEffect } from 'react';
import { Language } from '../types/challenge';
import { UI_TEXT } from '../data/translations';
import { Settings, Globe, Code2, X, Check, Info, Clock, Shield, Sparkles } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  uiLang: Language;
  codeCommentsLang: Language;
  onChangeUiLang: (lang: Language) => void;
  onChangeCodeCommentsLang: (lang: Language) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  uiLang,
  codeCommentsLang,
  onChangeUiLang,
  onChangeCodeCommentsLang,
  onClose,
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

  const t = UI_TEXT[uiLang];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#161b22] border border-[#30363d] rounded-xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-4 border-b border-[#30363d]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#21262d] border border-[#30363d] flex items-center justify-center text-[#c9d1d9] shrink-0">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#f0f6fc]">
                {t.settingsModalTitle}
              </h2>
              <p className="text-xs text-[#8b949e] mt-0.5">
                {t.settingsModalSubtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close settings"
            className="min-h-[36px] min-w-[36px] p-1.5 rounded-lg text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Selector 1: UI & Senior Language */}
        <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-4 space-y-3">
          <div className="flex items-start gap-2.5">
            <Globe className="w-4 h-4 text-[#58a6ff] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#f0f6fc] block">
                {t.settingsUiLangLabel}
              </label>
              <p className="text-[11px] text-[#8b949e] leading-relaxed">
                {t.settingsUiLangDesc}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => onChangeUiLang('pl')}
              className={`min-h-[40px] px-3 py-2 rounded-lg border text-xs font-semibold flex items-center justify-between transition-all ${
                uiLang === 'pl'
                  ? 'bg-[#1f6feb]/15 border-[#58a6ff] text-[#f0f6fc]'
                  : 'bg-[#161b22] border-[#30363d] text-[#8b949e] hover:text-[#c9d1d9] hover:border-[#484f58]'
              }`}
            >
              <span className="font-mono">Polski (PL)</span>
              {uiLang === 'pl' && <Check className="w-3.5 h-3.5 text-[#58a6ff]" />}
            </button>

            <button
              type="button"
              onClick={() => onChangeUiLang('en')}
              className={`min-h-[40px] px-3 py-2 rounded-lg border text-xs font-semibold flex items-center justify-between transition-all ${
                uiLang === 'en'
                  ? 'bg-[#1f6feb]/15 border-[#58a6ff] text-[#f0f6fc]'
                  : 'bg-[#161b22] border-[#30363d] text-[#8b949e] hover:text-[#c9d1d9] hover:border-[#484f58]'
              }`}
            >
              <span className="font-mono">English (EN)</span>
              {uiLang === 'en' && <Check className="w-3.5 h-3.5 text-[#58a6ff]" />}
            </button>
          </div>
        </div>

        {/* Selector 2: Code Inline Comments Language */}
        <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-4 space-y-3">
          <div className="flex items-start gap-2.5">
            <Code2 className="w-4 h-4 text-[#58a6ff] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#f0f6fc] block">
                {t.settingsCodeLangLabel}
              </label>
              <p className="text-[11px] text-[#8b949e] leading-relaxed">
                {t.settingsCodeLangDesc}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => onChangeCodeCommentsLang('en')}
              className={`min-h-[40px] px-3 py-2 rounded-lg border text-xs font-semibold flex items-center justify-between transition-all ${
                codeCommentsLang === 'en'
                  ? 'bg-[#1f6feb]/15 border-[#58a6ff] text-[#f0f6fc]'
                  : 'bg-[#161b22] border-[#30363d] text-[#8b949e] hover:text-[#c9d1d9] hover:border-[#484f58]'
              }`}
            >
              <span className="font-mono">// English (EN)</span>
              {codeCommentsLang === 'en' && <Check className="w-3.5 h-3.5 text-[#58a6ff]" />}
            </button>

            <button
              type="button"
              onClick={() => onChangeCodeCommentsLang('pl')}
              className={`min-h-[40px] px-3 py-2 rounded-lg border text-xs font-semibold flex items-center justify-between transition-all ${
                codeCommentsLang === 'pl'
                  ? 'bg-[#1f6feb]/15 border-[#58a6ff] text-[#f0f6fc]'
                  : 'bg-[#161b22] border-[#30363d] text-[#8b949e] hover:text-[#c9d1d9] hover:border-[#484f58]'
              }`}
            >
              <span className="font-mono">// Polski (PL)</span>
              {codeCommentsLang === 'pl' && <Check className="w-3.5 h-3.5 text-[#58a6ff]" />}
            </button>
          </div>

          <div className="flex items-start gap-2 pt-1 text-[11px] text-[#8b949e] border-t border-[#30363d]/60">
            <Info className="w-3.5 h-3.5 text-[#8b949e] shrink-0 mt-0.5" />
            <span>{t.settingsCodeRuleNote}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[38px] min-w-[110px] px-4 py-2 rounded-lg bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-xs font-semibold text-[#f0f6fc] transition-colors"
          >
            {t.settingsCloseBtn}
          </button>
        </div>
      </div>
    </div>
  );
};

interface ProComingSoonModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
}

export const ProComingSoonModal: React.FC<ProComingSoonModalProps> = ({
  isOpen,
  lang,
  onClose,
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#161b22] border border-[#30363d] rounded-xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-4 border-b border-[#30363d]">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#21262d] border border-[#30363d] text-[10px] font-mono font-semibold text-[#8b949e]">
              <Clock className="w-3 h-3 text-[#58a6ff]" />
              {t.proModalBadge}
            </span>
            <h2 className="text-base font-bold text-[#f0f6fc] pt-1">
              {t.proModalTitle}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close PRO info modal"
            className="min-h-[36px] min-w-[36px] p-1.5 rounded-lg text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-[#c9d1d9] leading-relaxed">
          {t.proModalDesc}
        </p>

        {/* Planned Features */}
        <div className="space-y-2.5">
          <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-3.5 flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-[#58a6ff] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <h3 className="text-xs font-semibold text-[#f0f6fc]">
                {t.proFeature1Title}
              </h3>
              <p className="text-[11px] text-[#8b949e] leading-relaxed">
                {t.proFeature1Desc}
              </p>
            </div>
          </div>

          <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-3.5 flex items-start gap-3">
            <Clock className="w-4 h-4 text-[#58a6ff] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <h3 className="text-xs font-semibold text-[#f0f6fc]">
                {t.proFeature2Title}
              </h3>
              <p className="text-[11px] text-[#8b949e] leading-relaxed">
                {t.proFeature2Desc}
              </p>
            </div>
          </div>

          <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-3.5 flex items-start gap-3">
            <Shield className="w-4 h-4 text-[#58a6ff] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <h3 className="text-xs font-semibold text-[#f0f6fc]">
                {t.proFeature3Title}
              </h3>
              <p className="text-[11px] text-[#8b949e] leading-relaxed">
                {t.proFeature3Desc}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[38px] px-4 py-2 rounded-lg bg-[#1f6feb] hover:bg-[#388bfd] text-xs font-semibold text-white transition-colors"
          >
            {t.proModalCloseBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
