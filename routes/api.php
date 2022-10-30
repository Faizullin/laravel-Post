<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['namespace'=>'App\Http\Controllers\Api\Admin','as'=>'api.admin.','prefix'=>'admin'],function(){
    Route::resource('permission','PermissionController');
});
Route::group(['namespace'=>'App\Http\Controllers\Api','as'=>'api.',],function(){
    Route::get('search', \Search\SearchController::class)->name('search');
});


