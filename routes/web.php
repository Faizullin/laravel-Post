<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/auth.php';




Route::group([
    'namespace' => 'App\Http\Controllers\Admin',
    'prefix' => 'admin',
    'middleware' => ['auth'],
    'as'=>'admin.',
], function () {
    Route::get('/',function(){
        return redirect()->route('admin.dashboard');
    })->name("index");
    Route::get('dashboard',function(){
        return Inertia::render('Dashboard');
    })->name('dashboard');
    Route::group( ['controller' => 'ProfileController'],function(){
        Route::get('profile','index')->name('profile.index');
        Route::patch('profile','update')->name('profile.update');
        Route::patch('profilePassword','updatePassword')->name('profile.updateProfile');
    });

    Route::resource('user', 'UserController');
    Route::resource('role', 'RoleController');
    Route::resource('permission', 'PermissionController');
    Route::resource('post', 'PostController');
    Route::resource('category', 'CategoryController');
    Route::resource('tag', 'TagController');
    Route::resource('contact', 'ContactController');
});


Route::group([
    'namespace' => 'App\Http\Controllers',
],function(){
    Route::get('/', "PostController@index")->name('pages.home');
    Route::get("profile",function(){
        return Inertia::render('Profile');
    })->name('profile');
    Route::get("about",\Pages\AboutController::class)->name('pages.about');
    Route::group(['prefix' => 'contact','controller'=>"Pages\ContactController"],function(){
        Route::get("/",'index')->name("pages.contact.index");
        Route::post("/",'store')->name("pages.contact.store");
    });


    Route::group(["prefix"=>"post","controller" => "PostController"],function(){
        Route::get("", "index")->name("post.index");
        Route::get("create", "create")->name("post.create");
        Route::get("{post}", "show")->name("post.show");
        Route::post("", "store")->name("post.store");
        Route::get("{post}/edit", "edit")->name("post.edit");
        Route::patch("{post}/edit", "update")->name("post.update");
        Route::delete("{post}", "destroy")->name("post.destroy");
    });
    Route::get('post/category/{category:slug}', 'CategoryController')->name('post.category.index');
    Route::get('post/tag/{tag:slug}', 'TagController')->name('post.tag.index');

    Route::get('search', 'SearchController')->name('post.search');

    Route::group(["prefix" => 'comment','controller'=>"CommentController"],function(){
        Route::get("/",'index')->name("comment.index");
        Route::post("/add",'store')->name("comment.store");
        Route::post("/reply/add",'storeReply')->name("comment.reply.store");
    });
    Route::get("/test",function(){
        return Inertia::render('Test');
    })->name('test');
    Route::get("/test/login",function()
    {
        return inertia("Admin2/Pages/Auth/Login");
    });
});


