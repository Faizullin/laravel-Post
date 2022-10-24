<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:post list', ['only' => ['index', 'show']]);
        $this->middleware('can:post create', ['only' => ['create', 'store']]);
        $this->middleware('can:post edit', ['only' => ['edit', 'update']]);
        $this->middleware('can:post delete', ['only' => ['destroy']]);
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(PostFilter $filter)
    {
        $posts = (new Post)->newQuery();
        $posts->filter($filter);
        $posts = $posts->paginate(100)->onEachSide(2)->appends(request()->query());
        return Inertia::render('Post/Index', [
            'items' => IndexPostResource::collection($posts),
            'can' => [
                'create' => Auth::hasRole('super-admin') ?? Auth::user()->can('post create'),
                'edit' => Auth::user()->can('post edit'),
                'delete' => Auth::user()->can('post delete'),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(P)
    {
        return Inertia::render('Post/Create', [
            'tags' => TagMinResource::collection(Tag::all()),
            'categories' => CategoryMinResource::collection(Category::all()),
            'can' => [
                'create' => Auth::hasRole('super-admin') ?? Auth::user()->can('post create'),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
        return Inertia::render('Post/Create', [
            'post' => EditPostResource::collection($post),
            'tags' => TagMinResource::collection(Tag::all()),
            'categories' => CategoryMinResource::collection(Category::all()),
            'can' => [
                'edit' => Auth::hasRole('super-admin') ?? Auth::user()->can('post edit'),
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        //
    }
}
