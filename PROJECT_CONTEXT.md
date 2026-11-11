# ReviewTheGame — Living Project Context & Architecture Record

> **Status projektu:** MVP w fazie budowy  
> **Właściciel / Product Manager:** Adam  
> **Główny Inżynier / Wykonawca:** Antigravity AI  
> **Ostatnia aktualizacja:** 2026-11-11  

---

## 1. Wizja i Cel Produktu (The Pitch)

* **Problem rynkowy:** 95% platform edukacyjnych (LeetCode, Codewars, kursy wideo) uczy wyłącznie *pisania* kodu od zera. W rzeczywistości inżynier oprogramowania 70% czasu spędza na *czytaniu cudzego kodu*, szukaniu regresji i robieniu **Code Review** na GitHubie.
* **Rozwiązanie:** **ReviewTheGame** — grywalna, wciągająca platforma webowa ucząca sztuki Code Review, czytania diffów i myślenia jak Senior Developer.
* **Hook marketingowy:** *„LeetCode uczy pisać algorytmy. ReviewTheGame uczy robić Code Review na produkcji.”*

---

## 2. Architektura Poziomów Trudności (Difficulty Tiers)

Gra dzieli wyzwania na trzy wyraźne kategorie do wyboru przez użytkownika (zamiast jednej płaskiej listy):

1. 🟢 **Początkujący (Junior / „Szkolne Podstawy”):**
   * **Widok:** Czysty plik (IDE view), 10–20 linii kodu.
   * **Błędy:** Podstawy składni i pułapki języka (zasięg zmiennych `var`/`let`, luźne porównania `==`, zapomniany `return`, błędy typów, brak `await`).
   * **Cel:** Szybkie, bezstresowe wejście w mechanikę gry.

2. 🟡 **Średniozaawansowany (Mid / „Git Pull Request”):**
   * **Widok:** Git Diff (czerwone usunięte linie, zielone dodane) w stylu GitHuba.
   * **Błędy:** Regresje wprowadzane podczas refaktoringu, cicha mutacja danych w pamięci, brakujące walidacje brzegowe w endpointach, brak obsługi wyjątków w asynchroniczności.
   * **Cel:** Praktyka czytania rzeczywistych zmian w zespołach deweloperskich.

3. 🔴 **Zaawansowany (Senior / „Ciężkie Problemy Produkcyjne”):**
   * **Widok:** Złożone diffy oraz PR wieloplikowe.
   * **Błędy:** Trudne luki bezpieczeństwa (SQLi, IDOR, SSRF, wycieki tokenów JWT), race conditions, deadlocki, wycieki pamięci/połączeń z bazą danych pod dużym obciążeniem.
   * **Cel:** Przygotowanie do rozmów kwalifikacyjnych na poziom Mid/Senior i realne myślenie architektoniczne.

---

## 3. Wytyczne do Redesignu UI / UX (Priorytet Produktowy)

Obecny interfejs MVP jest surowy. W kolejnej iteracji zaplanowano pełny redesign:
* **Ekran wyboru poziomu (Hub / Level Select):** Trzy główne kafelki (Junior, Mid, Senior) z wskaźnikami postępu i gwiazdkami.
* **Nowoczesny edytor kodu:** Dopracowana typografia (lepsze fonty monospace, syntax highlighting dopasowany do motywu Tokyo Night / GitHub Dark), płynne animacje wyboru linii i dodawania komentarza.
* **Poczucie gry (Gamification):** Płynne przejścia (Framer Motion), pasek doświadczenia (XP), odznaki za bezbłędne recenzje (np. *Clean Coder*, *Security Hawk*).

---

## 4. Mechanika Rozgrywki (2-Etapowa Detekcja)

Aby wyeliminować bezmyślne zgadywanie i wymusić realną analizę:
1. **Krok 1: Polowanie na linię (Line Hunt):**
   * Gracz widzi kod. Warianty odpowiedzi są **ukryte**.
   * Gracz musi kliknąć podejrzaną linię.
   * Każde błędne kliknięcie linii odejmuje punkty (**ujemne punkty, np. -25 pkt**), co blokuje bezmyślny spam.
2. **Krok 2: Precyzyjna Diagnoza (Diagnostic ABCD):**
   * Dopiero po kliknięciu właściwej linii odsłaniają się **4 konkretne zarzuty techniczne (A, B, C, D)** przygotowane dla tego wyzwania.
   * Wybór złej odpowiedzi również karany jest ujemnymi punktami.
   * Wybór poprawnej odpowiedzi otwiera modal z pełnym wyjaśnieniem Seniora i przyznaje pozostałe punkty.

---

## 5. Profil Użytkownika i The Code Review Playbook

* **Pozycjonowanie (Dla kogo NIE jest ta gra):**
  * Aplikacja **nie jest** kursem nauki programowania od zera.
  * Nie tłumaczy, czym jest zmienna czy pętla `for`. Użytkownik musi już znać podstawy składni.
  * Uczymy **inżynierii czytania kodu, wyłapywania regresji i myślenia architektonicznego**.
* **The Code Review Playbook (Zasady Gry w Review):**
  * Wbudowana zakładka/kompendium: jak robić profesjonalne review, etykieta komunikacji (brak agresji, sugerowanie rozwiązań), checklista bezpieczeństwa (OWASP) i wydajności.
  * Szybki tutorial wprowadzający przed pierwszym poziomem.

---

## 6. Wielojęzyczność (i18n: PL / EN)

* Rynek docelowy to globalna społeczność deweloperów.
* Przełącznik języka (PL / EN) w nagłówku:
  * Cały interfejs, teksty zadań oraz wyjaśnienia Seniora dostępne w obu językach.
  * Otwiera to drogę do monetyzacji B2C na rynku globalnym (subskrypcje w $).

---

## 7. Model Utrzymania Użytkownika (Retention: Dlaczego ludzie zapłacą 5$/mc?)

Statyczne quizy szybko się nudzą. Model subskrypcyjny opiera się na 4 filarach:
1. **Daily Incident (Gorące awarie ze świata IT):**
   * Co kilka dni nowe wyzwanie inspirowane głośną awarią w branży (np. awaria Cloudflare, luka w CrowdStrike, bug w Stripe).
2. **Personal AI Mentor & Skill Radar (PRO):**
   * AI buduje profil Twoich nawyków (np. *"W 65% przypadków pomijasz race condition w asynchroniczności"*).
   * Generuje spersonalizowane ćwiczenia pod Twoje luki w wiedzy.
3. **Weekly Arena (Cotygodniowe zawody na czas):**
   * W każdy weekend 3 nowe Pull Requesty. Gracze rywalizują na czas o wejście na globalną tablicę liderów.
4. **Verified Reviewer Badge (Wartość do CV i LinkedIn):**
   * Certyfikat poświadczający umiejętność audytu kodu – realna wartość przy poszukiwaniu pracy.

---

## 8. UGC i Pętla Wirusowa (Challenge a Friend & Community Arena)

Funkcja generująca darmowy ruch organiczny i nieskończoną bazę zadań:

1. 🔗 **Prywatne wyzwanie („Challenge a Friend” - Viral Loop):**
   * Użytkownik wkleja własny kod (lub buga ze swojej pracy), zaznacza linię błędu i generuje unikalny link (zakodowany w URL lub bazie).
   * Wysyła link na Slacka/Discorda znajomemu: *„Rozwiąż to w 30 sekund, jeśli potrafisz”*.
   * Znajomy rozwiązuje wyzwanie bez logowania i widzi opcję: *„Zrewanżuj się – stwórz własne wyzwanie”*.
   * **Brak potrzeby moderacji:** Linki prywatne między znajomymi nie wymagają zgody administratora.

2. 🏛️ **Community Arena (Publiczna baza społeczności):**
   * Użytkownicy mogą zgłaszać swoje wyzwania do puli ogólnej gry.
   * **Kolejka moderacji (Admin Approval):** Zadanie trafia do panelu admina (lub jest wstępnie weryfikowane przez AI pod kątem poprawności i braku wulgaryzmów/danych poufnych).
   * Po akceptacji trafia na listę publiczną z podpisem autora (*„Wyzwanie stworzone przez: @JanKowalski”*).

---

## 9. Bezpieczeństwo Prawne, Podatki i Zgodność (Legal & Compliance)

Aby projekt działał w 100% legalnie, bezpiecznie i bez ryzyka podatkowego:

1. **Globalne Podatki i VAT (Model Merchant of Record - MoR):**
   * Zamiast tradycyjnego Stripe (który wymagałby samodzielnej rejestracji VAT OSS w każdym kraju UE i rozliczania podatków w USA/Azji), wdrożymy **LemonSqueezy** lub **Paddle**.
   * MoR jest prawnym odsprzedawcą licencji: automatycznie pobiera i odprowadza właściwe stawki VAT w zależności od kraju kupującego oraz wystawia faktury. Wypłata dla Ciebie to czysta transakcja B2B.
2. **RODO / GDPR i Polityka Cookies (Dyrektywa ePrivacy):**
   * *Faza Beta:* Używamy wyłącznie `localStorage` na niezbędne dane funkcjonalne (stan gry). Nie wymaga to uciążliwych banerów śledzących.
   * *Faza Produkcyjna:* W momencie podłączenia analityki (np. PostHog) lub skryptów płatności, dodamy lekki, estetyczny banner zgodny z RODO pozwalający na jednoznaczny wybór użytkownika.
3. **Dokumenty Prawne (ToS & Privacy Policy):**
   * W stopce pojawią się: Regulamin Serwisu (Terms of Service) i Polityka Prywatności określające zasady kont, brak odpowiedzialności za kod pisany przez użytkowników oraz prawa autorskie.

---

## 10. Specjalna Ścieżka: „Auditing AI Code” (Vibe Coding Traps)

W erze Cursor, Copilot i ChatGPT ogromna rzesza tzw. *vibe coderów* produkuje kod, którego do końca nie rozumie ani nie audytuje:
* **Dedykowany moduł zadań:** *„AI Hallucination & Code Buster”*.
* **Typy błędów AI:** Zmyślone flagi bibliotek, fałszywe poczucie bezpieczeństwa (AI często generuje kod bez sanityzacji), ciche wycieki pamięci i fałszywie poprawna składnia, która zawodzi w runtime.
* **Wartość rynkowa:** Umiejętność weryfikacji i audytu kodu wygenerowanego przez AI to jedna z najbardziej pożądanych kompetencji inżynierskich najbliższych lat.

---

## 11. Etyka Monetyzacji i Filozofia „User-Friendly Developer”

Projekt odrzuca agresywny model „wyzyskiwacza pieniędzy” (chamskie paywalle i śmietnik z wyskakującymi reklamami):
* **Brak wyskakujących pop-upów i natrętnych bannerów:** Doświadczenie z nauki kodu musi być czyste, estetyczne i skupione.
* **Subtelny sponsoring zamiast reklam display:** W przyszłości ewentualne poziomy tematyczne sponsorowane przez firmy technologiczne (np. *„Wyzwanie bezpieczeństwa we współpracy z narzędziem X”*).
* **Bogaty darmowy rdzeń:** Podstawowa rozgrywka zawsze pozostaje wartościowa i darmowa. PRO oferuje realną wartość dodaną (analiza AI, zaawansowane statystyki, certyfikaty), a nie sztuczne blokady.

---

## 12. Ocena Jakości Zadań przez Graczy (Relevance Feedback)

Po rozwiązaniu zadania użytkownik ocenia wartość edukacyjną wyzwania:
* Pytanie: *„Czy to wyzwanie było reprezentatywne i odpowiednie na ten poziom?”* (np. 👍 *„Świetny życiowy przypadek”* / 👎 *„Zbyt syntetyczne / sztuczne”*).
* Pozwala to algorytmicznie promować najlepsze wyzwania i korygować te, które społeczność uzna za nienaturalne.

---

## 13. Responsywność i Mobile-First UX

Gra musi działać bezbłędnie na każdym urządzeniu (telefon, tablet, laptop, duży monitor):
* **Mobilny edytor kodu:** Horyzontalny scroll wewnątrz kontenera kodu, bez rozjeżdżania się strony na telefonach.
* **Wygodne strefy dotyku (Touch Targets):** Numery linii i elementy kodu zoptymalizowane pod precyzyjne klikanie palcem na smartfonie.

---

## 14. Stack Technologiczny i Persystencja

* **Frontend:** React 19, TypeScript, Vite.
* **Styling:** Tailwind CSS (Dark theme à la GitHub Dark / VS Code), Framer Motion, canvas-confetti.
* **Ikony:** `lucide-react`.
* **Faza Beta / Faza 1:** Stan zapisywany w `localStorage` przeglądarki (użytkownik **nie traci** postępu po odświeżeniu strony czy zamknięciu przeglądarki; traci go tylko po wyczyszczeniu ciasteczek lub zmianie urządzenia).
* **Faza 3:** Pełna baza Supabase (konta, synchronizacja telefonu z PC, trwały profil w chmurze).

---

## 16. Rejestr Uwag i Poprawek UX/UI (Sprint: Eliminacja AI-Slop & Stabilizacja)

Uwagi zgłoszone przez Product Managera do wdrożenia w kolejnym sprincie (BEZ ZMIAN KODU w obecnej turze):

1. 🐛 **Formatowanie i ucinanie tła w edytorze kodu:**
   * Przy przewijaniu horyzontalnym (`overflow-x-auto`) tło podświetlenia linii i paska diff ucina się w połowie tekstu.
   * *Rozwiązanie:* Dodanie `min-w-full inline-block` do kontenera wierszy kodu, aby kolor tła pokrywał 100% szerokości przewijania (`scrollWidth`).

2. 🎨 **Eliminacja „AI Slopu” i pstrokacizny wizualnej:**
   * Zbyt wiele przypadkowych kolorów, gradientów i ikonek sprawia wrażenie generycznego szablonu AI.
   * *Rozwiązanie:* Przejście na surowy, elegancki, profesjonalny styl narzędzi inżynierskich (Linear / GitHub Dark). Spójna, stonowana paleta (grafit `#0d1117`, szarość `#161b22`, obramowania `#30363d`), tylko jeden dyskretny kolor akcentu (np. błękit `#58a6ff` dla focusu, zielony `#238636` wyłącznie dla sukcesu).

3. 🔢 **Czytelny feedback punktacji na bieżąco:**
   * Gracz nie widzi dokładnie, ile punktów zostało mu odjęte przy błędzie oraz ile dokładnie zdobył po sukcesie.
   * *Rozwiązanie:* Pływający wskaźnik utraty (`-25 XP` / `-30 XP` z animacją fade-up) oraz jasny rozbity komunikat w modalu Seniora: *Punkty bazowe + Bonus za bezbłędność (Flawless) - Użyte podpowiedzi*.

4. 🚫 **Przycisk PRO w nagłówku:**
   * Obecnie udaje włącznik funkcji.
   * *Rozwiązanie:* Powinien być czytelnym badge'em, który po kliknięciu wyświetla profesjonalny modal informacyjny: *„Moduł PRO AI w przygotowaniu (Q1 2027) — powiadomimy Cię o starcie”*.

5. ✏️ **Uproszczenie nazwy „Hardcore PRO”:**
   * Zmiana pretensjonalnej nazwy na prostą i naturalną: **„Wpisz własny komentarz”** (lub *„Własna diagnoza”*).

6. ⚓ **Eliminacja Layout Shift (skakania elementów przy zmianie języka):**
   * Zmiana języka PL <-> EN powoduje zmianę długości tekstów, co przesuwa przyciski i rozpycha flexboxy.
   * *Rozwiązanie:* Zablokowanie kluczowych kontenerów (`min-w-[...]`, `tabular-nums`, grid zamiast płynnego flexa) i przeniesienie wyboru języka do stabilnego panelu Ustawień.

7. ⚙️ **Panel Ustawień (Niezależny wybór języka UI vs Komentarzy w kodzie):**
   * Ikona zębatki w nagłówku otwierająca stabilny modal Ustawień (Settings), co całkowicie eliminuje skakanie przycisków w głównym widoku.
   * **Dwa w 100% niezależne przełączniki językowe:**
     1. **Język interfejsu i Seniora (UI Language):** `Polski (PL)` lub `English (EN)` — steruje wszystkimi przyciskami, nagłówkami, treścią pytań i mową Seniora w podsumowaniu.
     2. **Język komentarzy w kodzie (Code Comments Language):** `English (EN)` lub `Polski (PL)` — steruje wyłącznie liniami komentarzy `// ...` wewnątrz wyświetlanego fragmentu kodu.
   * **Stała zasada kodu:** Nazwy zmiennych, funkcji, klas i słowa kluczowe języka są **zawsze po angielsku** (np. `const userList = ...`), niezależnie od wybranych opcji.
   * **Domyślna konfiguracja dla Polski:** Interfejs = PL, Komentarze w kodzie = EN (odzwierciedlenie realnej pracy w software house'ach).

8. ⚖️ **Balans opcji ABCD (Koniec z pułapką „najdłuższa odpowiedź”):**
   * Gracz zauważa schemat, że najdłuższa odpowiedź to zazwyczaj ta poprawna.
   * *Rozwiązanie:* Wyrównanie objętości tekstu wszystkich 4 opcji ABCD, tak by dystraktory (błędne odpowiedzi) były równie rozbudowane, techniczne i wiarygodne jak opcja poprawna.

9. 🔤 **Wyłączenie ligatur fontu (Font Ligatures Disabled):**
   * W fontach programistycznych takich jak JetBrains Mono symbole `==`, `===` czy `=>` łączą się automatycznie w jeden znak (ligaturę), co myli graczy przy szukaniu błędów składniowych.
   * *Rozwiązanie:* Wyłączenie ligatur w CSS (`font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0;`). Znaki `==`, `===`, `=>` wyświetlają się jako wyraźne, oddzielne litery.

10. 📱 **Ergonomia wyświetlania kodu na wąskich ekranach:**
   * Przewijanie horyzontalne długich linii może być uciążliwe na telefonach.
   * *Plan na przyszłość:* Dodanie opcji przełączania zawijania wierszy (Word Wrap / `whitespace-pre-wrap`) lub skracanie linii w wyzwaniach początkujących do max 60-70 znaków.

---

## 17. Roadmapa Technologiczna

- [x] Inicjalizacja projektu, silnik rozgrywki i prototyp MVP (Faza 0)
- [x] Podstawowe wyzwania JS/TS (IDE View & Git Diff) + moduł AI PRO (Faza 1)
- [x] **Redesign UI, Pasek BETA, 2-etapowa mechanika (Line -> ABCD z ujemnymi punktami) + Mobile UX** (Faza 2)
- [x] Ekran wyboru trudności (Junior / Mid / Senior) + Playbook Code Review (Faza 3)
- [x] Ścieżka specjalna: **Auditing AI Code / Vibe Coding Traps** (Faza 4)
- [x] Wielojęzyczność (PL / EN) — interfejs, wyzwania, diagnozy i Playbook (Faza 5a)
- [x] **Sprint Poprawek UX/UI: Eliminacja AI-Slop, Panel Ustawień, Fix scrolla kodu, Balans ABCD** (Faza 5b - Wdrożono)
- [ ] Dodatkowe ścieżki językowe: Python i C# (.NET) (Faza 5c)
- [ ] Backend i bazy danych (Supabase: konta, rankingi, oceny zadań przez graczy) (Faza 6)
- [ ] Legal & Payments: LemonSqueezy/Paddle (VAT MoR, RODO/Cookies, ToS) (Faza 7)
- [ ] **Kreator Wyzwań („Challenge a Friend”) + Kolejka Moderacji Społeczności** (Faza 8)
