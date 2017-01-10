@extends('layouts.master')

@section('title')
{{ $server }} Market
@endsection

@section('nav-title')
{{ $server }} Market
@endsection

@section('full')
    <input type="hidden" id="serverid" value="{{ $serverId }}">
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
    <div class="hide">
            <label class="pull-left">
                <input type="checkbox" id="checkbox-cash"> Only Show Cash Items
            </label>
            <label class="pull-right">
                <input type="checkbox" id="checkbox-sold"> Hide sold items
            </label>
    </div>
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
@endsection

@section('css')
    <link rel="stylesheet" type="text/css" href="/css/DT_bootstrap.css">
    <style>
    .dataTables_wrapper {
        clear: none !important;
    }
    </style>
@endsection

@section('js')
    <script type="text/javascript" language="javascript" src="/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" language="javascript" src="/js/codepeg.statFilter.js?r=2"></script>
    <script type="text/javascript" language="javascript" src="/js/crrio.marketFunc.js"></script>
    <script>
      $(document).ready(function() {
        $('select').material_select();
      });
      $('#refresh').click(function() {
        window.location.reload();
      });
    </script>
@endsection