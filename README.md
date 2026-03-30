# Pet-проект: GitAnalytics

**Погрузитесь в аналитику GitHub. Ищите репозитории, отслеживайте тренды и изучайте код с помощью современного технологического стека**

_Production-ready код с акцентом на масштабируемость и производительность_

---

## 🏗️ Архитектура приложения

- **FSD (Feature-Sliced Design)** — масштабируемая архитектура с четким разделением слоёв (app, pages, widgets, features, entities, shared)
- **TypeScript** — строгая типизация с использованием продвинутых паттернов: Utility Types, Type Guards, Generics
- **React 18** — современные возможности: Concurrent Features, хуки _useTransition_, _useId_, автоматическое батчирование обновлений
- **Ant Design v6** — гибкая кастомизация темы через Design Tokens, расширение стандартной библиотеки собственными компонентами
- **i18next** — интернационализация с полной поддержкой TypeScript: автодополнение ключей и защита от использования несуществующих переводов
- **Vite** — быстрая сборка и разработка: Hot Module Replacement (HMR), оптимизированная production-сборка, поддержка ES modules, плагины для React и TypeScript

---

## ⚡ Производительность

- **Виртуализация списков** — рендер только видимых элементов (TanStack Virtual)
- **Ленивая загрузка** — страниц и компонентов через _React.lazy_ + _Suspense_
- **Мемоизация** — _React.memo_, _useMemo_, _useCallback_ для предотвращения лишних ререндеров
- **Кеширование запросов** — TanStack Query с оптимальными настройками staleTime и gcTime

---

## 🔧 Developer Experience (DevEx)

- **Husky + lint-staged** — pre-commit хуки для автоматического форматирования и линтинга
- **commitlint** — стандартизация коммитов по Conventional Commits
- **ESLint + Prettier** — автоформатирование и правила для соблюдения FSD-архитектуры
- **Генераторы компонентов** — npm-скрипты для быстрого создания слоёв (widgets, entities, features)
- **Тестирование** — полное покрытие юнит-тестами (Vitest + React Testing Library)
- **TODO:** GitHub Actions для CI/CD

---

## 🎨 UI/UX

- **Адаптивный дизайн** — mobile-first подход, адаптация под все разрешения экрана
- **Скелетоны и индикаторы загрузки** — улучшение восприятия ожидания
- **Поддержка тем** — светлая/тёмная темы с возможностью динамического переключения
- **TODO:** Оффлайн-режим (PWA) для работы без интернета

---

## 🚀 Установка и запуск

#### Установка зависимостей

`npm ci --ignore-scripts --no-audit --verbose`

#### Подготовка Husky

`npm run prepare`

#### Полная переустановка проекта

`rm -rf ./node_modules && git clean -fdx && npm ci --ignore-scripts --no-audit --verbose && npm run prepare`

## 📦 Основные скрипты

#### Запуск приложения

`npm run dev`

#### Генерация компонентов

```bash
npm run generate:page      # генерация страницы
npm run generate:feature   # генерация фичи
npm run generate:widget    # генерация виджета
```

#### 🧪 Тестирование

```bash
npm test                # запуск всех тестов
npm run test:ui         # запуск тестов с UI
npm run test:coverage   # запуск тестов с покрытием
npm run test:watch      # запуск тестов в режиме наблюдения
```
