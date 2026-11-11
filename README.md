# ReviewTheGame 🔍🎮

> **Interaktywna platforma do nauki czytania kodu i przeprowadzania profesjonalnego Code Review.**  
> *„LeetCode uczy pisać algorytmy. ReviewTheGame uczy robić Code Review na produkcji.”*

---

## 🚀 O projekcie

Większość kursów i platform programistycznych uczy pisania kodu od podstaw. W komercyjnej pracy programista spędza jednak większość czasu na analizie cudzego kodu, weryfikacji Pull Requestów i wyłapywaniu regresji przed wdrożeniem na produkcję.

**ReviewTheGame** wypełnia tę lukę poprzez stopniową, zgrywalizowaną rozgrywkę:
1. **Faza 1 (Klasyczny widok pliku / IDE):** Krótkie snippety JS/TS z oczywistymi błędami logicznymi, zakresu zmiennych, asynchroniczności czy mutacji danych.
2. **Faza 2 (Widok Git Diff / Pull Request):** Prawdziwe diffy z usuniętymi i dodanymi liniami (np. przypadkowe usunięcie autoryzacji IDOR, podatność SQL Injection).
3. **Tryb PRO (AI Semantic Reviewer):** Gracz może wpisać recenzję własnymi słowami, a model AI ocenia profesjonalizm, ton i trafność techniczną uwagi.

---

## 🛠️ Stack technologiczny

* **Frontend:** React 19, TypeScript, Vite
* **Styling:** Tailwind CSS (GitHub Dark theme)
* **Ikony:** `lucide-react`
* **Persystencja:** `localStorage` (zapisywanie punktów i postępów bez konieczności logowania)

---

## 🏁 Szybki start (Lokalne uruchomienie)

1. Zainstaluj zależności:
   ```bash
   npm install
   ```

2. Uruchom serwer developerski:
   ```bash
   npm run dev
   ```

3. Otwórz w przeglądarce pod adresem: `http://localhost:5173`

---

## 📋 Dokumentacja architektury i wizji produktu

Wszystkie założenia biznesowe, ewolucja poziomów oraz roadmapa technologiczna znajdują się w żywym dokumencie:  
📄 **[`PROJECT_CONTEXT.md`](./PROJECT_CONTEXT.md)**
