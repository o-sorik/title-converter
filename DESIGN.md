---
name: Title Case Converter
description: Конвертер регістру за стайл-гайдами AP, APA, Chicago і MLA, з поясненням кожного слова.
colors:
  proofmark-indigo: "oklch(0.511 0.194 267)"
  proofmark-indigo-night: "oklch(0.707 0.165 267)"
  on-indigo: "oklch(0.985 0 0)"
  masthead-navy: "oklch(0.22 0.09 267)"
  masthead-navy-deep: "oklch(0.17 0.07 267)"
  masthead-navy-mid: "oklch(0.25 0.10 267)"
  navy-wash: "oklch(0.94 0.02 240)"
  ink: "oklch(0.145 0 0)"
  paper: "oklch(1 0 0)"
  page-gray: "oklch(0.985 0 0)"
  margin-gray: "oklch(0.97 0 0)"
  pencil-gray: "oklch(0.556 0 0)"
  rule-gray: "oklch(0.922 0 0)"
  night-page: "oklch(0.145 0 0)"
  night-surface: "oklch(0.205 0 0)"
  night-text: "oklch(0.985 0 0)"
  mark-capitalized: "oklch(0.508 0.118 165.612)"
  mark-lowercased: "oklch(0.488 0.243 264.376)"
  error-red: "oklch(0.577 0.245 27.325)"
typography:
  display:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.025em"
  headline-article:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1.25
  title:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.333
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  body-article:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 2
  output:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.556
  ui:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.429
  label:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "0.12em"
  mono:
    fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "14px"
  2xl: "18px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
components:
  chip-mode:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.ui}"
    rounded: "{rounded.full}"
    height: "32px"
    padding: "0 12px"
  chip-mode-active:
    backgroundColor: "{colors.proofmark-indigo}"
    textColor: "{colors.on-indigo}"
    typography: "{typography.ui}"
    rounded: "{rounded.full}"
    height: "32px"
    padding: "0 12px"
  tab-style:
    backgroundColor: "{colors.margin-gray}"
    textColor: "{colors.ink}"
    typography: "{typography.ui}"
    rounded: "{rounded.lg}"
    height: "32px"
    padding: "0 12px"
  tab-style-active:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.ui}"
    rounded: "{rounded.md}"
    height: "32px"
    padding: "0 12px"
  input-converter:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.output}"
    rounded: "{rounded.xl}"
    padding: "24px"
  output-converter:
    backgroundColor: "{colors.page-gray}"
    textColor: "{colors.ink}"
    typography: "{typography.output}"
    rounded: "{rounded.xl}"
    padding: "24px"
  button-primary:
    backgroundColor: "{colors.proofmark-indigo}"
    textColor: "{colors.on-indigo}"
    typography: "{typography.ui}"
    rounded: "{rounded.md}"
    height: "36px"
    padding: "8px 16px"
  button-outline:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.ui}"
    rounded: "{rounded.md}"
    height: "32px"
    padding: "0 12px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.ui}"
    rounded: "{rounded.md}"
    height: "32px"
    padding: "0 12px"
  badge-capitalize:
    backgroundColor: "oklch(0.979 0.021 166.113)"
    textColor: "{colors.mark-capitalized}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
  badge-lowercase:
    backgroundColor: "oklch(0.968 0.007 247.896)"
    textColor: "oklch(0.446 0.043 257.281)"
    rounded: "{rounded.full}"
    padding: "2px 10px"
---

# Design System: Title Case Converter

## Overview

**Creative North Star: "Поля коректора" (The Proofreader's Margin)**

Текст відвідувача – головний на сторінці, а система поводиться як коректор на полях: ставить точну позначку там, де щось змінилося, і пише поруч правило. Кожне перетворене слово підкреслено кольором зміни, у кожного є причина з конкретного гайду, а решта інтерфейсу мовчить. Колір тут означає дію або зміну, не настрій.

Щільність середня: інструмент на одну хвилину, тому керування знайоме й упізнаване з першого погляду (чипи режимів, вкладки стилів, поле вводу, поле результату, кнопка копіювання). Довідкові статті читаються спокійно: широкий інтерліньяж, один sans для тексту, serif лише в заголовку статті. Візуальна сміливість не мета, мета – точність і стриманість.

Відхилення, які система вже відкинула: AI-бокси-виноски з кольоровим лівим бордером і іконкою, display-serif у тексті, анімований синьо-фіолетовий градієнт на тлі (прибрано 02.07.2026), фейкові тестимоніали.

**Key Characteristics:**
- Один шрифт для всього інтерфейсу й тексту (Space Grotesk); Playfair Display лише в коротких display-елементах блогу.
- Один акцент – Proofmark Indigo; кольори позначок змін (зелений «з великої», синій «з малої») мають лише цю роль.
- Пласкі поверхні, глибина тоном фону й тонким бордером.
- Заокруглення м'які (10–14 px) на полях і картках, пігулки (full) на чипах і бейджах.
- Темна тема обов'язкова для кожного елемента.

## Colors

Нейтральна, майже безбарвна сторінка з одним індиговим акцентом і двома семантичними кольорами позначок.

### Primary
- **Proofmark Indigo** (`proofmark-indigo`): активний режим конвертера (заповнений чип), фокус-кільце, посилання в тексті, логотип-квадрат «T». У темній темі його замінює **Proofmark Indigo Night** (`proofmark-indigo-night`).

### Secondary
- **Masthead Navy** (`masthead-navy`, `masthead-navy-deep`, `masthead-navy-mid`): лише CTA-картки блогу (градієнт від deep до mid з білим текстом) і бічна картка «Fast Headline Formatting». За межами блогу не з'являється.
- **Navy Wash** (`navy-wash`): світла підкладка блогових секцій.

### Tertiary
- **Mark Capitalized** (`mark-capitalized`, emerald-700): слово, яке конвертер підняв до великої; бейдж «Capitalize» у таблицях статей.
- **Mark Lowercased** (`mark-lowercased`, blue-700): слово, яке конвертер опустив до малої.
- **Error Red** (`error-red`): лише помилки й ховер кнопки очищення.

### Neutral
- **Ink** (`ink`): основний текст і заголовки.
- **Paper** (`paper`): поле вводу, картки, поповери.
- **Page Gray** (`page-gray`, zinc-50): фон сторінок і поле результату – результат «лежить на сторінці», а не в окремій коробці.
- **Margin Gray** (`margin-gray`): треки вкладок, приглушені підкладки.
- **Pencil Gray** (`pencil-gray`): підписи полів, допоміжний текст, лічильники.
- **Rule Gray** (`rule-gray`): бордери й розділювачі.
- **Night Page / Night Surface / Night Text**: базові ролі темної теми; бордери в темряві – білий 10%, поле вводу – білий 15%.

### Named Rules
**The Mark Means Change Rule.** Зелений і синій позначок означають лише «слово змінено вгору» і «слово змінено вниз». Ні кнопки, ні декор, ні статуси їх не беруть.

**The One Accent Rule.** Proofmark Indigo – єдиний акцент інтерфейсу. Другого брендового кольору поза Masthead Navy блогу немає й не додається.

## Typography

**Display Font:** Space Grotesk (з ui-sans-serif, system-ui)
**Body Font:** Space Grotesk
**Article Headline Font:** Playfair Display (з Georgia, serif) – лише блог
**Label/Mono Font:** SFMono-Regular, Menlo, Monaco, Consolas, monospace

**Character:** Space Grotesk дає інструменту технічну, трохи механічну точність, а Playfair у заголовку статті – редакційний голос, але лише там, де текст короткий.

### Hierarchy
- **Display** (700, 48 px на md+, 30 px на мобільному, line-height 1, трекінг −0.025em): H1 конвертерних сторінок.
- **Headline Article** (Playfair Display 700, 48 px md+ / 30 px мобільний, line-height 1.25): H1 статей, заголовки карток статей, однорядкові приклади заголовків у блоках «Do / Don't».
- **Title** (700–900, 24 px, line-height 32 px): H2 на головній і в статтях.
- **Body** (400, 16 px / 24 px): інтерфейсний текст і контент головної; ліди 18 px / 28 px.
- **Body Article** (400, 16 px / 32 px): текст статей.
- **Output** (500, 18 px / 28 px): текст у полі вводу (на мобільному) і в полі результату.
- **UI** (500, 14 px / 20 px): чипи, вкладки, кнопки, підписи полів.
- **Label** (600, 10 px, uppercase, трекінг 0.12em): підписи груп «Text Case», «Code Case», «Title Style». Нижче за поріг 11 px і з контрастом 2,3:1 – відомий борг (див. аудит).
- **Mono** (12 px): клавіатурні підказки (`kbd`), підписи Input/Output у прикладах.

### Named Rules
**The Serif Stays Short Rule.** Playfair Display – лише для коротких display-рядків: заголовок статті, заголовок картки, приклад заголовка в один рядок. Абзаци, H2 і нижче, інтерфейс – тільки Space Grotesk.

**The Same Size In And Out Rule.** Текст, який відвідувач вводить, і текст, який отримує, мають однаковий кегль (18 px), щоб результат читався як той самий рядок, а не як інший документ. Зараз на md+ ввід рендериться 14 px: `md:text-sm` зі shadcn `Textarea` перебиває `text-lg` – це відхилення, не норма.

## Layout

Одна колонка по центру, контейнер `max-w-5xl` (1024 px) з бічними відступами 16 px (мобільний) / 24 px (sm) / 32 px (lg). Шапка прилипає до верху, висота 56 px.

Конвертер на md+ – дві рівні колонки (ввід зліва, результат справа) з проміжком 24 px; над ними керування: групи чипів режимів і вкладки стилю. На мобільному колонки йдуть одна під одною, а керування стискається до двох селектів над полем вводу; повний набір чипів опускається під результат.

Статті: основна колонка й бічна панель (CTA, «On this page», пов'язані гайди), на мобільному панель іде під текст. Між великими секціями головної 48 px, усередині блоків 16–24 px. Широкі таблиці живуть в обгортці з горизонтальною прокруткою; стаття-грід-елемент має `min-w-0`, щоб таблиця не розпирала сторінку на телефоні.

## Elevation & Depth

Система пласка. Глибину створюють тон (Paper на Page Gray) і бордер 1 px Rule Gray, а не тіні. Тінь допустима лише як реакція на стан або для шарів, що справді лежать над контентом.

### Shadow Vocabulary
- **Scrolled header** (`shadow-md`): з'являється на шапці лише після прокрутки.
- **Floating layer** (`shadow-xl`): тултипи й поповери над контентом.
- **Converter card, legacy** (`shadow-2xl` + `bg-white/50` + `backdrop-blur-sm`): єдине «скло» на сайті. Записано як відхилення від системи, а не правило; наступна правка конвертера переводить картку на пласку поверхню.

### Named Rules
**The Flat Page Rule.** Поверхні пласкі у спокої. Тінь з'являється лише як відповідь на стан (прокрутка, відкритий поповер), ніколи як прикраса. Скло й розмиття фону в нових елементах не використовуються.

## Shapes

Базовий радіус 10 px (`--radius: 0.625rem`), похідні: 6 / 8 / 10 / 14 / 18 px. Поля вводу й результату, картки контенту – 14 px; великі картки блогу й CTA – 18 px; кнопки й вкладки – 8 px; чипи режимів і бейджі – повна пігулка. Позначка зміни в результаті має майже прямий кут (3 px) – вона читається як позначка, а не як кнопка.

## Components

### Buttons
- **Shape:** м'який кут (8 px).
- **Primary:** Proofmark Indigo, білий текст, 36 px заввишки. На головній зараз не використовується.
- **Outline:** Paper з бордером Rule Gray, 32 px (44 px на дотикових). Нею зараз зроблена кнопка Copy.
- **Ghost:** без фону, ховер Margin Gray; іконкові кнопки вставки й очищення, посилання шапки.
- **Hover / Focus:** зміна фону 150 мс; фокус – кільце `ring-ring/50` 3 px. Кожен клікабельний елемент має `cursor-pointer`.

### Chips (режими конвертера)
- **Style:** пігулка 32 px, бордер zinc-200 (dark: zinc-700), прозорий фон, текст UI 14/500.
- **State:** активний чип заповнює індигова «пігулка», що ковзає між чипами групи (220 мс, `cubic-bezier(0.4,0,0.2,1)`). Тултип показує опис і приклад `Hello World → …`.

### Tabs (стиль title case)
- Трек Margin Gray з падінгом 4 px; активна вкладка – Paper. Під вкладками – однорядкова підказка правила стилю (12 px, Pencil Gray).

### Inputs / Fields
- **Input:** Paper, бордер Rule Gray, радіус 14 px, падінг 24 px, мінімальна висота 140 / 160 / 200 px за брейкпоінтами, без ресайзу. Фокус – кільце `primary/20` 2 px, підпис поля фарбується в індиго. Порожнє поле на десктопі показує підказку `⌘/Ctrl + V`.
- **Output:** Page Gray з бордером, той самий радіус і падінг, `role="textbox"` тільки для читання. Порожнє поле показує плейсхолдер, сконвертований у поточний режим.

### Diff Marks (сигнатурний компонент)
Змінені слова в результаті підкреслено лінією 2 px з відступом 4 px: зелена – піднято до великої, синя – опущено до малої. Під результатом рядок-легенда: «N changes · capitalized · lowercased · hover a word for the rule». Кнопка «Explain» розгортає панель пояснень: бейджі `word → Word` і причина з правила гайду.

### Cards / Containers
- **Corner Style:** 14 px (контент), 18 px (блог, CTA).
- **Background:** Paper на Page Gray; у темряві Night Surface.
- **Shadow Strategy:** див. Elevation; нові картки без тіні.
- **Border:** 1 px Rule Gray.
- **Internal Padding:** 16–24 px.

### Editorial Lede (блок відповіді в статтях)
Без боксу: лінія 2 px Ink зверху, мітка small-caps 11 px з трекінгом 0.2em («Quick Answer» – синя, «It Depends» – бурштинова), під нею текст відповіді 18–20 px. Єдиний неупакований блок на сторінці, тому й помітний.

### Capitalization Badges (таблиці статей)
Пігулки 12 px semibold: «Capitalize» – зелена підкладка й Mark Capitalized, «Lowercase» – сіра. Таблиця з колонками Word / AP / APA / Chicago / MLA.

### Navigation
Прилипла шапка 56 px з напівпрозорим фоном і розмиттям: логотип-квадрат «T» (Proofmark Indigo) + «TitleCase» (на мобільному лише квадрат), ghost-посилання Guides / Rules / Batch Checker, випадне меню All Converters, перемикач теми. На мобільному – бургер з панеллю.

### Motion
Стримано: поява результату 200 мс (лише перехід з порожнього стану), ковзна пігулка 220 мс, поява секцій під час прокрутки 500 мс з повним вимкненням при `prefers-reduced-motion`.

## Do's and Don'ts

### Do:
- **Do** давати кожному новому елементу пару для темної теми (`dark:`) і перевіряти обидві теми на 390 px і на десктопі.
- **Do** будувати глибину тоном Paper на Page Gray і бордером 1 px, а не тінню.
- **Do** брати кольори з токенів `globals.css` (OKLCH); Tailwind-палітру (emerald, blue, slate) – лише для ролей, уже описаних вище.
- **Do** тримати сенсорні цілі не менше 44 px на дотикових пристроях (як уже зроблено для кнопок конвертера).
- **Do** використовувати іконки лише з `@tabler/icons-react`.

### Don't:
- **Don't** додавати скло, `backdrop-blur` чи великі тіні на нові поверхні; скло картки конвертера – спадок, не взірець.
- **Don't** фарбувати кнопки, статуси чи декор зеленим або синім позначок змін.
- **Don't** повертати анімований градієнт на тло чи фейкові відгуки.
- **Don't** ставити текст менше 11 px для функціональних підписів (нинішні 10 px – борг, не норма).
- **Don't** редагувати `components/ui/` вручну; зміни – через `className` на місці виклику.

## Правила смаку власника

Ці три правила підтвердив власник продукту. Вони мають пріоритет над загальними рекомендаціями скілів і детекторів.

1. **Без AI-боксів-виносок.** Ніяких кольорових блоків уваги з лівим бордером, іконкою й лейблом («Note», «Tip», «Important»). Коли треба виділити думку, працює безбоксовий редакційний лід: тонка лінія зверху й мітка small-caps (див. Editorial Lede). Вибрано 02.07.2026 з п'яти макетів.
2. **Serif лише для display.** Playfair Display (і будь-який display-serif) – тільки для коротких елементів: заголовок, одне слово, однорядковий приклад. Для тексту відхилено через погану читабельність – це практичне рішення, не естетичне.
3. **Спірне – варіантами на локалі.** Спірне візуальне рішення не описують словами. Робиться тимчасова локальна сторінка з 4–6 живими варіантами: обидва стани компонента, світла й темна тема. Власник вибирає, вибраний варіант стає шаблоном, тимчасова сторінка видаляється.
