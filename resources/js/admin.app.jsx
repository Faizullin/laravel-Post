import './bootstrap';

import '../css/admin.app.css';
//import '../css/admin.css';
import "react-widgets/scss/styles.scss";

import React from 'react';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import registerModals from '@Admin/Components/Dialog/registerModals';
import { createRoot } from 'react-dom/client';
import NiceModal from '@ebay/nice-modal-react';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';
registerModals()

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/Admin/Pages/${name}.jsx`, import.meta.glob('./Pages/Admin/Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <NiceModal.Provider>
                <App {...props} />
            </NiceModal.Provider>
        );
    },
});

InertiaProgress.init({ color: '#4B5563' });
