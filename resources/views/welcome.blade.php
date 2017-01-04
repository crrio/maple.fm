@extends('layouts.master')

@section('title')
Explore
@endsection

@section('full')
    <h1 class="center">Explore the Free Market</h1>
    <p class="flow-text center">Take a glimpse of the entire Free Market of MapleStory,<br/>along with powerful statistics about it's economy and items.</p>
    <input type="text" name="i" placeholder="Begin searching.." class="validate center welcome-search" style="font-size:40px;">
@endsection

@section('content')
<h4>Statistics</h4>
<p>Throughout all markets, there are a total of <b><span id="total"></span> items</b> listed currently.</p>
@endsection

@section('sidebar')
<h4>Donations</h4>
<p>Our service is provided for free to everyone in the spirit of free-to-play gaming. As such, we depend on donations to keep up with server costs.</p>
<p>We appreciate every single individual that has helped support our services through <a href="http://patreon.com/Crrio" target="_blank">Patreon</a>.</p>
@endsection

@section('js')
@endsection