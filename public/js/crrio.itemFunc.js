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
    limit: 5,
    source: items.ttAdapter(),
    templates: {
        suggestion: function(data) {
        return '<div class="row" style="margin:0px;"><div class="col m1 s3" style="max-height:40px;"><img src="//maplestory.io/api/item/'+data.id+'/iconRaw"></div><div class="col m11 s9" style="max-height:40px;">' + data.value + '</div></div>';
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