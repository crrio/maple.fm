@extends('layouts.master')

@section('title')
{{ $server }} Market
@endsection

@section('nav-title')
{{ $server }} Market
@endsection

@section('full')
<div class="top-ad">
<ins class="adsbygoogle"
     style="display:inline-block;width:728px;height:90px"
     data-ad-client="ca-pub-6550692695111418"
     data-ad-slot="4323719721"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>
</div>
<div style="margin-top:20px;">
  <div class="left">
    <input type="checkbox" id="checkbox-cash" />
    <label for="checkbox-cash">Only Show Cash Items</label>
  </div>

  <div class="right">
    <input type="checkbox" id="checkbox-sold" checked="checked"/>
    <label for="checkbox-sold">Hide Sold Items</label>
  </div>
</div>

<input type="hidden" id="serverid" value="{{ $serverId }}">

<div class="col s12">
  <select class="form-control input-sm" id="select-category">
    <option value="">All Categories</option>
    <option value="Equip">Equip</option>
    <option value="Use">Use</option>
    <option value="Etc">Etc</option>
    <option value="Setup">Setup</option>
  </select>
  <select class="form-control input-sm hide" id="select-subcategory"></select>
  <select class="form-control input-sm hide" id="select-detailcategory"></select>
</div>
<div class="table-responsive" style="padding:5px;">
  <table cellpadding="0" cellspacing="0" border="0" class="table table-bordered table-hover" id="search_results_table" width="100%">
    <thead>
      <tr>
        <th class="sorting" style="min-width:10px;">Item</th>
        <th class="sorting">Qty</th>
        <th class="sorting">Bundle</th>
        <th class="sorting">Price</th>
        <th class="sorting">Ch</th>
        <th class="sorting">Rm</th>
        <th class="sorting">Shop</th>
        <th class="sorting">Seller</th>
        <th class="sorting">%</th>
      </tr>
    </thead>
    <tbody id="search_results_body">
    </tbody>
  </table>
</div>
<div class="bottom-ad">
<ins class="adsbygoogle"
     style="display:inline-block;width:728px;height:90px"
     data-ad-client="ca-pub-6550692695111418"
     data-ad-slot="7277186127"></ins>
</div>
@endsection

@section('css')
    <link rel="stylesheet" type="text/css" href="/css/DT_bootstrap.css">
@endsection

@section('js')
    <script>
    (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <script type="text/javascript" language="javascript" src="/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" language="javascript" src="/js/codepeg.statFilter.js?r=2"></script>
    <script type="text/javascript" language="javascript" src="/js/crrio.marketFunc.js"></script>
    <script>
      $('#refresh').click(function() {
        window.location.reload();
      });
    </script>
@endsection