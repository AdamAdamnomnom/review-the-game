import React from 'react';
import { Language } from '../types/challenge';
import {
  BookOpen,
  ShieldAlert,
  Crosshair,
  MessageSquareCode,
  Bot,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Zap,
} from 'lucide-react';

interface PlaybookViewProps {
  lang: Language;
  onStartArena: () => void;
}

export const PlaybookView: React.FC<PlaybookViewProps> = ({
  lang,
  onStartArena,
}) => {
  const isPl = lang === 'pl';

  return (
    <div className="max-w-5xl mx-auto space-y-5 pb-10">
      {/* Header Banner */}
      <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-6 sm:p-7">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#21262d] border border-[#30363d] text-[10px] font-mono font-semibold text-[#8b949e]">
              <BookOpen className="w-3 h-3 text-[#58a6ff]" />
              <span>THE CODE REVIEW PLAYBOOK</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#f0f6fc] tracking-tight">
              {isPl
                ? 'Kompendium Inżynierii Code Review i Zasady Gry'
                : 'Code Review Engineering Playbook & Game Rules'}
            </h2>
            <p className="text-xs sm:text-sm text-[#8b949e] max-w-2xl leading-relaxed">
              {isPl
                ? 'Inżynier oprogramowania spędza większość czasu na czytaniu istniejącego kodu, szukaniu regresji i przeglądaniu Pull Requestów. Poznaj zasady skutecznego audytu kodu.'
                : 'Software engineers spend most of their time reading existing code, hunting regressions, and reviewing Pull Requests. Master the rules of production code auditing.'}
            </p>
          </div>

          <button
            onClick={onStartArena}
            className="min-h-[40px] px-4 py-2 rounded-lg bg-[#1f6feb] hover:bg-[#388bfd] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shrink-0"
          >
            <span>{isPl ? 'Przejdź do Areny' : 'Enter Review Arena'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Section 1: Positioning */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 space-y-2.5">
        <div className="flex items-center gap-2 text-[#f0f6fc] font-bold text-sm sm:text-base">
          <AlertTriangle className="w-4 h-4 text-[#58a6ff] shrink-0" />
          <h3>
            {isPl
              ? '1. Dla kogo jest (a dla kogo NIE jest) ReviewTheGame?'
              : '1. Who Is ReviewTheGame Built For?'}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-[#8b949e] leading-relaxed">
          {isPl
            ? 'Ta platforma NIE jest kursem nauki programowania od zera. Nie tłumaczymy tu, czym jest zmienna, instrukcja warunkowa if czy pętla for. Zakładamy, że znasz już podstawową składnię języka, ale chcesz wykształcić nawyki Senior Developera: umiejętność czytania diffów, wyłapywania efektów ubocznych, luk bezpieczeństwa oraz błędów w kodzie generowanym przez AI.'
            : 'This platform is NOT a beginner coding tutorial. We do not explain what a variable, if-statement, or for-loop is. We assume you already know basic syntax and want to build Senior Engineer instincts: reading Git diffs, spotting side effects, security vulnerabilities, and flaws in AI-generated code.'}
        </p>
      </div>

      {/* Section 2 & 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-[#f0f6fc] font-bold text-sm sm:text-base">
            <Crosshair className="w-4 h-4 text-[#58a6ff] shrink-0" />
            <h3>
              {isPl
                ? '2. Mechanika 2-Etapowej Detekcji'
                : '2. Two-Step Detection Mechanics'}
            </h3>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#8b949e]">
            <li className="flex items-start gap-2">
              <span className="font-mono font-bold text-[#f0f6fc] shrink-0">Krok 1:</span>
              <span>
                {isPl
                  ? 'Wskazanie linii (Line Hunt) — widzisz wyłącznie kod. Opcje odpowiedzi są ukryte, dopóki nie klikniesz linii zawierającej błąd. Każde pudło odejmuje -25 XP.'
                  : 'Line Hunt — you only see the code. Answer options remain hidden until you click the actual faulty line. Every wrong line click deducts -25 XP.'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono font-bold text-[#f0f6fc] shrink-0">Krok 2:</span>
              <span>
                {isPl
                  ? 'Diagnoza Techniczna (ABCD lub Własny komentarz) — po trafieniu linii odblokowujesz 4 warianty diagnozy. Zły wybór odejmuje -30 XP. Bezbłędny strzał w 1. próbie daje bonus +30 XP.'
                  : 'Technical Diagnosis (ABCD or Custom Comment) — once the faulty line is locked, 4 diagnostic options unlock. A wrong choice deducts -30 XP. A flawless first-try hit grants +30 XP.'}
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-[#f0f6fc] font-bold text-sm sm:text-base">
            <MessageSquareCode className="w-4 h-4 text-[#58a6ff] shrink-0" />
            <h3>
              {isPl
                ? '3. Etykieta Komunikacji w Pull Requestach'
                : '3. Senior Pull Request Etiquette'}
            </h3>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-[#8b949e]">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#3fb950] shrink-0 mt-0.5" />
              <span>
                {isPl
                  ? 'Krytykuj kod, nigdy autora: Zamiast „Zepsułeś zapytanie”, pisz „To zapytanie jest podatne na SQL Injection przy znaku apostrofu”.'
                  : 'Critique the code, never the author: Instead of "You broke the query", write "This query is vulnerable to SQL Injection when quotes are passed".'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#3fb950] shrink-0 mt-0.5" />
              <span>
                {isPl
                  ? 'Zawsze podawaj kontekst produkcyjny (Dlaczego to ważne?) oraz propozycję poprawki (Jak to naprawić?).'
                  : 'Always explain the production impact (Why it matters) and suggest a concrete fix.'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#3fb950] shrink-0 mt-0.5" />
              <span>
                {isPl
                  ? 'Oznaczaj wagę uwag: [blocking] dla błędów bezpieczeństwa i logiki, [nit] dla drobnych uwag stylistycznych.'
                  : 'Label severity clearly: [blocking] for security/logic bugs, [nit] for minor style preferences.'}
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Section 4: OWASP, Concurrency & AI Audit Checklist */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-2 text-[#f0f6fc] font-bold text-sm sm:text-base">
          <ShieldAlert className="w-4 h-4 text-[#58a6ff] shrink-0" />
          <h3>
            {isPl
              ? '4. Checklista Seniora: OWASP, Współbieżność i Audyt Kodu AI'
              : '4. Senior Checklist: OWASP, Concurrency & AI Code Audit'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-4 space-y-1.5">
            <div className="font-bold text-[#f0f6fc] flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-[#f85149]" />
              <span>Security (OWASP Top 10)</span>
            </div>
            <p className="text-[#8b949e] leading-relaxed">
              {isPl
                ? 'Sprawdzaj czy endpoint weryfikuje właściciela zasobu (IDOR/BOLA), czy zapytania SQL używają parametrów ($1) zamiast sklejania stringów, oraz czy dane wejściowe są walidowane.'
                : 'Verify object-level authorization (IDOR/BOLA), ensure SQL queries use bound parameters ($1) instead of string concatenation, and validate untrusted inputs.'}
            </p>
          </div>

          <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-4 space-y-1.5">
            <div className="font-bold text-[#f0f6fc] flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#58a6ff]" />
              <span>Async & State Integrity</span>
            </div>
            <p className="text-[#8b949e] leading-relaxed">
              {isPl
                ? 'Szukaj zgubionych słów kluczowych await (Floating Promises), mutacji tablic w miejscu (.sort(), .reverse(), .splice()) oraz braku transakcji przy operacjach finansowych (Race Conditions).'
                : 'Hunt down missing awaits (Floating Promises), in-place array mutations (.sort(), .reverse(), .splice()), and non-atomic financial updates (Race Conditions).'}
            </p>
          </div>

          <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-4 space-y-1.5">
            <div className="font-bold text-[#f0f6fc] flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-[#58a6ff]" />
              <span>Auditing AI Code</span>
            </div>
            <p className="text-[#8b949e] leading-relaxed">
              {isPl
                ? 'Kod z generatorów AI często przechodzi testy Happy Path, ale pomija obsługę błędów brzegowych, bezpieczeństwo i wyścigi wielowątkowe (TOCTOU). Nigdy nie merguj kodu AI bez audytu.'
                : 'AI-generated code often passes happy-path unit tests while omitting edge-case error handling, authorization checks, and concurrency locks (TOCTOU). Never merge AI code blindly.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
