// Our namespace

var Market = Market || {
  servers: {
    scania: 0,
    windia: 0,
    bera: 0,
    khroa: 0,
    mybckn: 0,
    grazed: 0
  },
  count: 0
};

function getCount() {
    if (Market.count != 0) {
        return Market.count;
    } else {
        $.each(Market.servers, function (server_name, server_item_count) {
            $.ajax({
                url: 'http://maplestory.io/api/server/' + Object.keys(Market.servers).indexOf(server_name).toString() + '/market/itemCount',
                async: true,
                success: function (data) {
                    var json_data = JSON.parse(data);
                    var priorCount = Market.count;
                    $('#'+ server_name +'').html(json_data).formatNumber();
                    Market.count += json_data;
                    Market.servers[server_name] = json_data;
                    //console.log(data + ' items were added to ' + priorCount + ' to become ' + Market.count + ' items.');
                }
            });
        });
        return Market.count;
    }
}