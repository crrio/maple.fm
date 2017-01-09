<?php
namespace Core;

use App\User;
use App\Invite;
use App\Log;
use App\Character;
use Illuminate\Support\Facades\Auth;
use GrahamCampbell\Markdown\Facades\Markdown;
use DB;
use GuzzleHttp\Client;

use Illuminate\Http\Request;
use Route;
use Cache;

class Core {

    /*public static function getMarketCounts() {

        if( Cache::has('marketCounts') ) {
            return Cache::get('marketCounts');
        } else {
            $api = new Client();
            $market = array();
            $servers = array("scania" => 0, "windia" => 1, "bera" => 2, "khroa" => 3, "mybckn" => 4, "grazed" => 5);
            foreach ($servers as $server => $key) {
                $response = $api->get('http://maplestory.io/api/server/'.$key.'/market/itemCount')->getBody()->getContents();
                $market["$server"] = $response;
            }
            Cache::put('marketCounts', $market, '1');
            return Cache::get('marketCounts');
        }

        $api = new Client();
        $market = array();
        $servers = array("scania" => 0, "windia" => 1, "bera" => 2, "khroa" => 3, "mybckn" => 4, "grazed" => 5);
        foreach ($servers as $server => $key) {
            $response = $api->get('http://maplestory.io/api/server/'.$key.'/market/itemCount')->getBody()->getContents();
            $market["$server"] = $response;
        }
        return $market;
    }

    public static function getMarketCount($serverId) {

        if( Cache::has('marketCount_'.$serverId) ) {
            return Cache::get('marketCount_'.$serverId);
        } else {
            $api = new Client();
            $response = $api->get('http://maplestory.io/api/server/'.$serverId.'/market/itemCount')->getBody()->getContents();
            Cache::put('marketCount_'.$serverId, $response, '1');
            return Cache::get('marketCount_'.$serverId);
        }
    }*/

    public static function message($text, $color) {
        $message = array();
        $message['text'] = $text;
        $message['color'] = $color;
        return $message;
    }

    public static function displayMessage($message) {
        if ($message['color'] != '') {
            echo "<div class='card-panel ".$message['color']." white-text' style='padding: 8px 20px;margin: 20px 0px 0px 0px;'>
            <p style='margin:0px;'>".$message['text']."</p>
            </div>";
        }
    }

    public static function error($title, $text) {
        $error = array();
        $error['title'] = $title;
        $error['text'] = $text;
        return $error;
    }

    public static function isActiveRoute($route, $output = 'active')
    {
        if (Route::currentRouteName() == $route) {
            return $output;
        }
    }

    //General Functions
    public static function convert($markdown) {
        return Markdown::convertToHtml($markdown);
    }

    public static function log($user_id, $action) {
        $log = new Log;
        $log->user_id = $user_id;
        $log->action = $action;
        $log->save();
    }

    /* User Functions
    /* Currently disabled until a user system is added.
    public static function userFunc() {
        //Functions and such to run on every request.
    }

    public static function getUsername($input) {
        $name = User::find($input)->username;
        return $name;
    }

    public static function getUserFromUsername($input) {
        $user = User::where('username',$input)->first();
        return $user;
    }

    public static function getName($input) {
        $name = User::find($input)->name;
        return $name;
    }

    public static function getUserPicture($input) {
        $name = User::find($input)->avatar;
        return $name;
    }*/
}
?>