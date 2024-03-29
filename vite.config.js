import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path'

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.jsx','resources/js/admin.app.jsx'],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@img': 'resources/img',
        }
    },
    mode: "development",
    build: {
        minify: false,
    }
});
