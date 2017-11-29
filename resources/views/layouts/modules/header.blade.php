<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>
    Maple.fm | @yield('title', 'MapleStory Free Market')
    </title>
    <meta name="description" content="A glimpse of the MMORPG MapleStory's Free Market and it's economy.">
    @show
    <meta name="keywords" content="MapleStory, maple.fm, maple fm, Free Market, MapleStory Free Market, MapleStory Rankings, Maple, MapleStory population, Maplestory fm">
    <meta property="og:url" content="{{ url()->current() }}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Maple.fm | @yield('title', 'Maplestory Free Market')" />
    <meta property="og:description" content="A glimpse of the MMORPG MapleStory's Free Market and it's economy." />
    <meta property="og:image" content="http://dev.maple.fm/img/mascot.png" />
    <link rel="stylesheet" href="/css/app.css">
    @yield('css')
  </head>
<body>
  <header>
    <div class="navbar-fixed">
     <nav>
        <div class="nav-wrapper">
          <div class="container">
            <a class="brand-logo" href="/"><img src="/img/logo_transparent.png"/></a>
            <span class="brand-logo hide-on-med-and-down" style="margin-left:70px;">| @yield('nav-title', 'Market') <a href="//github.com/crrio/maple.fm/commit/{{ exec('git rev-parse --short HEAD') }}" target="_blank"><span class="chip white-text" style="background:rgba(0,0,0,0.2);vertical-align:middle;">{{ exec('git rev-parse --short HEAD') }}</span></a></span>
            <a href="#" data-activates="mobile" class="button-collapse"><i class="fa fa-bars"></i></a>
            <ul id="left" class="right hide-on-med-and-down">
              <li class="nav-item">
                <a class="nav-link" href="/about">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/statistics">Statistics</a>
              </li>
              <li class="nav-item">
                <a class="nav-link modal-trigger" href="#markets">Markets</a>
              </li>
            </ul>
            <ul class="side-nav" id="mobile">
              <li>
                <a class="nav-link" href="/about">About</a>
              </li>
              <li>
                <a class="nav-link" href="/statistics">Statistics</a>
              </li>
              <li>
                <a class="nav-link modal-trigger" href="#markets">Markets</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>