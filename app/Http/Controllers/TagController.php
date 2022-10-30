<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Tag $tag)
    {
        $posts = $tag->posts()->paginate(config('var.post_pagination'));
        return Inertia::render('Post/Index',[
            'tags' => Tag::all(),
            'categories' => Category::all(),
            'posts' => $posts,
        ]);
    }
}
