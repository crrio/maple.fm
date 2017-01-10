@extends('layouts.master')

@section('title')
MapleStory Free Market
@endsection

@section('nav-title')
Explore <a href="//github.com/crrio/maple.fm/tree/development" target="_blank"><span class="chip white-text" style="background:rgba(0,0,0,0.2);vertical-align:middle;">{{ exec('git rev-parse --short HEAD') }}</span></a>
@endsection

@section('full')
    @if(!Auth::check())
      <div class="alert-dev white-text center" style="font-size:20px;"><b>Hello mapler!</b> Thank you for testing out our public alpha as we craft a better experience for you. Please report any bugs on our <a href="//github.com/crrio/maple.fm/issues" target="_blank" class="white-text"><u>Github</u></a>! <i class="fa fa-heart"></i>
      </div>
    @endif
    <h1 class="center white-text">Explore the Free Market</h1>
    <p class="flow-text center white-text">Take a glimpse of the entire Free Market of MapleStory,<br/>along with powerful statistics about it's economy and items.</p>
    <form method="post">
    <input type="text" name="i" id="item_search" placeholder="Begin searching.." class="validate welcome-search" style="font-size:40px;padding: 8px;border-bottom:1px solid #FFF;color:#FFF;" value="">
    <input type="hidden" name="item" id="item_hidden" value="">
    </form>
@endsection

@section('content')
<h4 class="white-text">More about our service..</h4>
<p class="white-text">Under construction.</p>
@endsection

@section('sidebar')
<h4 class="white-text">Donations</h4>
<p class="white-text">Our service is provided for free to everyone in the spirit of free-to-play gaming. As such, we depend on donations to keep up with server costs.</p>
<p class="white-text">We appreciate every single individual that has helped support our services through <a href="http://patreon.com/Crrio" target="_blank">Patreon</a>.</p>
@endsection

@section('css')
<style>
  html, body {
      background: #c0c0aa; /* fallback for old browsers */
      background: -webkit-linear-gradient(to left, #c0c0aa , #1ce) !important; /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to left, #c0c0aa , #1ce) !important; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      height: 100vh;
      margin: 0;
  }
  ::-webkit-input-placeholder {
    color: #FFFFFF !important;
  }

  :-moz-placeholder { /* Firefox 18- */
    color: #FFFFFF !important;
  }

  ::-moz-placeholder {  /* Firefox 19+ */
    color: #FFFFFF !important;
  }

  :-ms-input-placeholder {  
    color: #FFFFFF !important;
  }
</style>
@endsection

@section('js')
<script src="/js/typeahead.min.js"></script>
<script src="/js/crrio.itemFunc.js"></script>
@endsection