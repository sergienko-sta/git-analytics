import pluginJs from '@eslint/js';
// import stylistic from '@stylistic/eslint-plugin';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
// import { fileURLToPath } from 'url';

export default [
    // 1. Базовые настройки для всех файлов
    {
        files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2021,
            },
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        settings: {
            react: {
                version: 'detect',
            },
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                    project: './tsconfig.app.json',
                },
                alias: {
                    map: [
                        ['@', './src'],
                        ['@app', './src/app'],
                        ['@pages', './src/pages'],
                        ['@widgets', './src/widgets'],
                        ['@features', './src/features'],
                        ['@entities', './src/entities'],
                        ['@shared', './src/shared'],
                    ],
                    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
                },
            },
        },
    },

    // 2. TypeScript специфичные настройки с projectService
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },

    // 3. Специальная обработка для конфигурационных файлов
    {
        files: ['**/*.config.{ts,js,mjs,cjs}'],
        languageOptions: {
            parserOptions: {
                project: null,
                projectService: false,
            },
        },
    },

    // 4. Рекомендованные конфигурации
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    pluginReact.configs.flat.recommended,
    pluginReact.configs.flat['jsx-runtime'],

    // 5. Плагины и правила
    {
        plugins: {
            'simple-import-sort': simpleImportSort,
            import: importPlugin,
            'react-hooks': pluginReactHooks,
        },
        rules: {
            // ========== Базовые правила ==========
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    prefer: 'type-imports',
                    disallowTypeAnnotations: true,
                },
            ],

            // ========== React правила ==========
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react/display-name': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            // ========== Сортировка импортов (с поддержкой FSD) ==========
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        // 1. Внешние зависимости (react, react-dom, etc)
                        ['^react', '^@?\\w'],

                        // 2. FSD слои (по порядку зависимостей)
                        ['^@app(/.*|$)'],
                        ['^@pages(/.*|$)'],
                        ['^@widgets(/.*|$)'],
                        ['^@features(/.*|$)'],
                        ['^@entities(/.*|$)'],
                        ['^@shared(/.*|$)'],
                        ['^@(/.*|$)'],

                        // 3. Родительские импорты (..)
                        ['^\\.\\.(?!/?$)', '^\\.\\./?$'],

                        // 4. Текущая директория (.)
                        ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],

                        // 5. Стили
                        ['^.+\\.s?css$'],
                    ],
                },
            ],
            'simple-import-sort/exports': 'error',

            // ========== Правила import ==========
            'import/no-unresolved': 'error',
            'import/named': 'error',
            'import/namespace': 'error',
            'import/default': 'error',
            'import/export': 'error',
            'import/no-duplicates': 'error',
            'import/first': 'error',
            'import/newline-after-import': 'error',

            // ========== FSD специфичные правила ==========
            // Запрещаем импорты из вышестоящих слоев
            'import/no-restricted-paths': [
                'error',
                {
                    zones: [
                        // 1. Shared - НИЧЕГО НЕ ИМПОРТИРУЕТ из других слоев
                        {
                            target: './src/shared',
                            from: './src',
                            except: ['./shared'],
                            message: 'Shared cannot import from other layers',
                        },

                        // 2. Entities - импортирует ТОЛЬКО из shared
                        {
                            target: './src/entities',
                            from: './src',
                            except: ['./entities', './shared'],
                            message: 'Entities can only import from shared',
                        },

                        // 3. Features - импортирует ТОЛЬКО из entities и shared
                        {
                            target: './src/features',
                            from: './src',
                            except: ['./features', './entities', './shared'],
                            message: 'Features can only import from entities and shared',
                        },

                        // 4. Widgets - импортирует ТОЛЬКО из features, entities и shared
                        {
                            target: './src/widgets',
                            from: './src',
                            except: ['./widgets', './features', './entities', './shared'],
                            message: 'Widgets can only import from features, entities and shared',
                        },

                        // 5. Pages - импортирует из widgets, features, entities и shared
                        {
                            target: './src/pages',
                            from: './src',
                            except: [
                                './pages',
                                './widgets',
                                './features',
                                './entities',
                                './shared',
                            ],
                            message: 'Pages can import from all except app',
                        },
                    ],
                },
            ],

            // Запрещаем cross-imports внутри одного слоя (кроме shared)
            'import/no-internal-modules': [
                'error',
                {
                    allow: [
                        '@shared/**',
                        '@app/**/*.tsx',
                        '@pages/**/*.tsx',
                        '@widgets/**/*.tsx',
                        '@features/**/*.tsx',
                        '@entities/**/*.tsx',
                        '**/index.ts',

                        // Разрешенные внешние модули
                        'react-dom/client',
                        '@testing-library/jest-dom/vitest',
                        '**/public/locales/**/*.json',
                    ],
                },
            ],

            // Общие правила
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'no-debugger': 'warn',
        },
    },
    // stylistic.configs['disable-legacy'],
    // stylistic.configs.customize({
    //   indent: 2,
    //   quotes: 'single',
    //   semi: true,
    //   commaDangle: 'never',
    //   jsx: true,
    //   braceStyle: '1tbs',
    // }),
    // 7. Специфичные правила для тестов
    {
        files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}', '**/__tests__/**'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            'no-console': 'off',
            'import/no-unresolved': 'off',

            '@typescript-eslint/no-unsafe-member-access': 'warn',
            '@typescript-eslint/no-unsafe-call': 'warn',
            '@typescript-eslint/no-unsafe-argument': 'warn',

            '@typescript-eslint/await-thenable': 'warn',

            '@typescript-eslint/unbound-method': 'off',
            '@typescript-eslint/no-empty-function': 'off',
            'import/no-extraneous-dependencies': 'off',
        },
    },
    {
        ignores: [
            '**/node_modules/**',
            '**/dist/**',
            '**/build/**',
            '**/coverage/**',
            '**/.next/**',
            '**/*.config.*',
            '**/.history/**',
            '**/public/**',
            '**/scripts/**',
            '**/vite-env.d.ts',
        ],
    },
    // Интеграция с Prettier (добавлять последним!)
    {
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            'prettier/prettier': ['warn', {}, { usePrettierrc: true }],
            ...prettierConfig.rules,
        },
    },
];
