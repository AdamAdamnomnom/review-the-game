import React, { useState, useEffect } from 'react';
import { Challenge, Language, AiEvaluation } from '../types/challenge';
import {
  MessageSquareCode,
  Star,
  CheckCircle,
  AlertTriangle,
  X,
  Send,
} from 'lucide-react';

export function evaluateReviewComment(
  challenge: Challenge,
  commentText: string,
  lang: Language
): AiEvaluation {
  const lower = commentText.toLowerCase();
  const isPl = lang === 'pl';

  const matchedCauses = challenge.aiKeywords.cause.filter((kw) =>
    lower.includes(kw.toLowerCase())
  );
  const matchedFixes = challenge.aiKeywords.fix.filter((kw) =>
    lower.includes(kw.toLowerCase())
  );

  const strengths: string[] = [];
  const missedPoints: string[] = [];

  if (matchedCauses.length > 0) {
    strengths.push(
      isPl
        ? `Trafnie zdiagnozowano przyczynę błędu (${matchedCauses.slice(0, 2).join(', ')})`
        : `Accurately identified the root cause (${matchedCauses.slice(0, 2).join(', ')})`
    );
  } else {
    missedPoints.push(
      isPl
        ? 'Warto precyzyjniej nazwać techniczną przyczynę błędu'
        : 'Could state the exact technical root cause more explicitly'
    );
  }

  if (matchedFixes.length > 0) {
    strengths.push(
      isPl
        ? `Zaproponowano konkretny sposób naprawy (${matchedFixes.slice(0, 2).join(', ')})`
        : `Suggested a concrete remediation (${matchedFixes.slice(0, 2).join(', ')})`
    );
  } else {
    missedPoints.push(
      isPl
        ? 'Dobry komentarz PR powinien zawierać konkretną propozycję poprawki kodu'
        : 'A strong PR review comment should propose a concrete code fix'
    );
  }

  const hasAnyMatch = matchedCauses.length > 0 || matchedFixes.length > 0;

  if (!hasAnyMatch) {
    return {
      rating: 1,
      feedback: isPl
        ? 'Komentarz jest zbyt ogólny — nie wskazuje technicznej przyczyny błędu w tej linii ani konkretnego sposobu naprawy.'
        : 'The comment is too vague — it neither identifies the technical root cause on this line nor proposes a concrete fix.',
      strengths: [],
      missedPoints,
      bonusPoints: 0,
    };
  }

  let rating = 2;
  if (matchedCauses.length > 0) rating += 1;
  if (matchedFixes.length > 0) rating += 1;

  if (commentText.trim().length >= 45) {
    rating += 1;
    strengths.push(
      isPl
        ? 'Wyczerpujący, profesjonalny styl komunikacji inżynierskiej'
        : 'Clear, constructive engineering communication style'
    );
  }

  rating = Math.min(5, Math.max(3, rating));
  const bonusPoints = rating === 5 ? 50 : rating === 4 ? 35 : 20;

  const feedback =
    rating >= 4
      ? isPl
        ? 'Świetny komentarz! Rzeczowy, konstruktywny i trafiający w sedno problemu produkcyjnego. Senior zaakceptowałby taką recenzję bez zastrzeżeń.'
        : 'Excellent review comment! Constructive, technically accurate, and focused on production impact. A Senior engineer would approve this immediately.'
      : isPl
      ? 'Dobry kierunek! Wskazałeś istotny element problemu, ale pamiętaj, aby w Code Review zawsze połączyć przyczynę błędu z konkretną propozycją poprawki.'
      : 'Good direction! You identified a key part of the issue; remember to always pair the root cause with a concrete code fix in your review.';

  return {
    rating,
    feedback,
    strengths,
    missedPoints:
      missedPoints.length > 0
        ? missedPoints
        : [
            isPl
              ? 'Brak zastrzeżeń — kompletna diagnoza!'
              : 'No missed points — complete diagnosis!',
          ],
    bonusPoints,
  };
}

interface AiReviewModalProps {
  challenge: Challenge;
  lang: Language;
  isOpen: boolean;
  alreadyClaimedBonus?: boolean;
  onClose: () => void;
  onAwardBonus?: (points: number, commentText: string) => void;
  onEvaluateComment?: (commentText: string) => void;
}

export const AiReviewModal: React.FC<AiReviewModalProps> = ({
  challenge,
  lang,
  isOpen,
  alreadyClaimedBonus = false,
  onClose,
  onAwardBonus,
  onEvaluateComment,
}) => {
  const [commentText, setCommentText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [evaluation, setEvaluation] = useState<AiEvaluation | null>(null);
  const [bonusClaimed, setBonusClaimed] = useState(alreadyClaimedBonus);

  // Reset input & evaluation ONLY when switching challenges
  useEffect(() => {
    setCommentText('');
    setEvaluation(null);
  }, [challenge.id]);

  // Sync claimed status without wiping active evaluation result
  useEffect(() => {
    setBonusClaimed(alreadyClaimedBonus);
  }, [challenge.id, alreadyClaimedBonus]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isPl = lang === 'pl';

  const handleEvaluate = () => {
    if (!commentText.trim()) return;
    setIsAnalyzing(true);

    setTimeout(() => {
      const result = evaluateReviewComment(challenge, commentText, lang);
      setEvaluation(result);
      setIsAnalyzing(false);
      if (onEvaluateComment) {
        onEvaluateComment(commentText);
      }
      if (result.bonusPoints > 0 && !bonusClaimed && !alreadyClaimedBonus && onAwardBonus) {
        setBonusClaimed(true);
        onAwardBonus(result.bonusPoints, commentText);
      }
    }, 250);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#161b22] border border-[#30363d] rounded-xl max-w-xl w-full p-5 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#30363d]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#21262d] border border-[#30363d] rounded-lg text-[#58a6ff]">
              <MessageSquareCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#f0f6fc]">
                {isPl ? 'Wpisz własny komentarz Code Review' : 'Write Custom Code Review Comment'}
              </h3>
              <p className="text-xs text-[#8b949e]">
                {isPl
                  ? 'Sformułuj recenzję Pull Requesta własnymi słowami i odbierz dodatkowe XP.'
                  : 'Write a Pull Request review comment in your own words to earn bonus XP.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="min-h-[36px] min-w-[36px] p-1.5 rounded-lg text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Text Input */}
        <div>
          <label className="text-xs text-[#c9d1d9] font-medium block mb-1.5">
            {isPl
              ? 'Twój komentarz dla autora kodu:'
              : 'Your review comment to the PR author:'}
          </label>
          <textarea
            rows={4}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder={
              isPl
                ? 'np. W tej linii występuje problem z... Proponuję zastąpić to przez...'
                : 'e.g. This line introduces an issue with... I suggest replacing it with...'
            }
            className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded-lg p-3 text-xs sm:text-sm text-[#f0f6fc] placeholder-[#484f58] outline-none font-mono"
          />
        </div>

        {/* Submit Action */}
        <button
          onClick={handleEvaluate}
          disabled={!commentText.trim() || isAnalyzing}
          className="w-full min-h-[40px] py-2 px-4 rounded-lg bg-[#1f6feb] hover:bg-[#388bfd] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? (
            <span>
              {isPl ? 'Sprawdzanie komentarza...' : 'Evaluating comment...'}
            </span>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>{isPl ? 'Sprawdź mój komentarz' : 'Evaluate My Comment'}</span>
            </>
          )}
        </button>

        {/* Evaluation Result */}
        {evaluation && (
          <div className="mt-4 p-4 rounded-lg bg-[#0d1117] border border-[#30363d] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#8b949e] font-semibold">
                {isPl ? 'Ocena komentarza:' : 'Comment Rating:'}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono tabular-nums font-bold text-[#3fb950]">
                  +{evaluation.bonusPoints} XP
                </span>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3.5 h-3.5 ${
                        s <= evaluation.rating
                          ? 'fill-[#58a6ff] text-[#58a6ff]'
                          : 'text-[#30363d]'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#f0f6fc] leading-relaxed">
              {evaluation.feedback}
            </p>

            <div className="space-y-2 pt-2 border-t border-[#30363d] text-xs">
              {evaluation.strengths.length > 0 && (
                <div>
                  <span className="text-[#3fb950] font-semibold flex items-center gap-1.5 mb-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    {isPl ? 'Mocne strony:' : 'Strengths:'}
                  </span>
                  <ul className="list-disc list-inside text-[#8b949e] space-y-0.5">
                    {evaluation.strengths.map((str, i) => (
                      <li key={i}>{str}</li>
                    ))}
                  </ul>
                </div>
              )}

              {evaluation.missedPoints.length > 0 && (
                <div className="mt-2">
                  <span className="text-[#8b949e] font-semibold flex items-center gap-1.5 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#58a6ff]" />
                    {isPl ? 'Do uzupełnienia:' : 'To Improve:'}
                  </span>
                  <ul className="list-disc list-inside text-[#8b949e] space-y-0.5">
                    {evaluation.missedPoints.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
