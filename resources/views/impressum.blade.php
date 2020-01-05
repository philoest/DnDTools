<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="dns-prefetch" href="//fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Fira+Sans&display=swap" rel="stylesheet">

        <!-- Styles -->
        <link href="{{ asset('css/welcome.css') }}" rel="stylesheet">
    </head>
    <body>
        <div class="dt-welcome" id="app">
          <div class="dt-title">
            <h1>
              DnD Tools
            </h1>
          </div>
          <div class="dt-grid">
            <div class="dt-cell">
              <div>
                <h2>Impressum</h2>
                <p>
                  Verwalte deine Gegenstände und die deines Teams auf einfache und interaktive Weise. Kein langes Listen abgleichen und nachfragen mehr wer was hat.
                </p>
              </div>
            </div>
            <div class="dt-cell">
              <div>
                
              </div>
            </div>
          </div>
          <div class="dt-footer">
            <a href="{{route('welcome')}}">Startseite</a>
            <a href="{{route('about')}}">Über mich</a>
            <a href="https://www.github.com/philoest">Github</a>
          </div>
        </div>
    </body>
</html>
