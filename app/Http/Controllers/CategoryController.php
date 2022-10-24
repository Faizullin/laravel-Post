<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Category $category)
    {
        $posts = $category->posts()->paginate(config('var.post_pagination'));
        return Inertia::render('Post/Index',[
            'tags' => Tag::all(),
            'categories' => Category::all(),
            'posts' => $posts,
        ]);
    }
}
