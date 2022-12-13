import './bootstrap';
import '../css/app.css';

import "react-widgets/scss/styles.scss";
//import '../scss/app.sass';

import './main';


import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import NiceModal from '@ebay/nice-modal-react';
import registerModals from './Components/Dialog/registerModals';



const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';
registerModals()

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: name => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <NiceModal.Provider>
                <App {...props} />
            </NiceModal.Provider>
        );
    },
});
InertiaProgress.init({ color: '#4B5563', showSpinner: true });
