@include('layouts/modules/header')
<main>
  <div class="container content">
      <div class="row">
          <div class="col s12">
          @if(!empty($message))
            {{ \Core\Corsair::displayMessage($message) }}
          @endif
          @yield('full')
          </div>
          <div class="col s12 m8">
          @yield('content')
          </div>
          <div class="col s12 m4">
          @section('sidebar')

          @show
      </div>
    </div>
</main>
@include('layouts/modules/footer')