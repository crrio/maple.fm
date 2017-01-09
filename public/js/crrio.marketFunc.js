function getServerId() {
    return $('#serverid').val();
}

function commaSeparateNumber(val) {
  while (/(\d+)(\d{3})/.test(val.toString())) {
    val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
  }
  return val;
}

function escapeHtml(unsafe) {
  if (!unsafe.replace) return unsafe
  return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function formatDesc(desc) {
  // Prevent XSS
  desc = desc.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  // Sometimes, #k is used to end a hash tag.  Other times, it's just #.
  // As soon as we add quest dialogs (if we do, will add the remaining tags).
  desc = desc.replace(/#b([^#]+)#(k)?/g, '<span class="desc-b">$1</span>');
  desc = desc.replace(/#c([^#]+)#(k)?/g, '<span class="desc-c">$1</span>');
  desc = desc.replace(/#e([^#]+)#(k)?/g, '<span class="desc-e">$1</span>');
  desc = desc.replace(/#([^#]+)#(k)?/g, '<span class="desc-b">$1</span>'); //initially yellow
  // Replace newlines
  desc = desc.replace(/\\n\\n/g, "<br>"); // We don't want the description to be enormous
  desc = desc.replace(/\\n/g, "<br>");
  // Now we need to account for #'s that DON'T end...
  desc = desc.replace(/#b([^#]+)/g, '<span class="desc-b">$1</span>');
  desc = desc.replace(/#c([^#]+)/g, '<span class="desc-c">$1</span>');
  desc = desc.replace(/#e([^#]+)/g, '<span class="desc-e">$1</span>');
  desc = desc.replace(/#([^#]+)/g, '<span class="desc-b">$1</span>'); //initially yellow
  // Special exception for no booms.
  desc = desc.replace(/(No chance of Item being destroyed on failure.)/g, '<span class="text-success">$1</span>')
  desc = desc.replace(/(The item is destroyed upon failure.)/g, '<span class="text-danger">$1</span>');
  // Prevent the last bits of XSS
  return desc.replace(/'/g, "&#039;");
}

function updateStat(cur, base, isEquip) {
  if (!isEquip) {
    cur = base;
  }
  cur = cur != null ? parseInt(cur) : cur;
  base = base != null ? parseInt(base) : base;
  if (cur != null || (base != null && base != 0)) {
    var result = cur;
    if (cur == null) {
      result = '0 (' + base + ' - ' + base + ')';
    } else if (base != null) {
      var difference = cur - base;
      if (difference != 0) {
        var symbol = difference >= 0 ? ' + ' : ' - ';
        difference = difference < 0 ? -difference : difference;
        result = cur + ' (' + base + symbol + difference + ')';
      }
    } else {
      result = cur + ' (0 + ' + cur + ')';
    }
    return [cur, base, result];
  }
  return cur;
}
/**
 * Updates a compact item's stats with the default item stats.  This
 * way, you can have stuff like STR: 42 (10 + 32)
 * NOTE:  Data uses verbose names, while val uses compact names.
 */
function updateItemDetails(val, data) {
  var e = data.Equip !== null;
  var data = data.Equip;
  //console.log(e);
  //console.log(data);
  if (data !== null) {
      if (val.j !== null || data.incSTR !== null) {
        val.j = updateStat(val.j, data.incSTR, e);
      }
      if (val.k !== null || data.incDEX !== null) {
        val.k = updateStat(val.k, data.incDEX, e);
      }
      if (val.l !== null || data.incINT !== null) {
        val.l = updateStat(val.l, data.incINT, e);
      }
      if (val.m !== null || data.incLUK !== null) {
        val.m = updateStat(val.m, data.incLUK, e);
      }
      if (val.n !== null || data.incMHP !== null) {
        val.n = updateStat(val.n, data.incMHP, e);
      }
      if (val.o !== null || data.incMMP !== null) {
        val.o = updateStat(val.o, data.incMMP, e);
      }
      if (val.p !== null || data.incPAD !== null) {
        val.p = updateStat(val.p, data.incPAD, e);
      }
      if (val.q !== null || data.incMAD !== null) {
        val.q = updateStat(val.q, data.incMAD, e);
      }
      if (val.r !== null || data.incPDD !== null) {
        val.r = updateStat(val.r, data.incPDD, e);
      }
      if (val.s !== null || data.incMDD !== null) {
        val.s = updateStat(val.s, data.incMDD, e);
      }
      if (val.t !== null || data.incACC !== null) {
        val.t = updateStat(val.t, data.incACC, e);
      }
      if (val.u !== null || data.incEVA !== null) {
        val.u = updateStat(val.u, data.incEVA, e);
      }
      if (val.v !== null || data.incCraft !== null) {
        val.v = updateStat(val.v, data.incCraft, e);
      }
      if (val.w !== null || data.incSpeed !== null) {
        val.w = updateStat(val.w, data.incSpeed, e);
      }
      if (val.x !== null || data.incJump !== null) {
        val.x = updateStat(val.x, data.incJump, e);
      }
      if (val.C !== null || data.bdR !== null) {
        val.C = updateStat(val.C, data.bdR, e);
      }
      if (val.D !== null || data.imdR !== null) {
        val.D = updateStat(val.D, data.imdR, e);
      }
    }
}

function getStatLine(prefix, stat, suffix) {
  suffix = typeof suffix !== 'undefined' ? suffix : '';
  var rowStart = '<span class="stat">';
  var rowEnd = '</span><br/>';
  var result = '';
  if (stat != null) {
    if ($.isArray(stat)) {
      if (stat[0] > stat[1] || (stat[1] == null && stat[0] > 0)) { // Higher
        result = rowStart + '<span class="blue-text">' + prefix + stat[2] + suffix + '</span>' + rowEnd;
      } else if (stat[1] > stat[0] || (stat[0] == null && stat[1] > 0)) { // Lower
        result = rowStart + '<span class="red-text">' + prefix + stat[2] + suffix + '</span>' + rowEnd;
      } else {
        result = rowStart + prefix + stat[2] + suffix + rowEnd;
      }
    } else {
      result = rowStart + prefix + stat + suffix + rowEnd;
    }
  }
  return result;
}

function getItemDetails(iRow, val) {
  var rowStart = '<span class="stat">';
  var rowEnd = '</span><br/>';
  var divider = '<li class="divider" style="margin: 10px -10px;height:2px;background:rgba(0,0,0,0.8)"></li>';
  var itemDetails = '<div class="popover-container" id="i' + iRow + '"' + '>';
  // Category
  itemDetails += rowStart + 'Category: ' + val.S + rowEnd;
  // We don't know how the growth level is calculated yet.
  if (val.y != null) {
    itemDetails += rowStart + 'Growth Level: ' + 1 + rowEnd;
  }
  itemDetails += getStatLine('STR: +', val.j);
  itemDetails += getStatLine('DEX: +', val.k);
  itemDetails += getStatLine('INT: +', val.l);
  itemDetails += getStatLine('LUK: +', val.m);
  itemDetails += getStatLine('MaxHP: +', val.n);
  itemDetails += getStatLine('MaxMP: +', val.o);
  itemDetails += getStatLine('WEAPON ATTACK: +', val.p);
  itemDetails += getStatLine('MAGIC ATTACK: +', val.q);
  itemDetails += getStatLine('WEAPON DEF: +', val.r);
  itemDetails += getStatLine('MAGIC DEF: +', val.s);
  itemDetails += getStatLine('ACCURACY: +', val.t);
  itemDetails += getStatLine('AVOIDABILITY: +', val.u);
  itemDetails += getStatLine('Diligence: +', val.v);
  itemDetails += getStatLine('SPEED: +', val.w);
  itemDetails += getStatLine('JUMP: +', val.x);
  itemDetails += getStatLine('Battle Mode ATT: +', val.B);
  itemDetails += getStatLine('When attacking bosses, damage: +', val.C, '%');
  itemDetails += getStatLine('Ignore Monster DEF: +', val.D, '%');
  if (val.h != null) {
    itemDetails += rowStart + 'NUMBER OF UPGRADES AVAILABLE: ' + val.h + rowEnd;
  }
  if (val.H != null && val.H > 0) {
    itemDetails += rowStart + val.H + ' Enhancement Applied' + rowEnd;
  }
  if (val.A != null) {
    itemDetails += rowStart + 'NUMBER OF HAMMER APPLIED: ' + val.A + rowEnd;
  }
  // If we have potentials, show them!
  if (val.I) {
    itemDetails += divider;
    itemDetails += rowStart + val.I + rowEnd;
    if (val.J) {
      itemDetails += rowStart + val.J + rowEnd;
    }
    if (val.K) {
      itemDetails += rowStart + val.K + rowEnd;
    }
  }
  // If we have bonus potentials, show them too!
  if (val.L) {
    itemDetails += divider;
    itemDetails += rowStart + '<span class="blue-text">Bonus Potential</span>' + rowEnd;
    itemDetails += rowStart + '+ ' + val.L + rowEnd;
    if (val.M) {
      itemDetails += rowStart + '+ ' + val.M + rowEnd;
    }
    if (val.N) {
      itemDetails += rowStart + '+ ' + val.N + rowEnd;
    }
  }
  // If we have a neb, show it as well!
  if (val.V) {
    itemDetails += divider;
    itemDetails += rowStart + '<span class="green-text">' + (val.V.length > 0 ? val.V : 'You can mount a Nebulite on this item.') + '</span>' + rowEnd;
  }
  itemDetails += '<small class="text-muted">' + val.P + '</small>';
  itemDetails += '</div>'; // End of container
  return itemDetails;
}
jQuery.fn.dataTableExt.oSort['numeric-formatted-asc'] = function(a, b) {
  a = "" + a;
  b = "" + b;
  var x = parseInt(a.replace(/,/g, ""));
  var y = parseInt(b.replace(/,/g, ""));
  return x - y;
}
jQuery.fn.dataTableExt.oSort['numeric-formatted-desc'] = function(a, b) {
    a = "" + a;
    b = "" + b;
    var x = parseInt(a.replace(/,/g, ""));
    var y = parseInt(b.replace(/,/g, ""));
    return y - x;
  }
  /* Table initialization */
$(document).ready(function() {
  // Create storage for detailed item data
  var itemDetailsMap = {};
  // A map of item ID -> default stats
  var itemInfoMap = {};
  // A map of row ID -> actual stats
  var iRowMap = {};
  // Create listing of all categories present
  var categories = {};
  // Add stat filters
  var statFilter = new CodePeg.StatFilter($('#stat-filter'), {}).childChanged(function(child) {
    oTable.fnDraw(true);
    // Save the change to local storage
    if (typeof(Storage) !== 'undefined') {
      var json = JSON.stringify(statFilter.serialize());
      localStorage.statFilter = json;
    }
  });
  // Load the stat filter if possible
  if (typeof(Storage) !== 'undefined' && localStorage.statFilter) {
    var token = JSON.parse(localStorage.statFilter);
    statFilter.unserialize(token);
  }
  // Enable tooltips
  $('body').popover({
    selector: '.item-popover',
    html: true,
    trigger: 'hover',
    delay: 100,
    content: function() {
      $element = $(this);
      var iRow = parseInt($element.data('row'));
      if (iRow in iRowMap) { // If this row exists (why wouldn't it?)
        // We can grab details of the item, like its id
        var val = iRowMap[iRow];
        if (val.hasDetails) { // Item already has details
          // Nothing to do
        } else if (val.U in itemInfoMap) { // Details exist, but item doesn't have them
          updateItemDetails(val, itemInfoMap[val.U]);
        } else { // Else, we need details
          $.getJSON("//maplestory.io/api/item/" + val.U, function(data) {
            itemInfoMap[data.id] = data;
            val['hasDetails'] = true; //iRowMap[iRow]['hasDetails'] = true;
            updateItemDetails(val, data);
            // We need to refresh the popover if it's still up
            $('#i' + iRow).replaceWith(getItemDetails(iRow, val));
          });
        }
        return getItemDetails(iRow, val);
      }
      return 'Error loading data.  Please refresh.';
    },
    placement: function(tip, element) {
      var placement = 'right';
      // Get tooltip height.
      $element = $(element);
      $tip = $(tip);
      $tip.appendTo(element);
      var actualWidth = $tip.outerWidth(true);
      var actualHeight = $tip.outerHeight(true) / 2;
      $element.remove('.popover');
      var pos = this.getPosition();
      var $parent = this.$element.parent();
      var docScroll = document.documentElement.scrollTop || document.body.scrollTop;
      var parentHeight = window.innerHeight;
      if (pos.top + pos.height + actualHeight - docScroll > parentHeight) {
        placement = 'top';
      }
      return placement;
    }
  });
  $('body').tooltip({
    selector: '.item-tooltip',
    html: true,
    trigger: 'hover',
    delay: 10,
    placement: 'top'
  });
  // Create the data table
  var oTable = $('#search_results_table').dataTable({
    "fnDrawCallback": function(oSettings) {
      // Lazy load the images on page change
      $("img.lazy").lazyload();
    },
    "oLanguage": {
      "sEmptyTable": '<div class="preloader-wrapper big active" style="margin:20px;"><div class="spinner-layer spinner-blue"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div>',
      "sLengthMenu": '<ul class="list-inline no-bottom unstyled col m3 s12 input-field right"><select class="validate">' + '<option value="5">5</option>' + '<option value="10">10</option>' + '<option value="20" selected="selected">20</option>' + '<option value="25">25</option>' + '<option value="50">50</option>' + '<option value="100">100</option>' + '<option value="250">250</option>' + '</select></li></ul>',
      "sSearch": ''
    },
    'iDisplayLength': 20,
    "sPaginationType": "full_numbers",
    "aoColumns": [{
        "bSearchable": true
      }, // Item
      {
        "bSearchable": false
      }, // Qty
      {
        "bSearchable": false
      }, // Bundle
      {
        "sType": "numeric-formatted",
        "bSearchable": false
      }, // Price
      {
        "bSearchable": false
      }, // Ch
      {
        "bSearchable": false
      }, // Rm
      {
        "bSearchable": false,
        "bVisible": false
      }, // Shop
      {
        "bSearchable": true
      }, // Seller
      {
        "bSearchable": false,
        "bVisible": false
      }, // Median
      {
        "bSearchable": false, // Category
        "bVisible": false
      }, {
        "bSearchable": true, // Subcategory
        "bVisible": false
      }, {
        "bSearchable": false, // Detail Category
        "bVisible": false
      }, {
        "bSearchable": false, // Cash
        "bVisible": false
      }
    ],
    "aoColumnDefs": [{
      "aTargets": [0, 6, 7, 8],
      "fnCreatedCell": function(nTd, sData, oData, iRow, iCol) {
        if (iCol == 0) {
          $(nTd).html(itemDetailsMap[iRow][0]);
        } else if (iCol == 6) {
          $(nTd).html(itemDetailsMap[iRow][1]);
        } else if (iCol == 7) {
          $(nTd).html(itemDetailsMap[iRow][2]);
        } else if (iCol == 8) {
          $(nTd).html(itemDetailsMap[iRow][3]);
        }
      }
    }]
  });
  $.fn.dataTableExt.afnFiltering.push(function(oSettings, aData, iDataIndex) {
    return statFilter.filter(iRowMap[iDataIndex]);
  });
  // Change search input class
  $search = $('div.dataTables_filter input');
  $label = $('div.dataTables_filter label');
  $search.addClass('validate col m9 s12 input-field item-search');
  $search.attr('placeholder', 'Search for item or player name..');
  $search.insertBefore($label);
  $label.remove();
  // Filter by item name when item name is clicked
  $("#search_results_body").on('click', 'a.filter', function() {
    var name = $(this)[0].text;
    oTable.fnFilter('' + name + '');
  });
  $("#checkbox-cash").change(function() {
    if (this.checked) {
      // Filter by cash
      oTable.fnFilter('1', 12);
    } else {
      // Remove cash filter
      oTable.fnFilter('', 12);
    }
  });
  $("#checkbox-sold").change(function() {
    if (this.checked) {
      oTable.fnFilter("^[1-9][0-9]*$", 1, true);
    } else {
      oTable.fnFilter('', 1);
    }
  });
  // Add advanced option filters
  $("#select-category").change(function() {
    $option = $(this).children(":selected");
    var category = $option.val();
    if (category != '') {
      oTable.fnFilter("^" + category + "$", 9, true);
    } else {
      oTable.fnFilter('', 9);
    }
    // When this is changed, remove the filters on sub and detail.
    oTable.fnFilter('', 10);
    oTable.fnFilter('', 11);
    $subCategory = $("#select-subcategory");
    // If not any, then populate subcategories
    if (category != '') {
      $subCategory.empty();
      $subCategory.append('<option value="">All ' + category + '</option>');
      var subs = [];
      for (var sub in categories[category]) {
        subs.push(sub);
      }
      subs.reverse();
      var i = subs.length - 1;
      if (i > -1) {
        do {
          $subCategory.append('<option value="' + subs[i] + '">' + subs[i] + '</option>');
        } while (--i >= 0);
      }
    }
    // If not any, then display subcategory
    $subCategory.toggleClass('hide', category == '');
    $("#select-detailcategory").addClass('hide');
  });
  $("#select-subcategory").change(function() {
    var category = $("#select-category").children(":selected").val();
    $option = $(this).children(":selected");
    var subCategory = $option.val();
    if (subCategory != '') {
      oTable.fnFilter("^" + subCategory + "$", 10, true);
    } else {
      oTable.fnFilter('', 10);
    }
    // Remove filter on detail when changed
    oTable.fnFilter('', 11);
    $detailCategory = $("#select-detailcategory");
    // If not any, then populate detailcategories
    if (subCategory != '') {
      $detailCategory.empty();
      $detailCategory.append('<option value="">All ' + subCategory + '</option>');
      var details = [];
      for (var detail in categories[category][subCategory]) {
        details.push(detail);
      }
      details.reverse();
      var i = details.length - 1;
      if (i > -1) {
        do {
          $detailCategory.append('<option value="' + details[i] + '">' + details[i] + '</option>');
        } while (--i >= 0);
      }
    }
    // If not any, then display detailcategory
    $detailCategory.toggleClass('hide', subCategory == '');
  });
  $("#select-detailcategory").change(function() {
    $option = $(this).children(":selected");
    if ($option.val() != '') {
      oTable.fnFilter("^" + $option.val() + "$", 11, true);
    } else {
      oTable.fnFilter('', 11);
    }
  });
  // Insert into the data table
  $.getJSON('http://maplestory.io/api/server/'+ getServerId() +'/market/legacy').then(function(data) {
    var items = [];
    var odd = new Boolean(true);
    $.each(data, function(key, val) {
      var fm_items = val.fm_items;
      var seconds_ago = val.seconds_ago;
      if (fm_items != null) {
        var iRow = 0;
        $.each(fm_items, function(key, val) {
          var prettyPrice = commaSeparateNumber(val.c);
          val.a = val.a == null ? 0 : val.a;
          val.P = val.P == null ? '' : formatDesc(val.P);
          val.X = val.X == null ? -1 : Math.round(100.0 * val.c / val.X / val.b);
          val.Y = val.Y == null ? 0 : val.Y;
          var nameExtension = val.i == null ? '' : ' (+' + val.i + ')';
          var itemName = val.O + nameExtension;
          var rowStart = '';
          var rowEnd = '';
          var divider = '<ul class="nav nav-list"><li class="divider"></li></ul>';
          // Sanity check for upgrades remaining
          if (val.i != null && val.h == null) {
            val.h = 0;
          }
          var itemTitle = '';
          // Stars in the title!
          if (val.H != null) {
            itemTitle += '<div class="center">';
            // Only show up to 15 stars.  If more, it's probably hacked.
            for (var i = 0; i < val.H && i < 15; ++i) {
              var spacer = ((i > 0) && (i % 5 == 0)) ? ' style="margin-left:15px;"' : '';
              itemTitle += '<img src="/img/star-unleashed.png" alt="*"' + spacer + '>';
            }
            itemTitle += rowEnd;
          }
          itemTitle += rowStart + '<strong style="display:block;margin:5px;">' + itemName + '</strong>' + rowEnd;
          // Rarity
          var rareClass = '';
          if (val.G > 0) {
            var rarity = '';
            switch (parseInt(val.G)) {
              case 1:
                rarity = '(Rare Item)';
                rareClass = 'rare';
                break;
              case 2:
                rarity = '(Epic Item)';
                rareClass = 'epic';
                break;
              case 3:
                rarity = '(Unique Item)';
                rareClass = 'unique';
                break;
              case 4:
                rarity = '(Legendary Item)';
                rareClass = 'legendary';
                break;
              case 5:
                rarity = '(Unidentified Item)';
                rareClass = 'unidentified';
                break;
            }
            itemTitle += rowStart + '<p class="text-center text-muted">' + rarity + '</p>' + rowEnd;
          }

          function htmlEntities(str) {
            return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
          }
          // Make the HTML code safe...
          itemTitle = escapeHtml(itemTitle);
          val.T = val.T == null ? '' : escapeHtml(val.T);
          val.f = val.f == null ? '' : escapeHtml(val.f);
          var medianPercent = 'N/A';
          if (val.X >= 0) {
            medianPercent = (val.X > 999 ? '>999' : val.X) + '%';
          }
          if (val.X >= 120) {
            medianPercent = '<span class="red-text">' + medianPercent + '</span>';
          } else if (val.X >= 80) {
            medianPercent = '<span class="blue-text">' + medianPercent + '</span>';
          } else if (val.X >= 0) {
            medianPercent = '<span class="green-text">' + medianPercent + '</span>';
          }
          var name = '<div class="item-popover" data-toggle="popover" ' + 'data-title="' + itemTitle + '" data-class="' + rareClass + '" data-row="' + iRow + '"><ul class="list-inline no-bottom">' + '<li data-row="' + iRow + '"><img class="lazy" data-original="http://maplestory.io/api/item/' + val.T + '/icon" alt="' + escapeHtml(val.O) + '" style="margin-right:5px;"><span style="vertical-align:super;">' + itemName + '</span> <a class="chip blue lighten-1 white-text right" href="/statistics/item/' + val.U + '"><i class="fa fa-chevron-right"></i></li></ul></div>';
          var shopName = val.f;
          if (shopName.length > 12) {
            val.f = shopName.substring(0, 12) + '&hellip;';
            shopName = '<div class="item-tooltip" data-toggle="tooltip" data-title="' + htmlEntities(shopName) + '">' + shopName + '</div>';
          }
          var characterName = '<a href="#" class="filter">' + val.g + '</a>';
          var item = [itemName + escapeHtml(val.P),
            val.a, val.b, prettyPrice,
            val.d, val.e, val.f, val.g,
            val.X, val.Q, val.R, val.S, val.Y
          ];
          items.push(item);
          // Add details to our item maps
          iRowMap[iRow] = val;
          itemDetailsMap[iRow++] = [name, shopName, characterName, medianPercent];
          // Add category (the true isn't necessary)
          if (!categories[val.Q]) {
            categories[val.Q] = {};
          }
          if (!categories[val.Q][val.R]) {
            categories[val.Q][val.R] = {};
          }
          categories[val.Q][val.R][val.S] = true;
        });
      } else if (seconds_ago != null) {
        // Compare to our current time
        var time = new Date(Date.now() - seconds_ago * 1000);
        // 1 hour in the future.  Needed for offset
        var minuteOffset = Math.round(seconds_ago / 60);
        setInterval(function() {
          ++minuteOffset;
          $('#minute').html(minuteOffset);
        }, 1000 * 60);
        setInterval(function() {
          $('#5min').html('<p class="alert alert-info">New items are now avalible in the market. Refresh to view them!</p>');
        }, 1000 * 300);
        // Classify how bad our delay is
        var extraText = " <span class='alert-info' data-container='body' data-toggle='popover' data-placement='bottom' data-content='MapleStory is either currently under maintenance, or our backend is experiencing issues.'><i class='fa fa-exclamation-mark'></i></span>";
        if (minuteOffset < 4) {
          extraText = " <span class='alert-info' data-container='body' data-toggle='popover' data-placement='bottom' data-content='There is a small delay.'><i class='fa fa-exclamation-mark'></i></span>";
        } else if (minuteOffset < 10) {
          extraText = " <span class='alert-info' data-container='body' data-toggle='popover' data-placement='bottom' data-content='There appears to be a decent delay, if this continues let us know.'><i class='fa fa-exclamation-mark'></i></span>";
        }
        // Make the time readable
        time.setHours(time.getHours() - 8);
        var readableTime = time.toISOString();
        readableTime = readableTime.replace("T", " ");
        readableTime = readableTime.substring(0, readableTime.indexOf("."));
        // Create notice based on time
        $(".attach-header").after('<span style="font-size:16px;color:#AAA;">Updated <b><span id="minute">' + minuteOffset + '</span> minute' + (minuteOffset == 1 ? '' : 's') + '</b> ago' + extraText + '</span>');
      }
    });
    // Load oTable in chunks
    function chunkLoadData(items, offset) {
      // If we're done
      if (offset >= items.length) {
        // Make quantity 0 items show as red
        var nRows = oTable.fnGetNodes();
        for (var i = 0; i < nRows.length; ++i) {
          var aPos = oTable.fnGetPosition(nRows[i]);
          if (parseInt(nRows[i].cells[1].innerHTML) == 0) {
            nRows[i].setAttribute("class", "danger");
          }
        }
        // Resize columns
        oTable.fnAdjustColumnSizing();
        // Re-sort
        //oTable.fnReloadAjax();
        // Show advanced options
        $("#select-category").removeClass('hide');
        oTable.fnDraw(true);
        return;
      }
      var end = offset + 100 < items.length ? offset + 100 : items.length;
      for (var i = offset; i < end; ++i) {
        oTable.fnAddData([items[i]], false);
      }
      if (offset == 0) {
        oTable.fnAdjustColumnSizing();
      }
      setTimeout(function() {
        chunkLoadData(items, offset + 100);
      }, 1);
    }
    $('select').material_select();
    chunkLoadData(items, 0);
    // Enable arrow keys
    $(document).keydown(function(event) {
      if ($(event.target).is("body")) {
        switch (event.which) {
          case 37: // Left
            if (event.ctrlKey) {
              oTable.fnPageChange('first');
            } else {
              oTable.fnPageChange('previous');
            }
            break;
          case 39: // Right
            if (event.ctrlKey) {
              oTable.fnPageChange('last');
            } else {
              oTable.fnPageChange('next');
            }
            break;
        }
      }
    });
    // If table is still empty, then there were no results.  :(
    var settings = oTable.fnSettings();
    settings.oLanguage.sEmptyTable = "No items found on this server.  If this happens frequently, please report it!";
    oTable.fnDraw(); // redraw
  });
});

function blockAdblockUser() {
  if ($('.ad').height() < 50) {
    $('.ad').append("<div style='width: 336px;height: 200px;border: 1px solid rgba(0,0,0,0.1);background: #FFF;padding: 10px;'><center><p class='lead' style='font-weight: bold;'>LF&gt; Mesos</p></center><p>To continue to provide this service for free, we depend on our ads to cover the costs of servers and other expenses.<br><br>Please support us by re-enabling ads.</div>");
  }
}
$(document).ready(function() {
  blockAdblockUser();
});