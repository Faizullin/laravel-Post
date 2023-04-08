<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        {{-- <meta name="viewport" content="width=device-width, initial-scale=1"> --}}

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600;1,700&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Raleway:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">

        {{-- <link rel="stylesheet" href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap"> --}}

        <!-- Scripts -->
        @routes
                    {{-- <link rel="preload" as="style" href="http://127.0.0.1:8000/build/assets/registerModals.469eb125.css">
                    <link rel="preload" as="style" href="http://127.0.0.1:8000/build/assets/app.2ea320c4.css">
                    <link rel="modulepreload" href="http://127.0.0.1:8000/build/assets/app.e10d29dc.js">
                    <link rel="modulepreload" href="http://127.0.0.1:8000/build/assets/registerModals.84eb8d18.js">
                    <link rel="stylesheet" href="http://127.0.0.1:8000/build/assets/registerModals.469eb125.css">
                    <link rel="stylesheet" href="http://127.0.0.1:8000/build/assets/app.2ea320c4.css">
                    <script type="module" src="http://127.0.0.1:8000/build/assets/app.e10d29dc.js"></script>
                    {{-- <link rel="modulepreload" as="script" crossorigin="" href="/build/assets/Index.e59f3d37.js"> --}}
                    {{-- <link rel="modulepreload" as="script" crossorigin="" href="/build/assets/registerModals.84eb8d18.js"> --}}
                    {{-- <link rel="stylesheet" href="/build/assets/registerModals.469eb125.css">
                    <link rel="modulepreload" as="script" crossorigin="" href="/build/assets/Layout.f689399f.js">
                    <link rel="stylesheet" href="/build/assets/Layout.f85da3e0.css">
                    <link rel="modulepreload" as="script" crossorigin="" href="/build/assets/ChevronDownIcon.efc8ce78.js">
                    <link rel="modulepreload" as="script" crossorigin="" href="/build/assets/index.98c0411a.js">
                    <link rel="modulepreload" as="script" crossorigin="" href="/build/assets/Sidebar.b1905d07.js">
                    <link rel="modulepreload" as="script" crossorigin="" href="/build/assets/purify.es.f5041473.js">
                    <link rel="modulepreload" as="script" crossorigin="" href="/build/assets/PlusIcon.963709c1.js">
                    <link rel="modulepreload" as="script" crossorigin="" href="/build/assets/useDidUpdateEffect.d88ae7ee.js">
                    <link rel="modulepreload" as="script" crossorigin="" href="/build/assets/Squares2X2Icon.154e3425.js">
                    <link rel="modulepreload" as="script" crossorigin="" href="/build/assets/Breadcrumb.ebd75ed7.js"> --}}


        @viteReactRefresh
        @vite('resources/js/app.jsx')
        @inertiaHead
    </head>
    <body class="antialiased">
        @inertia
    </body>
</html>
