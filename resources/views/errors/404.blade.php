@extends('layouts.master')

@section('title')
Page Not Found
@endsection

@section('nav-title')
404
@endsection

@section('full')
    <body>
        <div class="center">
            <div class="title m-b-md">
                <b>Oops!</b> An error occured.<br/>
                <small style="font-size:30px;margin:0px;padding:0px;">The page or content you requested was not found.</small>
            </div>

            <div class="links">
            </div>
        </div>
    </body>
</html>
@endsection

@section('css')
<style>
    html, body {
        background: #c0c0aa; /* fallback for old browsers */
        background: -webkit-linear-gradient(to left, #c0c0aa , #1ce) !important; /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to left, #c0c0aa , #1ce) !important; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        color: #FFF !important;
        height: 100vh;
        margin: 0;
    }

    .title {
        font-size: 84px;
        line-height: 70px;
        font-weight: 200;
        margin-top: 80px;
    }

    .links > a {
        color: #FFF;
        padding: 0 25px;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: .1rem;
        text-decoration: none;
        text-transform: uppercase;
    }

    .m-b-md {
        margin-bottom: 30px;
    }
</style>
@endsection