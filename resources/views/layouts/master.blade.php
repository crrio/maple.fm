@include('layouts/modules/header')
<main>
	<div class="container content">
		<div class="row">
			<div class="col s12">
				@if(env('NOTICE') != '')
				<div class="alert-dev white-text">
					{!! env('NOTICE') !!}
				</div>
				@endif
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
  </div>
</main>
@include('layouts/modules/footer')