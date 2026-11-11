import type { Challenge } from '../types/challenge';

export const CHALLENGES: Challenge[] = [
  // ==========================================
  // TIER 1: JUNIOR (IDE View, Foundations)
  // ==========================================
  {
    id: 'jr-01-var-scope',
    tier: 'junior',
    levelInTier: 1,
    fileName: 'notifyUsers.js',
    language: 'javascript',
    viewMode: 'ide',
    code: `function notifyUsers(userIds) {
  // Dispatch delayed notifications for each user ID in the queue
  for (var i = 0; i < userIds.length; i++) {
    setTimeout(function () {
      console.log("Sending notification to ID:", userIds[i]);
    }, 100);
  }
}

notifyUsers([101, 102, 103]);`,
    codeEn: `function notifyUsers(userIds) {
  // Dispatch delayed notifications for each user ID in the queue
  for (var i = 0; i < userIds.length; i++) {
    setTimeout(function () {
      console.log("Sending notification to ID:", userIds[i]);
    }, 100);
  }
}

notifyUsers([101, 102, 103]);`,
    codePl: `function notifyUsers(userIds) {
  // Wyślij opóźnione powiadomienia dla każdego ID w kolejce
  for (var i = 0; i < userIds.length; i++) {
    setTimeout(function () {
      console.log("Sending notification to ID:", userIds[i]);
    }, 100);
  }
}

notifyUsers([101, 102, 103]);`,
    targetLineNumber: 3,
    acceptableLines: [3, 5],
    category: 'logic',
    points: 100,
    options: [
      {
        id: 'A',
        isCorrect: false,
        text: {
          pl: 'Funkcja `setTimeout` nie przekazuje kontekstu tablicy `userIds` do wnętrza zwykłej funkcji `function ()`, przez co referencja do całej tablicy jest tracona w pamięci.',
          en: 'Calling `setTimeout` with a standard `function ()` callback loses the lexical reference to `userIds`, causing the array binding itself to become uninitialized in memory.',
        },
      },
      {
        id: 'B',
        isCorrect: true,
        text: {
          pl: 'Deklaracja `var i` ma zasięg funkcyjny zamiast blokowego — gdy callbacki `setTimeout` się wykonają, pętla jest już zakończona, a `i` ma wartość `3` (`undefined`).',
          en: 'Declaring `var i` uses function scope instead of block scope — when the `setTimeout` callbacks finally run, the loop has finished and `i` equals `3` (`undefined`).',
        },
      },
      {
        id: 'C',
        isCorrect: false,
        text: {
          pl: 'Warunek graniczny `i < userIds.length` z operatorem post-inkrementacji `i++` powoduje klasyczny błąd off-by-one i wyjście poza zakres indeksów w ostatniej iteracji.',
          en: 'The boundary condition `i < userIds.length` combined with post-increment `i++` causes an off-by-one index overflow during the final synchronous loop iteration.',
        },
      },
      {
        id: 'D',
        isCorrect: false,
        text: {
          pl: 'Przekazanie literału tablicowego `[101, 102, 103]` bez operatora spread `...userIds` sprawia, że parametr `userIds` jest traktowany jako pojedynczy zagnieżdżony obiekt.',
          en: 'Passing the array literal `[101, 102, 103]` without the spread operator `...userIds` causes `userIds` to be evaluated as a single nested object reference at runtime.',
        },
      },
    ],
    aiKeywords: {
      cause: ['var', 'scope', 'zasięg', 'closure', 'domknięci', 'settimeout', 'undefined', 'blokow', 'funkcyjn'],
      fix: ['let', 'const', 'for (let', 'foreach'],
    },
    i18n: {
      pl: {
        title: 'Pułapka asynchronicznej pętli',
        description:
          'Junior napisał funkcję do wysyłania powiadomień z opóźnieniem. Zamiast ID 101, 102, 103 w logach 3 razy pojawia się undefined. Wskaż błędną linię.',
        hints: [
          'Zwróć uwagę na słowo kluczowe użyte do deklaracji zmiennej licznikowej w pętli for.',
          'Przypomnij sobie różnicę między zasięgiem funkcyjnym (var) a blokowym (let) w połączeniu z asynchronicznym setTimeout.',
        ],
        seniorExplanation: {
          summary: 'Użycie słowa kluczowego `var` zamiast `let` w nagłówku pętli `for` z asynchronicznym callbackiem.',
          whyItMatters:
            '`var` ma zasięg całej funkcji, a nie pojedynczego obrotu pętli. Zanim upłynie 100ms i wykona się `setTimeout`, pętla `for` dawno dobiegnie końca, a współdzielona zmienna `i` osiągnie wartość `3` (`userIds.length`). Wszystkie 3 callbacki odczytają `userIds[3]`, czyli `undefined`.',
          howToFix:
            'Zastąp `var i = 0` deklaracją `let i = 0`. Słowo kluczowe `let` ma zasięg blokowy i tworzy osobne wiązanie zmiennej dla każdej iteracji pętli.',
          fixedCodeSnippet: `for (let i = 0; i < userIds.length; i++) {
  setTimeout(() => {
    console.log("Sending notification to ID:", userIds[i]);
  }, 100);
}`,
        },
      },
      en: {
        title: 'The Async Loop Closure Trap',
        description:
          'A junior dev wrote a delayed notification sender. Instead of IDs 101, 102, 103, the logs print undefined three times. Click the faulty line.',
        hints: [
          'Look closely at the keyword used to declare the loop counter variable.',
          'Think about function scope (var) vs block scope (let) when combined with an asynchronous setTimeout callback.',
        ],
        seniorExplanation: {
          summary: 'Using `var` instead of `let` in a `for` loop header containing an asynchronous callback.',
          whyItMatters:
            '`var` is function-scoped rather than block-scoped. By the time the 100ms timer fires, the loop has already finished and the single shared variable `i` equals `3` (`userIds.length`). Every callback reads `userIds[3]`, which is `undefined`.',
          howToFix:
            'Replace `var i = 0` with `let i = 0`. `let` is block-scoped and binds a fresh variable for each loop iteration.',
          fixedCodeSnippet: `for (let i = 0; i < userIds.length; i++) {
  setTimeout(() => {
    console.log("Sending notification to ID:", userIds[i]);
  }, 100);
}`,
        },
      },
    },
  },

  {
    id: 'jr-02-loose-equality',
    tier: 'junior',
    levelInTier: 2,
    fileName: 'validateDiscount.js',
    language: 'javascript',
    viewMode: 'ide',
    code: `function isValidDiscount(discountPercentage) {
  // Discount percentage must be between 0% and 100%
  if (discountPercentage == false) {
    return false;
  }

  return discountPercentage >= 0 && discountPercentage <= 100;
}

console.log(isValidDiscount(0)); // Customer without discount (0%)`,
    codeEn: `function isValidDiscount(discountPercentage) {
  // Discount percentage must be between 0% and 100%
  if (discountPercentage == false) {
    return false;
  }

  return discountPercentage >= 0 && discountPercentage <= 100;
}

console.log(isValidDiscount(0)); // Customer without discount (0%)`,
    codePl: `function isValidDiscount(discountPercentage) {
  // Rabat procentowy musi mieścić się w przedziale od 0% do 100%
  if (discountPercentage == false) {
    return false;
  }

  return discountPercentage >= 0 && discountPercentage <= 100;
}

console.log(isValidDiscount(0)); // Klient bez rabatu (0%)`,
    targetLineNumber: 3,
    acceptableLines: [3],
    category: 'typing',
    points: 120,
    options: [
      {
        id: 'A',
        isCorrect: true,
        text: {
          pl: 'Luźne porównanie `== false` wywołuje niejawną konwersję typów (type coercion), przez co poprawna wartość `0` jest odrzucana (`0 == false` zwraca `true`).',
          en: 'Loose equality `== false` triggers implicit type coercion at runtime, causing the valid numeric input `0` to be rejected (`0 == false` evaluates to `true`).',
        },
      },
      {
        id: 'B',
        isCorrect: false,
        text: {
          pl: 'Operator logiczny `&&` w linii 7 ma niższy priorytet wykonywania niż `return`, co powoduje zwrócenie pierwszej wartości liczbowej zamiast wyniku `boolean`.',
          en: 'The logical `&&` operator on line 7 has lower operator precedence than `return`, short-circuiting and returning the raw number instead of a `boolean`.',
        },
      },
      {
        id: 'C',
        isCorrect: false,
        text: {
          pl: 'Porównywanie operatorami `>= 0` oraz `<= 100` bez uprzedniego rzutowania `Number(discountPercentage)` zawsze zwraca `false` dla liczby całkowitej `0`.',
          en: 'Comparing with `>= 0` and `<= 100` without wrapping the parameter in `Number(discountPercentage)` always evaluates to `false` when the integer `0` is passed.',
        },
      },
      {
        id: 'D',
        isCorrect: false,
        text: {
          pl: 'Brak jawnej deklaracji typu zwracanego w nagłówku funkcji sprawia, że silnik JS traktuje `0` jako niezdefiniowany argument `undefined` przy wejściu do funkcji.',
          en: 'Omitting a default parameter initializer in the function signature causes the JS engine to coerce `0` into `undefined` before entering the function body.',
        },
      },
    ],
    aiKeywords: {
      cause: ['==', '===', 'coercion', 'konwersj', '0', 'zero', 'false', 'luźn', 'loose', 'typeof'],
      fix: ['===', 'typeof', 'number', 'isnan'],
    },
    i18n: {
      pl: {
        title: 'Zdradliwe sprawdzanie pustej wartości',
        description:
          'Funkcja waliduje wysokość rabatu w koszyku (od 0% do 100%). Z jakiegoś powodu zamówienia klientów z rabatem 0% są blokowane jako błędne.',
        hints: [
          'Co zwraca wyrażenie `0 == false` w języku JavaScript?',
          'Sprawdź warunek `if` w linii 3 i zastanów się nad różnicą między `==` a sprawdzeniem `typeof`.',
        ],
        seniorExplanation: {
          summary: 'Użycie luźnego operatora porównania `== false`, który odrzuca liczbę `0` przez niejawną konwersję typów.',
          whyItMatters:
            'W JavaScript `0 == false` oraz `"" == false` zwracają `true`. W efekcie w pełni poprawna wartość biznesowa `0` (brak zniżki = 0%) wpada w warunek błędu i blokuje finalizację koszyka.',
          howToFix:
            'Nigdy nie używaj `== false` do walidacji liczb. Sprawdzaj jawnie typ poprzez `typeof discountPercentage !== "number"` oraz `Number.isNaN()`.',
          fixedCodeSnippet: `function isValidDiscount(discountPercentage) {
  if (typeof discountPercentage !== 'number' || Number.isNaN(discountPercentage)) {
    return false;
  }
  return discountPercentage >= 0 && discountPercentage <= 100;
}`,
        },
      },
      en: {
        title: 'Deceptive Falsy Validation',
        description:
          'This function validates cart discounts (from 0% to 100%). However, customers with a 0% discount are being blocked at checkout.',
        hints: [
          'What does `0 == false` evaluate to in JavaScript?',
          'Check the `if` condition on line 3 and consider loose equality vs explicit type checking.',
        ],
        seniorExplanation: {
          summary: 'Using loose equality `== false`, which rejects the number `0` due to implicit type coercion.',
          whyItMatters:
            'In JavaScript, `0 == false` evaluates to `true`. As a result, a valid business value of `0` (0% discount) triggers the guard clause and blocks valid orders.',
          howToFix:
            'Avoid `== false` when validating numeric inputs. Explicitly verify the type with `typeof discountPercentage !== "number"` and `Number.isNaN()`.',
          fixedCodeSnippet: `function isValidDiscount(discountPercentage) {
  if (typeof discountPercentage !== 'number' || Number.isNaN(discountPercentage)) {
    return false;
  }
  return discountPercentage >= 0 && discountPercentage <= 100;
}`,
        },
      },
    },
  },

  {
    id: 'jr-03-missing-return',
    tier: 'junior',
    levelInTier: 3,
    fileName: 'priceCalculator.ts',
    language: 'typescript',
    viewMode: 'ide',
    code: `interface CartItem {
  name: string;
  price: number;
}

// Apply a 20% seasonal discount to each item in the cart
export function getDiscountedPrices(items: CartItem[]): number[] {
  return items.map((item) => {
    item.price * 0.8;
  });
}`,
    codeEn: `interface CartItem {
  name: string;
  price: number;
}

// Apply a 20% seasonal discount to each item in the cart
export function getDiscountedPrices(items: CartItem[]): number[] {
  return items.map((item) => {
    item.price * 0.8;
  });
}`,
    codePl: `interface CartItem {
  name: string;
  price: number;
}

// Naliczenie 20% rabatu sezonowego dla każdego produktu w koszyku
export function getDiscountedPrices(items: CartItem[]): number[] {
  return items.map((item) => {
    item.price * 0.8;
  });
}`,
    targetLineNumber: 9,
    acceptableLines: [8, 9],
    category: 'logic',
    points: 130,
    options: [
      {
        id: 'A',
        isCorrect: false,
        text: {
          pl: 'Metoda `Array.prototype.map()` nie obsługuje bezpośredniego odczytu pól z interfejsów TypeScript bez jawnej destrukturyzacji `({ price }: CartItem)` w argumencie.',
          en: '`Array.prototype.map()` cannot access properties on TypeScript interfaces unless the callback parameter is explicitly destructured as `({ price }: CartItem)`.',
        },
      },
      {
        id: 'B',
        isCorrect: false,
        text: {
          pl: 'Mnożenie pola `item.price` przez ułamek zmiennoprzecinkowy `0.8` powoduje niejawną konwersję wyniku na typ `string` zgodnie ze standardem IEEE-754.',
          en: 'Multiplying `item.price` by the floating-point literal `0.8` triggers an automatic IEEE-754 precision conversion that casts each element into a `string`.',
        },
      },
      {
        id: 'C',
        isCorrect: true,
        text: {
          pl: 'Funkcja strzałkowa wewnątrz `.map()` używa nawiasów klamrowych `{ ... }` bez słowa `return`, przez co dla każdego elementu zwracana jest wartość `undefined`.',
          en: 'The arrow function inside `.map()` uses curly braces `{ ... }` without a `return` statement, causing the callback to return `undefined` for every element.',
        },
      },
      {
        id: 'D',
        isCorrect: false,
        text: {
          pl: 'Brak modyfikatora `export` przed deklaracją `interface CartItem` blokuje dostęp do pola `.price` podczas wywołania eksportowanej funkcji poza tym modułem.',
          en: 'Omitting the `export` modifier on `interface CartItem` prevents the exported function from reading the `.price` property when invoked from external modules.',
        },
      },
    ],
    aiKeywords: {
      cause: ['return', 'klamr', 'braces', 'undefined', 'arrow', 'strzałkow'],
      fix: ['return item.price', '=> item.price * 0.8'],
    },
    i18n: {
      pl: {
        title: 'Ciche undefined w funkcji strzałkowej',
        description:
          'Funkcja ma zwracać tablicę cen po 20% rabacie. Zamiast liczb wyliczenie w koszyku dostaje `[undefined, undefined]` i wyświetla `NaN PLN`.',
        hints: [
          'Spójrz na ciało funkcji strzałkowej przekazanej do `items.map(...)`.',
          'Kiedy funkcja strzałkowa w JS/TS zwraca wartość automatycznie (implicit return), a kiedy wymaga słowa `return`?',
        ],
        seniorExplanation: {
          summary: 'Brak instrukcji `return` wewnątrz blokowego ciała funkcji strzałkowej `{ ... }` w `.map()`.',
          whyItMatters:
            'W JavaScript/TypeScript użycie nawiasów klamrowych `=> { ... }` otwiera blok instrukcji i wyłącza automatyczne zwracanie wyrażenia (implicit return). Bez słowa `return` funkcja dla każdego elementu zwraca `undefined`.',
          howToFix:
            'Dodaj słowo kluczowe `return` przed `item.price * 0.8` albo usuń nawiasy klamrowe: `items.map((item) => item.price * 0.8)`.',
          fixedCodeSnippet: `export function getDiscountedPrices(items: CartItem[]): number[] {
  return items.map((item) => item.price * 0.8);
}`,
        },
      },
      en: {
        title: 'Silent undefined in Arrow Function',
        description:
          'This helper should return an array of prices with a 20% discount applied. Instead, the checkout receives `[undefined, undefined]` and displays `NaN`.',
        hints: [
          'Inspect the body of the arrow function passed to `items.map(...)`.',
          'When does an arrow function return implicitly vs when does it require an explicit `return` keyword?',
        ],
        seniorExplanation: {
          summary: 'Missing `return` statement inside a block-bodied arrow function `{ ... }` in `.map()`.',
          whyItMatters:
            'Wrapping an arrow function body in curly braces `=> { ... }` creates a statement block rather than an implicit return expression. Without an explicit `return`, the callback returns `undefined` for every item.',
          howToFix:
            'Either add `return item.price * 0.8;` inside the braces or use a concise expression body: `items.map((item) => item.price * 0.8)`.',
          fixedCodeSnippet: `export function getDiscountedPrices(items: CartItem[]): number[] {
  return items.map((item) => item.price * 0.8);
}`,
        },
      },
    },
  },

  // ==========================================
  // TIER 2: MID (Git Pull Request / Diffs)
  // ==========================================
  {
    id: 'mid-01-array-mutation',
    tier: 'mid',
    levelInTier: 1,
    fileName: 'dashboardSummary.diff',
    language: 'typescript',
    viewMode: 'git_diff',
    code: `@@ -14,7 +14,8 @@ export function getDashboardSummary(scores: ScoreRecord[]) {
   const chronologicalHistory = scores;
-  const copy = [...scores];
-  copy.sort((a, b) => b.score - a.score);
-  const topThree = copy.slice(0, 3);
+  // Clean one-line refactor for top 3 leaderboard scores
+  const topThree = scores.sort((a, b) => b.score - a.score).slice(0, 3);
   return { topThree, chronologicalHistory };
 }`,
    codeEn: `@@ -14,7 +14,8 @@ export function getDashboardSummary(scores: ScoreRecord[]) {
   const chronologicalHistory = scores;
-  const copy = [...scores];
-  copy.sort((a, b) => b.score - a.score);
-  const topThree = copy.slice(0, 3);
+  // Clean one-line refactor for top 3 leaderboard scores
+  const topThree = scores.sort((a, b) => b.score - a.score).slice(0, 3);
   return { topThree, chronologicalHistory };
 }`,
    codePl: `@@ -14,7 +14,8 @@ export function getDashboardSummary(scores: ScoreRecord[]) {
   const chronologicalHistory = scores;
-  const copy = [...scores];
-  copy.sort((a, b) => b.score - a.score);
-  const topThree = copy.slice(0, 3);
+  // Skrócenie zapisu podczas refaktoryzacji listy top 3 wyników
+  const topThree = scores.sort((a, b) => b.score - a.score).slice(0, 3);
   return { topThree, chronologicalHistory };
 }`,
    targetLineNumber: 7,
    acceptableLines: [3, 7],
    category: 'performance',
    points: 160,
    options: [
      {
        id: 'A',
        isCorrect: true,
        text: {
          pl: 'Usunięcie kopii `[...scores]` sprawia, że `scores.sort()` mutuje tablicę wejściową w miejscu, niszcząc kolejność w `chronologicalHistory` i stanie rodzica.',
          en: 'Removing the shallow copy `[...scores]` causes `scores.sort()` to mutate the input array in-place, corrupting `chronologicalHistory` and parent state.',
        },
      },
      {
        id: 'B',
        isCorrect: false,
        text: {
          pl: 'Łańcuchowe wywołanie `.sort().slice(0, 3)` w jednej instrukcji rzuca wyjątek `RangeError`, gdy tablica wejściowa `scores` zawiera mniej niż trzy elementy.',
          en: 'Chaining `.sort().slice(0, 3)` in a single expression throws an uncaught `RangeError` whenever the input `scores` array contains fewer than three elements.',
        },
      },
      {
        id: 'C',
        isCorrect: false,
        text: {
          pl: 'Funkcja porównująca `(a, b) => b.score - a.score` zwraca wartości ujemne dla większych wyników, co odwraca porządek i wybiera trzy najniższe rezultaty.',
          en: 'The comparator `(a, b) => b.score - a.score` returns negative values for higher scores, inverting the sort order and selecting the three lowest results.',
        },
      },
      {
        id: 'D',
        isCorrect: false,
        text: {
          pl: 'Metoda `.slice(0, 3)` działa identycznie jak `.splice(0, 3)` i trwale wycina pozostałe elementy z tablicy źródłowej przed zwróceniem obiektu z funkcji.',
          en: 'Calling `.slice(0, 3)` behaves like `.splice(0, 3)` and permanently truncates the remaining elements from the source array before the function returns.',
        },
      },
    ],
    aiKeywords: {
      cause: ['mutacj', 'mutat', 'in-place', 'sort', 'oryginal', 'original', 'side effect', 'efekt uboczny', 'chronological'],
      fix: ['[...scores]', 'tosorted', 'slice()', 'kopi', 'copy', 'spread'],
    },
    i18n: {
      pl: {
        title: 'PR #104: Cichy sabotaż wykresu historii',
        description:
          'Programista „oczyścił kod” w Pull Requeście, skracając 3 linie do jednej. Po wdrożeniu na staging wykres chronologiczny na dashboardzie zaczął wyświetlać dane w losowej kolejności.',
        hints: [
          'Porównaj usuniętą linię `- const copy = [...scores];` z nowo dodaną linią 7.',
          'Czy metoda `Array.prototype.sort()` zwraca nową tablicę, czy modyfikuje istniejącą referencję w pamięci?',
        ],
        seniorExplanation: {
          summary: 'Przypadkowa mutacja tablicy wejściowej w miejscu (`in-place`) przez wywołanie `scores.sort()` bez utworzenia płytkiej kopii.',
          whyItMatters:
            'W JavaScript metoda `.sort()` mutuje tablicę, na której została wywołana. Ponieważ `chronologicalHistory` oraz komponent nadrzędny (np. stan w React/Redux) współdzielą tę samą referencję do `scores`, wywołanie `scores.sort()` bezpowrotnie niszczy porządek chronologiczny w całej aplikacji.',
          howToFix:
            'Zawsze kopiuj tablicę przed sortowaniem (`[...scores].sort(...)`) lub użyj nowoczesnej, niemutującej metody `scores.toSorted(...)` (ES2023+).',
          fixedCodeSnippet: `const topThree = [...scores]
  .sort((a, b) => b.score - a.score)
  .slice(0, 3);`,
        },
      },
      en: {
        title: 'PR #104: Silent History Chart Sabotage',
        description:
          'A developer "cleaned up" the code in this Pull Request by collapsing 3 lines into a one-liner. On staging, the chronological history chart suddenly lost its time ordering.',
        hints: [
          'Compare the deleted line `- const copy = [...scores];` with the newly added line 7.',
          'Does `Array.prototype.sort()` create a new array or mutate the existing reference in memory?',
        ],
        seniorExplanation: {
          summary: 'In-place array mutation caused by calling `scores.sort()` directly on the input reference after removing the shallow copy.',
          whyItMatters:
            '`Array.prototype.sort()` mutates the array in-place. Because `chronologicalHistory` and the caller share the same reference to `scores`, sorting it directly corrupts the chronological order across the entire application.',
          howToFix:
            'Clone the array before sorting (`[...scores].sort(...)`) or use the modern non-mutating `scores.toSorted(...)` method.',
          fixedCodeSnippet: `const topThree = [...scores]
  .sort((a, b) => b.score - a.score)
  .slice(0, 3);`,
        },
      },
    },
  },

  {
    id: 'mid-02-missing-await',
    tier: 'mid',
    levelInTier: 2,
    fileName: 'checkoutOrder.diff',
    language: 'typescript',
    viewMode: 'git_diff',
    code: `@@ -21,8 +21,8 @@ export async function checkoutOrder(orderId: string, amount: number) {
   const payload = { id: orderId, amount, status: 'PAID', updatedAt: Date.now() };
 
-  await db.orders.insert(payload);
-  await auditLog.record('ORDER_CREATED', orderId);
+  // Speed up checkout endpoint latency by avoiding sequential wait
+  db.orders.insert(payload);
+  await auditLog.record('ORDER_CREATED', orderId);
 
   return { ok: true, orderId };
 }`,
    codeEn: `@@ -21,8 +21,8 @@ export async function checkoutOrder(orderId: string, amount: number) {
   const payload = { id: orderId, amount, status: 'PAID', updatedAt: Date.now() };
 
-  await db.orders.insert(payload);
-  await auditLog.record('ORDER_CREATED', orderId);
+  // Speed up checkout endpoint latency by avoiding sequential wait
+  db.orders.insert(payload);
+  await auditLog.record('ORDER_CREATED', orderId);
 
   return { ok: true, orderId };
 }`,
    codePl: `@@ -21,8 +21,8 @@ export async function checkoutOrder(orderId: string, amount: number) {
   const payload = { id: orderId, amount, status: 'PAID', updatedAt: Date.now() };
 
-  await db.orders.insert(payload);
-  await auditLog.record('ORDER_CREATED', orderId);
+  // Przyspieszenie odpowiedzi endpointu przez pominięcie sekwencyjnego czekania
+  db.orders.insert(payload);
+  await auditLog.record('ORDER_CREATED', orderId);
 
   return { ok: true, orderId };
 }`,
    targetLineNumber: 7,
    acceptableLines: [4, 7],
    category: 'async',
    points: 180,
    options: [
      {
        id: 'A',
        isCorrect: false,
        text: {
          pl: 'Wywołanie `Date.now()` zwraca surowy znacznik czasu w milisekundach zamiast instancji `new Date()`, przez co sterownik bazy danych odrzuca cały obiekt `payload`.',
          en: 'Calling `Date.now()` returns a raw millisecond timestamp instead of a `new Date()` instance, causing the database driver to reject the entire `payload` object.',
        },
      },
      {
        id: 'B',
        isCorrect: true,
        text: {
          pl: 'Usunięcie `await` przed `db.orders.insert(payload)` uruchamia zapis bez nadzoru — funkcja zwraca `ok: true` nawet wtedy, gdy zapis do bazy rzuci wyjątek.',
          en: 'Removing `await` before `db.orders.insert(payload)` creates an unawaited floating Promise — the function returns `ok: true` even if the database insert fails.',
        },
      },
      {
        id: 'C',
        isCorrect: false,
        text: {
          pl: 'Wywołanie `auditLog.record()` bezpośrednio po operacji na `db.orders` na tym samym wątku powoduje wzajemną blokadę transakcji (deadlock) w puli połączeń.',
          en: 'Invoking `auditLog.record()` immediately after `db.orders` on the same event loop tick causes a connection pool deadlock between the two database clients.',
        },
      },
      {
        id: 'D',
        isCorrect: false,
        text: {
          pl: 'Funkcja oznaczona modyfikatorem `async` wymaga jawnego użycia `Promise.resolve({ ok: true, orderId })` przy zwracaniu wyniku, inaczej klient otrzyma `undefined`.',
          en: 'A function marked with the `async` modifier requires an explicit `Promise.resolve({ ok: true, orderId })` return wrapper, or the caller receives `undefined`.',
        },
      },
    ],
    aiKeywords: {
      cause: ['await', 'promise', 'async', 'fire-and-forget', 'unhandled', 'nieoczekiwan', 'zapis', 'baza'],
      fix: ['await db.orders.insert', 'promise.all'],
    },
    i18n: {
      pl: {
        title: 'PR #219: Znikające zamówienia po „optymalizacji”',
        description:
          'Deweloper chciał przyspieszyć czas odpowiedzi endpointu płatności. Po wdrożeniu część klientów widzi ekran „Zamówienie opłacone”, ale zamówienia nie ma w bazie danych.',
        hints: [
          'Sprawdź różnicę między usuniętą linią 4 a dodaną linią 7 w diffie.',
          'Co się stanie, jeśli `db.orders.insert(payload)` zawiedzie (np. błąd klucza obcego lub chwilowy timeout bazy), gdy nie ma przed nim `await`?',
        ],
        seniorExplanation: {
          summary: 'Usunięcie słowa kluczowego `await` przed krytyczną operacją zapisu do bazy danych (`db.orders.insert`).',
          whyItMatters:
            'Bez `await` obietnica (Promise) zapisu działa w tle bez nadzoru. Klient otrzymuje `{ ok: true }`, a wpis w `auditLog` twierdzi, że zamówienie powstało, zanim baza w ogóle przetworzy zapytanie. W razie błędu bazy powstaje `UnhandledPromiseRejection`, a opłacone zamówienie bezpowrotnie przepada.',
          howToFix:
            'Przywróć `await` przed `db.orders.insert(payload)`. Jeśli obie operacje są niezależne i chcesz je zrównoleglić, użyj `await Promise.all([db.orders.insert(payload), auditLog.record(...)])`.',
          fixedCodeSnippet: `await Promise.all([
  db.orders.insert(payload),
  auditLog.record('ORDER_CREATED', orderId),
]);`,
        },
      },
      en: {
        title: 'PR #219: Vanishing Orders After "Optimization"',
        description:
          'A developer tried to speed up the checkout endpoint response time. In production, some customers see "Order Confirmed", but their order is completely missing from the database.',
        hints: [
          'Compare deleted line 4 with added line 7 in the diff.',
          'What happens if `db.orders.insert(payload)` rejects (e.g. constraint error or DB timeout) when it is not awaited?',
        ],
        seniorExplanation: {
          summary: 'Removing `await` before a critical database write (`db.orders.insert`).',
          whyItMatters:
            'Without `await`, the database insert runs as an unmonitored floating Promise. The caller receives `{ ok: true }` and the audit log records creation before the DB write finishes. If the DB rejects, an `UnhandledPromiseRejection` occurs and the paid order is silently lost.',
          howToFix:
            'Always `await` critical persistence operations, or run independent async operations concurrently with `await Promise.all([...])`.',
          fixedCodeSnippet: `await Promise.all([
  db.orders.insert(payload),
  auditLog.record('ORDER_CREATED', orderId),
]);`,
        },
      },
    },
  },

  {
    id: 'mid-03-unhandled-json-parse',
    tier: 'mid',
    levelInTier: 3,
    fileName: 'userPreferences.diff',
    language: 'typescript',
    viewMode: 'git_diff',
    code: `@@ -8,9 +8,6 @@ export function loadUserPreferences(rawCookie: string): UserPrefs {
-  try {
-    return JSON.parse(rawCookie) as UserPrefs;
-  } catch {
-    return DEFAULT_PREFS;
-  }
+  // Simplify parser: return default preferences if cookie is empty
+  if (!rawCookie) return DEFAULT_PREFS;
+  return JSON.parse(rawCookie) as UserPrefs;
 }`,
    codeEn: `@@ -8,9 +8,6 @@ export function loadUserPreferences(rawCookie: string): UserPrefs {
-  try {
-    return JSON.parse(rawCookie) as UserPrefs;
-  } catch {
-    return DEFAULT_PREFS;
-  }
+  // Simplify parser: return default preferences if cookie is empty
+  if (!rawCookie) return DEFAULT_PREFS;
+  return JSON.parse(rawCookie) as UserPrefs;
 }`,
    codePl: `@@ -8,9 +8,6 @@ export function loadUserPreferences(rawCookie: string): UserPrefs {
-  try {
-    return JSON.parse(rawCookie) as UserPrefs;
-  } catch {
-    return DEFAULT_PREFS;
-  }
+  // Uproszczenie parsera: jeśli brak ciasteczka zwracamy ustawienia domyślne
+  if (!rawCookie) return DEFAULT_PREFS;
+  return JSON.parse(rawCookie) as UserPrefs;
 }`,
    targetLineNumber: 9,
    acceptableLines: [2, 8, 9],
    category: 'logic',
    points: 190,
    options: [
      {
        id: 'A',
        isCorrect: false,
        text: {
          pl: 'Asercja typu `as UserPrefs` wymusza w runtime walidację wszystkich pól obiektu, co przy brakującym kluczu w ciasteczku blokuje główny wątek serwera.',
          en: 'The `as UserPrefs` type assertion enforces strict runtime schema validation, blocking the main server thread whenever an optional cookie property is missing.',
        },
      },
      {
        id: 'B',
        isCorrect: false,
        text: {
          pl: 'Warunek `if (!rawCookie)` nie wykrywa pustego ciągu znaków `""`, ponieważ każdy zadeklarowany parametr typu `string` w TypeScript jest traktowany jako `truthy`.',
          en: 'The guard `if (!rawCookie)` fails to catch an empty string `""` because any initialized `string` parameter in TypeScript evaluates to `truthy` at runtime.',
        },
      },
      {
        id: 'C',
        isCorrect: true,
        text: {
          pl: 'Usunięcie `try / catch` wokół `JSON.parse(rawCookie)` sprawia, że każde uszkodzone ciasteczko rzuci nieobsłużony wyjątek `SyntaxError` i przerwie żądanie SSR.',
          en: 'Removing `try / catch` around `JSON.parse(rawCookie)` causes any malformed cookie payload to throw an uncaught `SyntaxError` and crash the SSR request.',
        },
      },
      {
        id: 'D',
        isCorrect: false,
        text: {
          pl: 'Metoda `JSON.parse()` w środowisku Node.js zwraca obietnicę `Promise<UserPrefs>`, więc brak słowa kluczowego `await` powoduje zwrócenie pustego obiektu.',
          en: '`JSON.parse()` in Node.js returns a `Promise<UserPrefs>` asynchronously, so omitting the `await` keyword causes the function to return an unresolved promise.',
        },
      },
    ],
    aiKeywords: {
      cause: ['try', 'catch', 'json.parse', 'syntaxerror', 'wyjąt', 'exception', 'crash', 'uszkodzon', 'malformed'],
      fix: ['try', 'catch', 'default_prefs'],
    },
    i18n: {
      pl: {
        title: 'PR #312: Jedno zepsute ciasteczko kładzie serwer SSR',
        description:
          'Podczas czyszczenia kodu usunięto blok `try/catch`, zastępując go prostym `if (!rawCookie)`. Dlaczego ta zmiana jest tykającą bombą na produkcji?',
        hints: [
          'Skąd pochodzi wartość `rawCookie`? Czy mamy gwarancję, że niepusty string z przeglądarki użytkownika zawsze jest poprawnym formatem JSON?',
          'Co robi `JSON.parse("{broken")`, gdy nie jest owinięte w `try / catch`?',
        ],
        seniorExplanation: {
          summary: 'Usunięcie obsługi wyjątków `try / catch` przy parsowaniu zewnętrznych danych wejściowych przez `JSON.parse()`.',
          whyItMatters:
            'Dane z ciasteczek (`Cookie`), `localStorage` czy parametrów URL pochodzą od klienta i mogą być obcięte, uszkodzone przez starą wersję aplikacji lub ręcznie zmodyfikowane. `if (!rawCookie)` chroni tylko przed pustym stringiem, ale dla np. `rawCookie = "{corrupted"` wywołanie `JSON.parse` rzuci `SyntaxError` i zwróci błąd `500 Internal Server Error` przy każdym odświeżeniu strony.',
          howToFix:
            'Nigdy nie ufaj zewnętrznemu JSON-owi bez `try / catch` (oraz opcjonalnej walidacji schematu np. przez bibliotekę `Zod`).',
          fixedCodeSnippet: `if (!rawCookie) return DEFAULT_PREFS;
try {
  return JSON.parse(rawCookie) as UserPrefs;
} catch {
  return DEFAULT_PREFS;
}`,
        },
      },
      en: {
        title: 'PR #312: One Corrupted Cookie Crashes SSR',
        description:
          'During a code cleanup, the author replaced a `try/catch` block with a clean `if (!rawCookie)` guard. Why is this a ticking time bomb in production?',
        hints: [
          'Where does `rawCookie` come from? Is a non-empty string from a browser guaranteed to be valid JSON?',
          'What happens when `JSON.parse("{broken")` executes without a `try / catch` block?',
        ],
        seniorExplanation: {
          summary: 'Removing `try / catch` exception handling around `JSON.parse()` on untrusted client input.',
          whyItMatters:
            'Cookies, localStorage values, and query parameters come from the client and can be truncated, outdated, or manually tampered with. `if (!rawCookie)` only checks for an empty string — any malformed payload like `"{corrupted"` will throw an unhandled `SyntaxError` and crash the SSR request with a 500 error.',
          howToFix:
            'Always wrap `JSON.parse` of external data in a `try / catch` block (and ideally validate the parsed object with a schema validator like `Zod`).',
          fixedCodeSnippet: `if (!rawCookie) return DEFAULT_PREFS;
try {
  return JSON.parse(rawCookie) as UserPrefs;
} catch {
  return DEFAULT_PREFS;
}`,
        },
      },
    },
  },

  // ==========================================
  // TIER 3: SENIOR (Production Security, Concurrency & AI Traps)
  // ==========================================
  {
    id: 'sr-01-deleted-auth-idor',
    tier: 'senior',
    levelInTier: 1,
    fileName: 'billingController.diff',
    language: 'typescript',
    viewMode: 'git_diff',
    code: `@@ -12,9 +12,7 @@ app.get('/api/users/:id/billing', async (req, res) => {
   const targetUserId = req.params.id;
-  if (!req.session?.userId || req.session.userId !== targetUserId) {
-    return res.status(403).json({ error: 'Forbidden: Access Denied' });
-  }
+  // Fetch billing profile directly from cache/database by user ID
   const billingProfile = await db.billing.findByUserId(targetUserId);
   if (!billingProfile) {
     return res.status(404).json({ error: 'Not found' });
   }
   return res.json(billingProfile);
 });`,
    codeEn: `@@ -12,9 +12,7 @@ app.get('/api/users/:id/billing', async (req, res) => {
   const targetUserId = req.params.id;
-  if (!req.session?.userId || req.session.userId !== targetUserId) {
-    return res.status(403).json({ error: 'Forbidden: Access Denied' });
-  }
+  // Fetch billing profile directly from cache/database by user ID
   const billingProfile = await db.billing.findByUserId(targetUserId);
   if (!billingProfile) {
     return res.status(404).json({ error: 'Not found' });
   }
   return res.json(billingProfile);
 });`,
    codePl: `@@ -12,9 +12,7 @@ app.get('/api/users/:id/billing', async (req, res) => {
   const targetUserId = req.params.id;
-  if (!req.session?.userId || req.session.userId !== targetUserId) {
-    return res.status(403).json({ error: 'Forbidden: Access Denied' });
-  }
+  // Bezpośrednie pobranie profilu rozliczeniowego z bazy po ID użytkownika
   const billingProfile = await db.billing.findByUserId(targetUserId);
   if (!billingProfile) {
     return res.status(404).json({ error: 'Not found' });
   }
   return res.json(billingProfile);
 });`,
    targetLineNumber: 3,
    acceptableLines: [3, 4, 5, 7],
    category: 'security',
    points: 230,
    options: [
      {
        id: 'A',
        isCorrect: false,
        text: {
          pl: 'Zwracanie statusu `404 Not Found` zamiast `204 No Content` przy braku profilu ujawnia wewnętrzną strukturę tabel w bazie danych (Information Disclosure).',
          en: 'Returning HTTP `404 Not Found` instead of `204 No Content` when a profile is missing leaks internal database table metadata (Information Disclosure).',
        },
      },
      {
        id: 'B',
        isCorrect: true,
        text: {
          pl: 'Podatność IDOR / BOLA (Broken Object Level Authorization): usunięto sprawdzenie, czy zalogowany użytkownik (`req.session.userId`) jest właścicielem `:id`.',
          en: 'IDOR / BOLA vulnerability (Broken Object Level Authorization): removed the check verifying that `req.session.userId` owns the requested `:id` resource.',
        },
      },
      {
        id: 'C',
        isCorrect: false,
        text: {
          pl: 'Przekazanie obiektu `billingProfile` bezpośrednio do `res.json()` bez uprzedniego escapowania HTML otwiera podatność Reflected Cross-Site Scripting (XSS).',
          en: 'Passing `billingProfile` directly into `res.json()` without HTML entity encoding introduces a Reflected Cross-Site Scripting (XSS) vulnerability.',
        },
      },
      {
        id: 'D',
        isCorrect: false,
        text: {
          pl: 'Odczyt parametru `req.params.id` przed wywołaniem `db.billing.findByUserId` blokuje pulę połączeń i umożliwia przeprowadzenie ataku typu Denial of Service.',
          en: 'Reading `req.params.id` synchronously before `db.billing.findByUserId` exhausts the database connection pool and enables a Denial of Service (DoS) attack.',
        },
      },
    ],
    aiKeywords: {
      cause: ['idor', 'bola', 'auth', 'uprawnie', 'session', '403', 'forbidden', 'cudz', 'other user', 'access control'],
      fix: ['req.session', 'userId !== targetUserId', '403', 'autoryzacj', 'authorization'],
    },
    i18n: {
      pl: {
        title: 'PR #408: Wyciek faktur wszystkich klientów (IDOR)',
        description:
          'Pull Request upraszcza endpoint pobierania danych rozliczeniowych i faktur. Zobacz na usunięte linie w diffie i wskaż krytyczną lukę bezpieczeństwa.',
        hints: [
          'Przyjrzyj się usuniętemu warunkowi w liniach 3-5.',
          'Co się stanie, gdy zalogowany użytkownik o ID `100` wyśle żądanie `GET /api/users/101/billing`?',
        ],
        seniorExplanation: {
          summary: 'Usunięcie weryfikacji właściciela zasobu wprowadza krytyczną podatność IDOR / BOLA (OWASP API1:2023).',
          whyItMatters:
            'Podczas refaktoryzacji usunięto sprawdzenie `req.session.userId !== targetUserId`. Od tego momentu dowolny użytkownik może iterować po identyfikatorach `:id` w adresie URL i pobierać faktury, adresy oraz dane kart płatniczych wszystkich innych klientów w systemie.',
          howToFix:
            'Bezwzględnie przywróć weryfikację autoryzacji na poziomie obiektu (Object-Level Authorization) lub pobieraj dane wyłącznie dla `req.session.userId` bez przyjmowania `:id` z URL.',
          fixedCodeSnippet: `if (!req.session?.userId || (req.session.userId !== targetUserId && !req.session.isAdmin)) {
  return res.status(403).json({ error: 'Forbidden: Access Denied' });
}`,
        },
      },
      en: {
        title: 'PR #408: Full Customer Billing Leak (IDOR)',
        description:
          'This Pull Request simplifies the billing profile endpoint. Inspect the deleted lines in the diff and identify the critical security vulnerability.',
        hints: [
          'Look closely at the deleted guard clause on lines 3–5.',
          'What happens if authenticated user `100` sends `GET /api/users/101/billing`?',
        ],
        seniorExplanation: {
          summary: 'Removing resource ownership verification introduces a critical IDOR / BOLA vulnerability (OWASP API1:2023).',
          whyItMatters:
            'Without verifying `req.session.userId === targetUserId`, any attacker can enumerate `:id` parameters in the URL and download invoices, billing addresses, and payment metadata belonging to every user in the database.',
          howToFix:
            'Restore the object-level authorization check before querying the database, or derive the user ID directly from the authenticated session (`req.session.userId`) instead of URL parameters.',
          fixedCodeSnippet: `if (!req.session?.userId || (req.session.userId !== targetUserId && !req.session.isAdmin)) {
  return res.status(403).json({ error: 'Forbidden: Access Denied' });
}`,
        },
      },
    },
  },

  {
    id: 'sr-02-sql-injection-like',
    tier: 'senior',
    levelInTier: 2,
    fileName: 'searchCatalog.diff',
    language: 'typescript',
    viewMode: 'git_diff',
    isAiTrap: true,
    code: `@@ -45,6 +45,7 @@ export async function searchCatalog(searchTerm: string) {
-  const sql = 'SELECT id, title, price FROM products WHERE title = $1';
-  const result = await db.query(sql, [searchTerm]);
+  // [AI Suggestion]: Enable partial substring matching with SQL LIKE
+  const sql = "SELECT id, title, price FROM products WHERE title LIKE '%" + searchTerm + "%'";
+  const result = await db.query(sql);
   return result.rows;
 }`,
    codeEn: `@@ -45,6 +45,7 @@ export async function searchCatalog(searchTerm: string) {
-  const sql = 'SELECT id, title, price FROM products WHERE title = $1';
-  const result = await db.query(sql, [searchTerm]);
+  // [AI Suggestion]: Enable partial substring matching with SQL LIKE
+  const sql = "SELECT id, title, price FROM products WHERE title LIKE '%" + searchTerm + "%'";
+  const result = await db.query(sql);
   return result.rows;
 }`,
    codePl: `@@ -45,6 +45,7 @@ export async function searchCatalog(searchTerm: string) {
-  const sql = 'SELECT id, title, price FROM products WHERE title = $1';
-  const result = await db.query(sql, [searchTerm]);
+  // [Sugestia AI]: Wyszukiwanie częściowe po frazie za pomocą SQL LIKE
+  const sql = "SELECT id, title, price FROM products WHERE title LIKE '%" + searchTerm + "%'";
+  const result = await db.query(sql);
   return result.rows;
 }`,
    targetLineNumber: 5,
    acceptableLines: [5, 6],
    category: 'security',
    points: 250,
    options: [
      {
        id: 'A',
        isCorrect: true,
        text: {
          pl: 'Podatność SQL Injection: zastąpienie parametru `$1` bezpośrednią konkatenacją stringa z `searchTerm` pozwala na wstrzyknięcie dowolnego polecenia SQL.',
          en: 'SQL Injection vulnerability: replacing the `$1` parameterized query with direct string concatenation of `searchTerm` allows arbitrary SQL command execution.',
        },
      },
      {
        id: 'B',
        isCorrect: false,
        text: {
          pl: 'Operator `LIKE` w silnikach PostgreSQL oraz MySQL nie akceptuje podwójnych cudzysłowów w zmiennej `sql`, co powoduje błąd składniowy na poziomie parsera bazy.',
          en: 'The `LIKE` operator in PostgreSQL and MySQL rejects outer double quotes around the `sql` variable in JavaScript, causing a syntax error in the query parser.',
        },
      },
      {
        id: 'C',
        isCorrect: false,
        text: {
          pl: 'Pominięcie klauzuli `ORDER BY id ASC` przy użyciu operatora `LIKE` z dwoma znakami `%` powoduje zapętlenie kursora w bazie danych i zawieszenie procesu Node.js.',
          en: 'Omitting an `ORDER BY id ASC` clause when using `LIKE` with leading and trailing `%` wildcards causes an infinite cursor loop that freezes the Node.js process.',
        },
      },
      {
        id: 'D',
        isCorrect: false,
        text: {
          pl: 'Odwołanie do pola `result.rows` bez uprzedniego wywołania `await result.toArray()` zwraca pusty bufor binarny przy zapytaniach zawierających klauzulę `LIKE`.',
          en: 'Accessing `result.rows` without calling `await result.toArray()` first returns an unparsed binary buffer whenever the SQL query contains a `LIKE` clause.',
        },
      },
    ],
    aiKeywords: {
      cause: ['sql', 'injection', 'sqli', 'konkatenacj', 'concat', 'wstrzykni', 'parametr', '$1', 'like'],
      fix: ['$1', '`%${searchterm}%`', "'%' + searchterm + '%'", 'parametr', 'prepared'],
    },
    i18n: {
      pl: {
        title: 'AI Audit #1: „Elastyczna” wyszukiwarka z Copilota',
        description:
          'Programista poprosił asystenta AI o przerobienie wyszukiwarki na częściowe dopasowanie (LIKE) i bezrefleksyjnie zaakceptował podpowiedź. Znajdź krytyczną lukę.',
        hints: [
          'Zwróć uwagę, jak asystent AI połączył znaki `%` ze zmienną `searchTerm` w linii 5.',
          'Co się stanie, gdy użytkownik wpisze w wyszukiwarkę `\' UNION SELECT email, password_hash, 0 FROM users --`?',
        ],
        seniorExplanation: {
          summary: 'Podręcznikowa luka SQL Injection wygenerowana przy próbie dodania znaków wieloznacznych `%` do operatora `LIKE`.',
          whyItMatters:
            'Wielu początkujących (oraz modele AI przy krótkim prompcie) nie wie, jak połączyć parametryzowane `$1` ze znakami `%..%` w SQL i idzie na skróty przez sklejanie stringów (`"LIKE \'%" + searchTerm + "%\'"`). Pozwala to atakującemu wyjść z cudzysłowu i wykonać dowolne zapytanie `UNION SELECT` lub `DROP TABLE` na bazie produkcyjnej.',
          howToFix:
            'Nigdy nie rezygnuj z bindowania parametrów `$1`! Znaki `%` doklejamy do wartości w tablicy parametrów przekazywanej jako drugi argument do `db.query()`.',
          fixedCodeSnippet: `const sql = 'SELECT id, title, price FROM products WHERE title LIKE $1';
const result = await db.query(sql, [\`%\${searchTerm}%\`]);`,
        },
      },
      en: {
        title: 'AI Audit #1: Copilot "Flexible" Search Filter',
        description:
          'A developer asked an AI assistant to switch product search to partial LIKE matching and blindly accepted the suggestion. Spot the critical vulnerability.',
        hints: [
          'Look at how the AI combined the `%` wildcards with `searchTerm` on line 5.',
          'What happens if a user searches for `\' UNION SELECT email, password_hash, 0 FROM users --`?',
        ],
        seniorExplanation: {
          summary: 'Classic SQL Injection vulnerability introduced by concatenating `%` wildcards directly with untrusted user input.',
          whyItMatters:
            'Developers (and hasty AI completions) often struggle to combine SQL `LIKE` wildcards with `$1` placeholders and fall back to string concatenation. This lets an attacker break out of the string literal and exfiltrate the entire database via `UNION SELECT`.',
          howToFix:
            'Keep the query strictly parameterized (`LIKE $1`) and attach the `%` wildcards inside the bound parameter array.',
          fixedCodeSnippet: `const sql = 'SELECT id, title, price FROM products WHERE title LIKE $1';
const result = await db.query(sql, [\`%\${searchTerm}%\`]);`,
        },
      },
    },
  },

  {
    id: 'sr-03-race-condition-balance',
    tier: 'senior',
    levelInTier: 3,
    fileName: 'walletWithdraw.diff',
    language: 'typescript',
    viewMode: 'git_diff',
    isAiTrap: true,
    code: `@@ -30,6 +30,12 @@ app.post('/api/wallet/withdraw', requireAuth, async (req, res) => {
   const { amount } = req.body;
+  // [AI Generated Handler]: Verify wallet balance and execute payout
+  const wallet = await db.wallets.findOne({ userId: req.user.id });
+  if (!wallet || wallet.balance < amount) {
+    return res.status(400).json({ error: 'Insufficient funds' });
+  }
+  await externalPaymentGateway.payout(req.user.iban, amount);
+  await db.wallets.update({ userId: req.user.id }, { balance: wallet.balance - amount });
   return res.json({ status: 'WITHDRAWN' });
 });`,
    codeEn: `@@ -30,6 +30,12 @@ app.post('/api/wallet/withdraw', requireAuth, async (req, res) => {
   const { amount } = req.body;
+  // [AI Generated Handler]: Verify wallet balance and execute payout
+  const wallet = await db.wallets.findOne({ userId: req.user.id });
+  if (!wallet || wallet.balance < amount) {
+    return res.status(400).json({ error: 'Insufficient funds' });
+  }
+  await externalPaymentGateway.payout(req.user.iban, amount);
+  await db.wallets.update({ userId: req.user.id }, { balance: wallet.balance - amount });
   return res.json({ status: 'WITHDRAWN' });
 });`,
    codePl: `@@ -30,6 +30,12 @@ app.post('/api/wallet/withdraw', requireAuth, async (req, res) => {
   const { amount } = req.body;
+  // [Handler wygenerowany przez AI]: Sprawdzenie salda i realizacja wypłaty
+  const wallet = await db.wallets.findOne({ userId: req.user.id });
+  if (!wallet || wallet.balance < amount) {
+    return res.status(400).json({ error: 'Insufficient funds' });
+  }
+  await externalPaymentGateway.payout(req.user.iban, amount);
+  await db.wallets.update({ userId: req.user.id }, { balance: wallet.balance - amount });
   return res.json({ status: 'WITHDRAWN' });
 });`,
    targetLineNumber: 9,
    acceptableLines: [4, 8, 9],
    category: 'async',
    points: 280,
    options: [
      {
        id: 'A',
        isCorrect: false,
        text: {
          pl: 'Wywołanie `await externalPaymentGateway.payout()` bez przypisania zwracanej wartości do zmiennej blokuje główny wątek Event Loopa i zawiesza serwer HTTP.',
          en: 'Calling `await externalPaymentGateway.payout()` without assigning its return value to a local variable blocks the main Node.js Event Loop thread indefinitely.',
        },
      },
      {
        id: 'B',
        isCorrect: false,
        text: {
          pl: 'Zwrócenie kodu `res.status(400)` przy braku środków powoduje automatyczne ponawianie żądania przez przeglądarkę klienta w nieskończonej pętli sieciowej.',
          en: 'Returning `res.status(400)` on insufficient funds triggers automatic browser retry policies that replay the failed POST request in an infinite network loop.',
        },
      },
      {
        id: 'C',
        isCorrect: true,
        text: {
          pl: 'Wyścig wielowątkowy (Race Condition / TOCTOU): odczyt salda, przelew i zapis `wallet.balance - amount` bez transakcji pozwalają na wielokrotną wypłatę.',
          en: 'Race Condition (TOCTOU / Double Spend): reading balance, calling payout, and writing `wallet.balance - amount` without a lock allows multiple withdrawals.',
        },
      },
      {
        id: 'D',
        isCorrect: false,
        text: {
          pl: 'Destrukturyzacja `const { amount } = req.body` przed wywołaniem asynchronicznego zapytania `db.wallets.findOne` gubi referencję do obiektu `req.user` w pamięci.',
          en: 'Destructuring `const { amount } = req.body` prior to awaiting `db.wallets.findOne` detaches the `req.user` session reference from the Express request context.',
        },
      },
    ],
    aiKeywords: {
      cause: ['race condition', 'toctou', 'double spend', 'wyścig', 'współbieżn', 'concurren', 'parallel', 'równoleg', 'transakcj', 'transaction', 'lock', 'atom'],
      fix: ['transaction', 'transakcj', 'for update', 'atomic', 'balance - amount', 'where balance >='],
    },
    i18n: {
      pl: {
        title: 'AI Audit #2: Podwójna wypłata z portfela (Race Condition)',
        description:
          'Kod wygenerowany przez AI przechodzi wszystkie pojedyncze testy jednostkowe! Dlaczego jednak atakujący potrafi wypłacić 5000 PLN mając na koncie tylko 1000 PLN?',
        hints: [
          'Zastanów się, co się stanie, gdy użytkownik wyśle 5 równoległych żądań `POST /api/wallet/withdraw` w tej samej milisekundzie.',
          'Ile czasu trwa `await externalPaymentGateway.payout(...)` w linii 8 i jaką wartość `wallet.balance` widzą pozostałe żądania zanim wykona się linia 9?',
        ],
        seniorExplanation: {
          summary: 'Klasyczna luka TOCTOU (Time-Of-Check to Time-Of-Use) / Race Condition prowadząca do ataku Double Spend.',
          whyItMatters:
            'Kod generowany przez AI niemal zawsze wygląda czysto w teście sekwencyjnym: 1) pobierz saldo, 2) sprawdź `if`, 3) wyślij przelew, 4) odejmij kwotę. Na produkcji, gdy użytkownik wyśle 10 równoczesnych żądań, wszystkie 10 odczyta `wallet.balance = 1000` w linii 4 zanim pierwsze żądanie zdąży zakończyć `payout` i zaktualizować bazę w linii 9! Dodatkowo nadpisanie `balance: wallet.balance - amount` używa nieaktualnej wartości z pamięci.',
          howToFix:
            'Zastosuj atomową aktualizację warunkową w bazie danych (`UPDATE wallets SET balance = balance - $1 WHERE user_id = $2 AND balance >= $1`) lub transakcję z blokadą wiersza `SELECT ... FOR UPDATE` PRZED zleceniem wypłaty na zewnątrz (oraz klucz idempotentności).',
          fixedCodeSnippet: `// Atomowa blokada środków PRZED wywołaniem zewnętrznej bramki płatniczej:
const updated = await db.query(
  'UPDATE wallets SET balance = balance - $1 WHERE user_id = $2 AND balance >= $1 RETURNING balance',
  [amount, req.user.id]
);
if (updated.rowCount === 0) {
  return res.status(400).json({ error: 'Insufficient funds' });
}
await externalPaymentGateway.payout(req.user.iban, amount, idempotencyKey);`,
        },
      },
      en: {
        title: 'AI Audit #2: Wallet Double-Spend (Race Condition)',
        description:
          'This AI-generated withdrawal handler passes 100% of sequential unit tests! Yet an attacker just withdrew $5,000 from an account holding only $1,000. How?',
        hints: [
          'Think about what happens when a user fires 5 concurrent `POST /api/wallet/withdraw` requests in the exact same millisecond.',
          'How long does `await externalPaymentGateway.payout(...)` on line 8 take, and what `wallet.balance` do the other 4 requests read before line 9 executes?',
        ],
        seniorExplanation: {
          summary: 'Classic TOCTOU (Time-Of-Check to Time-Of-Use) Race Condition enabling a Double-Spend exploit.',
          whyItMatters:
            'AI-generated CRUD code looks deceptively clean in single-threaded tests: 1) read balance, 2) check `if`, 3) call payout, 4) write `wallet.balance - amount`. Under concurrent requests, 10 parallel requests all read `balance = 1000` on line 4 while the first request is still awaiting the external payout on line 8. Every request passes the check and triggers a payout!',
          howToFix:
            'Perform an atomic conditional decrement in the database (`UPDATE wallets SET balance = balance - $1 WHERE user_id = $2 AND balance >= $1`) or acquire a row-level lock (`SELECT ... FOR UPDATE`) inside a transaction BEFORE calling the external payment gateway.',
          fixedCodeSnippet: `// Atomically deduct funds BEFORE calling the external payout gateway:
const updated = await db.query(
  'UPDATE wallets SET balance = balance - $1 WHERE user_id = $2 AND balance >= $1 RETURNING balance',
  [amount, req.user.id]
);
if (updated.rowCount === 0) {
  return res.status(400).json({ error: 'Insufficient funds' });
}
await externalPaymentGateway.payout(req.user.iban, amount, idempotencyKey);`,
        },
      },
    },
  },
];
