import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

type ManualChunks = Record<string, string[]>;

function getPages(): ManualChunks {
    const pagesDir = path.resolve(__dirname, './src/pages');
    const pages: ManualChunks = {};

    if (fs.existsSync(pagesDir)) {
        fs.readdirSync(pagesDir).forEach((dir) => {
            const pagePath = path.join(pagesDir, dir, 'index.ts');
            if (fs.existsSync(pagePath)) {
                pages[`page-${dir}`] = [`@pages/${dir}/index.ts`];
            }
        });
    }

    return pages;
}

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@app': path.resolve(__dirname, './src/app'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@widgets': path.resolve(__dirname, './src/widgets'),
            '@features': path.resolve(__dirname, './src/features'),
            '@entities': path.resolve(__dirname, './src/entities'),
            '@shared': path.resolve(__dirname, './src/shared'),
        },
        dedupe: ['react', 'react-dom'],
    },
    server: {
        port: 8000,
        open: true,
    },
    build: {
        sourcemap: true,
        chunkSizeWarningLimit: 600,
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor-react': ['react', 'react-dom', 'react-router-dom', 'react-i18next'],
                    'vendor-ui': ['antd', '@ant-design/icons'],
                    'vendor-i18n': [
                        'i18next',
                        'i18next-http-backend',
                        'i18next-browser-languagedetector',
                    ],

                    ...getPages(),
                },
                chunkFileNames: 'assets/[name]-[hash].js',
                entryFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash][extname]',
            },
        },
    },
});
