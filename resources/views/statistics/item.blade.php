@extends('layouts.master')

@section('title')
Statistics
@endsection

@section('content')
<input type="hidden" id="itemId" value="{{ $itemId }}">
<span class="item-title"><span id="name"></span></span>
<span class="extra"><span id="level"></span> <span id="subcategory" class="level"></span></span>
<div class="item-box">
<span id="description"></span>
</div>
<span id="data"></span>
@endsection

@section('sidebar')
<center><canvas class="icon" data-url="" data-scale="9" style="padding:25px"></canvas></center>
@endsection

@section('js')
<script>

  function getAttackSpeed(speed) {
    if(speed == '8') {
      return 'Slower';
    }
    if(speed == '7') {
      return 'Slow';
    }
    if(speed == '6') {
      return 'Normal';
    }
    if(speed == '5') {
      return 'Fast';
    }
    if(speed == '4') {
      return 'Fast';
    }
    if(speed == '3') {
      return 'Faster';
    }
  };

  function formatDesc(desc) {
    // Prevent XSS
    desc = desc.replace(/&/g, "&amp;")
       .replace(/</g, "&lt;")
       .replace(/>/g, "&gt;")
       .replace(/"/g, "&quot;");
    
    // Sometimes, #k is used to end a hash tag.  Other times, it's just #.
    // As soon as we add quest dialogs (if we do, will add the remaining tags).
    desc = desc.replace(/#b([^#]+)#(k)?/g, '<span class="desc-b">$1</span>');
    desc = desc.replace(/#c([^#]+)#(k)?/g, '<span class="desc-c">$1</span>');
    desc = desc.replace(/#e([^#]+)#(k)?/g, '<span class="desc-e">$1</span>');
    desc = desc.replace(/#([^#]+)#(k)?/g, '<span class="text-warning">$1</span>');

    // Replace newlines
    desc = desc.replace(/\\n\\n/g, "<br>"); // We don't want the description to be enormous
    desc = desc.replace(/\\n/g, "<br>");
    
    // Now we need to account for #'s that DON'T end...
    desc = desc.replace(/#b([^#]+)/g, '<span class="desc-b">$1</span>');
    desc = desc.replace(/#c([^#]+)/g, '<span class="desc-c">$1</span>');
    desc = desc.replace(/#e([^#]+)/g, '<span class="desc-e">$1</span>');
    desc = desc.replace(/#([^#]+)/g, '<span class="text-warning">$1</span>');
    
    // Special exception for no booms.
    desc = desc.replace(/(No chance of Item being destroyed on failure.)/g, '<span class="text-success">$1</span>')
    desc = desc.replace(/(The item is destroyed upon failure.)/g, '<span class="text-danger">$1</span>');
    
    // Prevent the last bits of XSS
    return desc.replace(/'/g, "&#039;");
  }

  var itemId = $('#itemId').val();

  $.getJSON("//maplestory.io/api/item/" + itemId, function(data) {
    item = data.Equip;

    if (item !== null) {
      if (item.reqLevel !== null && item.reqLevel !== 0) {
        $('#level').html('Level '+item.reqLevel+'');
      }

      if (item.reqLevel !== null && item.reqLevel !== 0) {
        $('#level').html('Level '+item.reqLevel+'');
      }
    }

    $('#name').html(data.name);

    if (data.SubCategory !== null) {
      $('#subcategory').html(data.SubCategory);
    }

    if (data.description !== null) {
      $('#description').html(formatDesc(data.description));
    }

    $('#data').html(item);
    console.log(data);

    // Item ID
    $('.icon').attr('data-url','https://maplestory.io/api/item/'+ itemId +'/iconRaw');

      var pixelPerfect = new CodePeg.PixelPerfect(
          $('.icon'), {
              urlTag: 'url', // The name of the data tag for the url
              scaleTag: 'scale', // The data tag for the image's scale factor
              filter: 'nearestneighbor', // The image scaling filter to apply. string or function
          }
      );
  });
</script>
@endsection

@section('css')
<style>
  .item-title {
    font-size: 2.28rem;
    margin-top: 20px !important;
    margin: 0px;
    color: #4e89a4;
    font-weight: 200 !important;
    display: block;
  }
  .extra {
    font-size: 1.4rem;
    font-weight: 400;
    margin: 0px;
    color: #4e89a4;
    display: block;
  }
  .item-box {
    clear:both;
    background: rgba(0,0,0,0.9);
    padding: 15px;
    border-radius: 5px;
    color: #FFF;
    margin-top: 10px;
  }
</style>
@endsection