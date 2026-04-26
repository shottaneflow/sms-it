# WB Autotest — Wildberries E2E тесты

Автотесты для проверки поиска и сортировки товаров на Wildberries.
Стек: **Playwright** + **TypeScript** + **Allure**.

## Структура проекта
├── pages/
│   ├── basePage.ts
│   ├── mainPage/
│   │   └── mainPage.ts
│   └── searchPage/
│       ├── searchPage.ts
│       └── components/
│           └── Card.ts
├── fixtures/
│   └── base.ts
├── helpers/
│   └── types.ts
├── data/
│   └── constants.ts
├── tests/
│   └── wildberries.test.ts
├── task1/
│   └── solution.ts          # алгоритмическая задача
├── playwright.config.ts
├── eslint.config.js
└── README.md

## Требования

- Node.js >= 18
- npm >= 9

## Установка

```bash
npm install
npx playwright install chromium
```

## Запуск E2E тестов

```bash
# Headless (CI)
npm test

# С открытым браузером — для отладки
npm run test:headed

# Конкретный файл
npx playwright test tests/wildberries.test.ts
```

## Allure отчёт

```bash
# Установить Allure CLI (один раз)
# macOS:   brew install allure
# Windows: scoop install allure

npm run test:allure
```

## Линтер

```bash
npm run lint        # проверить
npm run lint:fix    # автоисправление
```

## Task1 — алгоритмическая задача

Обход дерева папок и сбор директорий содержащих `.js` файлы.

### Подготовка тестовых данных

Создай структуру папок в `task1/sample/` (папка исключена из git):
task1/sample/
├── dirA/
│   ├── sub1/          ← 2 .js файла → берём
│   │   ├── index.js
│   │   └── utils.js
│   └── sub2/          ← только .css → не берём
│       └── style.css
├── dirB/
│   └── sub1/          ← есть .js → берём
│       ├── app.js
│       └── helper.ts
└── dirC/              ← 3 .js файла → берём
├── main.js
├── index.js
└── config.js

### Запуск

```bash
cd task1
npx ts-node solution.ts
```

### Что делает решение

- **Уровень 1** — находит все конечные папки где есть хотя бы один `.js` файл
- **Уровень 2** — добавляет счётчик `.js` файлов для каждой папки  
- **Уровень 3** — делит папки на `N` групп с примерно равным количеством файлов 

Константы настраиваются в `solution.ts`:
- `ROOT_DIRS` — корневые папки для обхода
- `N` — количество групп для разбивки