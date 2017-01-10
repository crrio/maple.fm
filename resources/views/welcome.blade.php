@extends('layouts.master')

@section('title')
Explore
@endsection

@section('full')
    <h1 class="center">Explore the Free Market</h1>
    <p class="flow-text center">Take a glimpse of the entire Free Market of MapleStory,<br/>along with powerful statistics about it's economy and items.</p>
    <form method="post">
    <input type="text" name="i" id="item_search" placeholder="Begin searching.." class="validate welcome-search" style="font-size:40px;" value="">
    <input type="hidden" name="item" id="item_hidden" value="">
    </form>
@endsection

@section('content')
<h4>Statistics</h4>
<p>Under construction.</p>
@endsection

@section('sidebar')
<h4>Donations</h4>
<p>Our service is provided for free to everyone in the spirit of free-to-play gaming. As such, we depend on donations to keep up with server costs.</p>
<p>We appreciate every single individual that has helped support our services through <a href="http://patreon.com/Crrio" target="_blank">Patreon</a>.</p>
@endsection

@section('css')
<style>
</style>
@endsection

@section('js')
<script src="/js/typeahead.min.js"></script>
<script src="/js/crrio.itemFunc.js"></script>
@endsection