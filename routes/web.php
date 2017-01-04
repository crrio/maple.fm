<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// General Routes
Route::get('/', 'Controller@front')->name('front');
Route::get('/about', 'Controller@about')->name('about');
Route::get('/statistics', 'Controller@statistics')->name('statistics');

// Market Routes
Route::pattern('server', '(scania)|(windia)|(bera)|(khroa)|(mybckn)' .
        '|(grazed)');

Route::get('/{server}', function($server) {
  $servers = array('scania' => 0, 'windia' => 1, 'bera' => 2, 'khroa' => 3, 'mybckn' => 4, 'grazed' => 5);
  $serverId = $servers[$server];
  $server = ucfirst($server);
  if ($serverId == 4 || $serverId == 5) {
      $server = strtoupper($server);
  }
  return view('market/search')
  ->with('server', $server)
  ->with('serverId', $serverId)
  ->with('curTime', time() * 1000);
});