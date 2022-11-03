import './bootstrap';
import '../css/app.css';
import '../css/main.css';
//import '../scss/app.sass';
import './main';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';



const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: name => import(`./Pages/${name}`),//resolvePageComponent(`./Pages/${name}`, import.meta.glob('./Pages/**/*')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
});
InertiaProgress.init({ color: '#4B5563', showSpinner: true });
