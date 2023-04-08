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


Route::group(['namespace'=>'App\Http\Controllers\Api\v1','as'=>'api.',],function(){
    Route::get('search', \Search\SearchController::class)->name('search');
    Route::group(['controller'=>\Like\LikeController::class],function(){
        Route::post("/like",'like')->name("like.store")->middleware(["auth"]);
    });
    Route::group(['prefix' => 'comment','controller'=>\Comment\CommentController::class],function(){
        Route::get("/",'index')->name("comment.index");
        Route::post("/add",'store')->name("comment.store")->middleware(["auth","can:create,".\App\Models\Comment::class]);
        Route::post("/reply/add",'storeReply')->name("comment.storeReply")->middleware(["auth","can:create,".\App\Models\Comment::class]);
        Route::patch("/{comment}",'update')->name("comment.update")->middleware(["auth","can:update,comment"]);
        Route::delete("/{comment}",'destroy')->name("comment.destroy")->middleware(["auth","can:delete,comment"]);
    });
    Route::group(['prefix' => 'post','controller'=>\Post\PostController::class],function(){
        Route::get("/",'index')->name("post.index");
        Route::get("/{post}",'show')->name("post.show");
        // Route::post("/add",'store')->name("post.store")->middleware(["auth","can:create,".\App\Models\Comment::class]);
    });
    Route::group(['controller'=>\Auth\AuthenticatedSessionController::class],function(){
        Route::post('login','store');
        Route::get('login','store');
    });
});


