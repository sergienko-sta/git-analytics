import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
        globals: true,
        environment: 'jsdom',

        setupFiles: ['./src/test/setup.ts', './src/test/setup-localstorage.ts'],
        coverage: {
            provider: 'v8', // или 'istanbul', но v8 быстрее
            reporter: ['text', 'json', 'html', 'text-summary'],
            reportsDirectory: './coverage',
            include: ['src/**/*.ts', 'src/**/*.tsx'],
            exclude: [
                '**/node_modules/**',
                '**/dist/**',
                '**/coverage/**',
                '**/src/test/**',
                '**/*.config.{js,ts}',
                '**/*.d.ts',
                '**/src/main.tsx',
                '**/vite-env.d.ts',
                '**/*.test.{ts,tsx}',
                '**/*.types.ts',
                '**/*.styles.ts',
                '**/*.constants.ts',
                '**/*.model.ts',
                '**/*.component.tsx',
                '**/index.ts',
            ],
            thresholds: {
                lines: 80,
                functions: 80,
                branches: 80,
                statements: 80,
            },
        },
    },
});
