const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                //sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
            // colors: {
            //     'regal-blue': '#243c5a',
            // },
            backgroundColor:{
                'green-basic':'#008374',
                'secondary-basic':'#f85a40',
            },
        },
    },

    plugins: [require('@tailwindcss/forms')],
};
