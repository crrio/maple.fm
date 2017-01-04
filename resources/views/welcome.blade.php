@extends('layouts.master')

@section('title')
Explore
@endsection

@section('full')
    <h1 class="center">Explore the Free Market</h1>
    <p class="flow-text center">Take a glimpse of the entire Free Market of MapleStory,<br/>along with powerful statistics about it's economy and items.</p>
    <form method="post" action="/register">
    <input type="text" name="i" id="item_search" placeholder="Begin searching.." class="validate welcome-search" style="font-size:40px;" value="">
    <input type="hidden" name="item" id="item_hidden" value="">
    </form>
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

@section('css')
<style>

.twitter-typeahead {
    width: 100%;
}

.typeahead,
.tt-query,
.tt-hint, {
  height: 30px;
  padding: 8px 12px;
  font-size: 24px;
  line-height: 30px;
  border: 2px solid #ccc;
  -webkit-border-radius: 8px;
     -moz-border-radius: 8px;
          border-radius: 8px;
  outline: none;
}

.typeahead {
  background-color: #fff;
}

.typeahead:focus {
  border: 2px solid #0097cf;
}

.tt-query {
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
     -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
}

.tt-hint {
  color: #999
}

.tt-menu {
  width: 100%;
  margin: 12px 0;
  padding: 8px 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border: 1px solid rgba(0, 0, 0, 0.2);
  -webkit-border-radius: 8px;
     -moz-border-radius: 8px;
          border-radius: 8px;
  -webkit-box-shadow: 0 5px 10px rgba(0,0,0,.2);
     -moz-box-shadow: 0 5px 10px rgba(0,0,0,.2);
          box-shadow: 0 5px 10px rgba(0,0,0,.2);
}

.tt-suggestion {
  padding: 3px 20px;
  font-size: 18px;
  line-height: 24px;
}

.tt-suggestion:hover {
  cursor: pointer;
  color: #fff;
  background-color: #0097cf;
}

.tt-suggestion.tt-cursor {
  color: #fff;
  background-color: #0097cf;

}

.tt-suggestion p {
  margin: 0;
}

.gist {
  font-size: 14px;
}

/* example specific styles */
/* ----------------------- */

#custom-templates .empty-message {
  padding: 5px 10px;
 text-align: center;
}

#multiple-datasets .league-name {
  margin: 0 20px 5px 20px;
  padding: 3px 0;
  border-bottom: 1px solid #ccc;
}

#scrollable-dropdown-menu .tt-menu {
  max-height: 150px;
  overflow-y: auto;
}

#rtl-support .tt-menu {
  text-align: right;
}
</style>
@endsection

@section('js')
<script src="/js/typeahead.min.js"></script>
<script type="text/javascript">
// Instantiate the Bloodhound suggestion engine
var items = new Bloodhound({
    datumTokenizer: function (datum) {
        return Bloodhound.tokenizers.whitespace(datum.value);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: {
        url: 'http://maplestory.io/api/item/list',
        filter: function (items) {
            // Map the remote source JSON array to a JavaScript object array
            return $.map(items, function (item) {
                return {
                    value: item.name,
                    id: item.id,
                };
            });
        }
    },
    minLength: 3,
});

// Initialize the Bloodhound suggestion engine
items.initialize();

// Instantiate the Typeahead UI
$('#item_search').typeahead(null, {
    displayKey: 'value',
    minLength: 3,
    limit: 10,
    source: items.ttAdapter(),
    templates: {
        suggestion: function(data) {
            return '<div><img src="http://maplestory.io/api/item/' + data.id + '/icon" style="margin-right:10px;"/><span style="vertical-align: super;">' + data.value + '</span></div>';
        }
    }
});

$('#item_search').on('typeahead:selected', function (e, datum) {
    $("#item_hidden").val(datum.id);
});
$('#item_search').on('typeahead:cursorchanged', function (e, datum) {
    $("#item_hidden").val(datum.id);
});

$('#item_search').on('keypress', function (e) {
     if(e.which === 13){

        //Disable textbox to prevent multiple submit
        $(this).attr("disabled", "disabled");

        window.location.href = '/statistics/item/' + $('#item_hidden').val() + '';
     }
});
</script>
@endsection