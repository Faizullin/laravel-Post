<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Admin Panel') }}</title>

        <!-- Fonts -->
        {{-- <link rel="stylesheet" href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap"> --}}

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite('resources/js/admin.app.jsx')
        @inertiaHead
        <link rel="apple-touch-icon" sizes="180x180" href="/Admin1/img/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/Admin1/img/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/Admin1/img/favicon-16x16.png"/>
        <link rel="mask-icon" href="safari-pinned-tab.svg" color="#00b4b6"/>

        <meta name="description" content="Admin One - free Tailwind dashboard">

        <meta property="og:url" content="https://justboil.github.io/admin-one-tailwind/">
        <meta property="og:site_name" content="JustBoil.me">
        <meta property="og:title" content="Admin One HTML">
        <meta property="og:description" content="Admin One - free Tailwind dashboard">
        <meta property="og:image" content="https://justboil.me/images/one-tailwind/repository-preview-hi-res.png">
        <meta property="og:image:type" content="image/png">
        <meta property="og:image:width" content="1920">
        <meta property="og:image:height" content="960">

        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:title" content="Admin One HTML">
        <meta property="twitter:description" content="Admin One - free Tailwind dashboard">
        <meta property="twitter:image:src" content="https://justboil.me/images/one-tailwind/repository-preview-hi-res.png">
        <meta property="twitter:image:width" content="1920">
        <meta property="twitter:image:height" content="960">
    </head>
    <body class="">
        @inertia
        <link rel="stylesheet" href="https://cdn.materialdesignicons.com/4.9.95/css/materialdesignicons.min.css">
    </body>
</html>
