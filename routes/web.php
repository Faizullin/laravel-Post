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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('pages.home');

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
});


Route::group([
    'namespace' => 'App\Http\Controllers',
],function(){
    Route::get("profile",function(){
        return Inertia::render('Profile');
    })->name('profile');

    Route::get("about",\Pages\AboutController::class)->name('pages.about');
    Route::group(['prefix' => 'contact','controller'=>"Pages\ContactController"],function(){
        Route::get("/",'index')->name("pages.contact.index");
        Route::post("/",'store')->name("pages.contact.store");
    });

    Route::resource('post', 'PostController');
    Route::get('posts', 'PostController@index');
    Route::get('post/category/{category:slug}', 'CategoryController')->name('post.category.index');
    Route::get('search', 'SearchController')->name('post.search');
    Route::get("/test",function(){
        return Inertia::render('Test');
    })->name('test');
});
