@extends('layouts.master')

@section('title')
Statistics
@endsection

@section('nav-title')
Statistics
@endsection

@section('full')
<div class="alert-dev red white-text center" style="font-size:20px;"><i class="fa fa-exclamation-circle"></i> <b>Heads up!</b> All the statistics on this page are randomly generated and will be replaced with actual statistics soon.
</div>
@endsection

@section('content')
<h2>Defining the MapleStory economy, one item at a time.</h2>
<p class="flow-text">We provide detailed and exclusive information about the game's markets with hourly, daily, and all time statistics.</p>
<h4>In the last hour..</h4>
<b><i class="fa fa-chevron-right"></i> {{ number_format(rand(2500,99999)) }} items</b> were sold.<br/>
<b><i class="fa fa-chevron-right"></i> {{ number_format(rand(25000000000,200999999999)) }} mesos</b> were transferred.<br/>
<h4>In the last day..</h4>
<b><i class="fa fa-chevron-right"></i> {{ number_format(rand(250000,9999999)) }} items</b> were sold.<br/>
<b><i class="fa fa-chevron-right"></i> {{ number_format(rand(2500000000000,20099999999999)) }} mesos</b> were transferred.<br/>
<h4>In the last month..</h4>
<b><i class="fa fa-chevron-right"></i> {{ number_format(rand(250000000,9999999999)) }} items</b> were sold.<br/>
<b><i class="fa fa-chevron-right"></i> {{ number_format(rand(250000000000000,2009999999999999)) }} mesos</b> were transferred.<br/>
@endsection

@section('sidebar')
<div class="card horizontal blue lighten-1 white-text" style="margin-top:40px;">
  <div class="card-stacked">
    <div class="card-content">
      <h5 style="margin-top:0px;">Since the beginning of time.. <span style="font-size:18px;">(January 2017)</span></h5>
      <b>{{ number_format(rand(250000000000000,9999999999999999)) }} items</b> were sold.<br/>
      <b>{{ number_format(rand(2500000000000000,20099999999999999)) }} mesos</b> were transferred.<br/>
    </div>
  </div>
</div>
<div class="card horizontal blue lighten-1 white-text">
  <div class="card-stacked">
    <div class="card-content">
      <h5 style="margin-top:0px;"><canvas class="icon" data-url="/img/cash.png" data-scale="2" width="0px" height="0px"></canvas> Quick, strike a pose!</h5>
      <p>Maplers love to freshen up their look, so these statistics were no surprise!</p><br/>
      <b>{{ number_format(rand(2500000,9999999)) }} cash items</b> have been traded in the Free Market since January 2017.
    </div>
  </div>
</div>
<div class="card horizontal blue lighten-1 white-text">
  <div class="card-stacked">
    <div class="card-content">
      <h5 style="margin-top:0px;">Illegal Meso Transactions <sup>1</sup></h5>
      <p>We use special algorithms to attempt to catch players involved in purchasing or selling mesos illegally (for real life currency).</p>
      <br/>
      <b>{{ number_format(rand(25000,99999)) }} Players</b> have been caught by our service.<br/>
    </div>
  </div>
</div>
 <i><sup>1</sup> These players are typically sent to Nexon America for further review, although action is not always guarenteed.</i>
@endsection

@section('js')
<script type="text/javascript">
var pixelPerfect = new CodePeg.PixelPerfect(
    $('.icon'), {
        urlTag: 'url', // The name of the data tag for the url
        scaleTag: 'scale', // The data tag for the image's scale factor
        filter: 'nearestneighbor', // The image scaling filter to apply. string or function
    }
);
</script>
@endsection