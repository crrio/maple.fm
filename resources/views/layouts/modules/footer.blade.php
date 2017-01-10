        <footer class="page-footer">
          <div class="container">
            <div class="row">
              <div class="col s12 m12">
                <p class="grey-text text-lighten-4 center" style="margin-bottom: 0px;margin-top:20px;">
                  All assets and resources regarding MapleStory thereof are the sole property of <a href="http://nexon.net" class="white-text"><b>NEXON</b></a> and applies to their Terms of Use.<br/>
                <i class="twa twa-heart"></i> We are <i>not an official MapleStory server nor fansite</i>; we merely provide this service for free <i><b>for players, by players.</b></i></p>
              </div>
            </div>
          </div>
        </footer>

      <div id="markets" class="modal bottom-sheet">
    <div class="row">
    <div class="modal-content">
      <div class="col s12 m12">
        <h4>Markets</h4>
        <p>View the entire Free Market of each MapleStory server below. Support for Luna will be added soon.</p>
      </div>
        <div class="col s12 m4">
            <div class="card horizontal">
              <div class="card-stacked">
                <a href="/scania">
                <div class="card-content blue white-text" style="position:relative;overflow:hidden;">
                    <canvas class="worldicon" data-url="/img/worlds/Scania.png" data-scale="10" style="margin-right:5px;position:absolute;right:-20px;top:-30px;opacity:0.5;" data-toggle="tooltip" data-placement="bottom" title="Market" width="80" height="80"></canvas>
                    <p class="flow-text">Scania</p>
                    <p><b><span id="scania"></span></b> Items Listed</p>
                </div>
                </a>
              </div>
            </div>
        </div>
        <div class="col s12 m4">
            <div class="card horizontal">
              <div class="card-stacked">
                <a href="/windia">
                <div class="card-content purple white-text" style="position:relative;overflow:hidden;">
                    <canvas class="worldicon" data-url="/img/worlds/Windia.png" data-scale="10" style="margin-right:5px;position:absolute;right:-20px;top:-30px;opacity:0.5;" data-toggle="tooltip" data-placement="bottom" title="Market" width="80" height="80"></canvas>
                    <p class="flow-text">Windia</p>
                    <p><b><span id="windia"></span></b> Items Listed</p>
                </div>
                </a>
              </div>
            </div>
        </div>
        <div class="col s12 m4">
            <div class="card horizontal">
              <div class="card-stacked">
                <a href="/bera">
                <div class="card-content red lighten-1 white-text" style="position:relative;overflow:hidden;">
                    <canvas class="worldicon" data-url="/img/worlds/Bera.png" data-scale="10" style="margin-right:5px;position:absolute;right:-20px;top:-30px;opacity:0.5;" data-toggle="tooltip" data-placement="bottom" title="Market" width="80" height="80"></canvas>
                    <p class="flow-text">Bera</p>
                    <p><b><span id="bera"></span></b> Items Listed</p>
                </div>
                </a>
              </div>
            </div>
        </div>
        <div class="col s12 m4">
            <div class="card horizontal">
              <div class="card-stacked">
                <a href="/khroa">
                <div class="card-content green lighten-1 white-text" style="position:relative;overflow:hidden;">
                    <canvas class="worldicon" data-url="/img/worlds/Broa.png" data-scale="10" style="margin-right:5px;position:absolute;right:-20px;top:-20px;opacity:0.5;" data-toggle="tooltip" data-placement="bottom" title="Market" width="80" height="80"></canvas>
                    <p class="flow-text">Khroa</p>
                    <p><b><span id="khroa"></span></b> Items Listed</p>
                </div>
                </a>
              </div>
            </div>
        </div>
        <div class="col s12 m4">
            <div class="card horizontal">
              <div class="card-stacked">
                <a href="/mybckn">
                <div class="card-content orange white-text" style="position:relative;overflow:hidden;">
                    <canvas class="worldicon" data-url="/img/worlds/Mardia.png" data-scale="10" style="margin-right:5px;position:absolute;right:-20px;top:-20px;opacity:0.5;" data-toggle="tooltip" data-placement="bottom" title="Market" width="80" height="80"></canvas>
                    <p class="flow-text">MyBckn</p>
                    <p><b><span id="mybckn"></span></b> Items Listed</p>
                </div>
                </a>
              </div>
            </div>
        </div>
        <div class="col s12 m4">
            <div class="card horizontal">
              <div class="card-stacked">
                <a href="/grazed">
                <div class="card-content grey darken-4 white-text" style="position:relative;overflow:hidden;">
                    <canvas class="worldicon" data-url="/img/worlds/Demethos.png" data-scale="10" style="margin-right:5px;position:absolute;right:-20px;top:-20px;opacity:0.5;" data-toggle="tooltip" data-placement="bottom" title="Market" width="80" height="80"></canvas>
                    <p class="flow-text">Grazed</p>
                    <p><b><span id="grazed"></span></b> Items Listed</p>
                </div>
                </a>
              </div>
            </div>
        </div>
    </div>
    </div>
        </div>
      </div>

      <script src="/js/app.js"></script>
      <script src="/js/crrio.core.js"></script>
      <script src="/js/codepeg.pixelPerfect.js"></script>
      <script>
      $( document ).ready(function(){
        getCount();
        $(".button-collapse").sideNav();
        $('.modal').modal();
      });

      var pixelPerfect = new CodePeg.PixelPerfect(
          $('.worldicon'), {
              urlTag: 'url', // The name of the data tag for the url
              scaleTag: 'scale', // The data tag for the image's scale factor
              filter: 'nearestneighbor', // The image scaling filter to apply. string or function
          }
      );
      </script>
      @section('js')
      @show
      <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
              (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
              m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-46623827-1', 'maple.fm');
          ga('send', 'pageview');
      </script>
    </body>
</html>