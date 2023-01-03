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


Route::get('dashboard', function () {
    return Inertia::render('Dashboard/Index');
})->middleware(['auth', 'verified'])->name('dashboard.index');

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
    Route::get('dashboard',"DashboardController")->name('dashboard');
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

    Route::group( ['controller' => 'DashboardController'],function(){
        Route::get('dashboard','index')->name('dashboard.index')->middleware(["auth"]);
        Route::get('dashboard/post','post')->name('dashboard.post.index')->middleware(["auth"]);
        Route::get('dashboard/favourite-post','favouritePost')->name('dashboard.favouritePost.index')->middleware(["auth"]);
        Route::get('dashboard/comment','comment')->name('dashboard.comment.index')->middleware(["auth"]);
    });
    Route::group( ['controller' => 'ProfileController'],function(){
        Route::get('dashboard/profile/edit','edit')->name('dashboard.profile.edit')->middleware(["auth"]);
        Route::patch('dashboard/profile','update')->name('dashboard.profile.update')->middleware(["auth"]);
        Route::patch('dashboard/profilePassword','updatePassword')->name('dashboard.profile.updateProfile')->middleware(["auth"]);
    });

    Route::group(['prefix' => 'contact','controller'=>"Pages\ContactController"],function(){
        Route::get("/",'index')->name("pages.contact.index");
        Route::post("/",'store')->name("pages.contact.store");
    });

    Route::group(["prefix"=>"post","controller" => "PostController"],function(){
        Route::get("", "index")->name("post.index");
        Route::get("create", "create")->name("post.create")->middleware(["auth","can:create,".\App\Models\Post::class]);
        Route::get("{post}", "show")->name("post.show");
        Route::post("", "store")->name("post.store")->middleware(["auth","can:create,".\App\Models\Post::class]);
        Route::get("{post}/edit", "edit")->name("post.edit")->middleware(["auth","can:update,post"]);
        Route::patch("{post}/edit", "update")->name("post.update")->middleware(["auth","can:update,post"]);;
        Route::delete("{post}", "destroy")->name("post.destroy")->middleware(["auth","can:delete,post"]);
    });
    Route::get('post/category/{category:slug}', 'CategoryController')->name('post.category.index');
    Route::get('post/tag/{tag:slug}', 'TagController')->name('post.tag.index');

    Route::match(array('GET', 'POST'),'search', 'SearchController')->name('post.search');

    Route::get("/test",function(){
        return Inertia::render('Test');
    })->name('test');
    Route::get("/test/login",function()
    {
        return inertia("Admin2/Pages/Auth/Login");
    });
});


