<?php

namespace App\Http\Controllers;

use Core\Core;

class StatisticsController extends Controller
{
    public function home() {
      return view('statistics.home');
    }
    public function item() {
      return view('statistics.item');
    }
}
