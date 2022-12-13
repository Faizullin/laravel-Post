<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Search\SearchRequest;
use App\Http\Resources\Category\CategoryMinResource;
use App\Http\Resources\Post\IndexPostResource;
use App\Http\Resources\Tag\TagMinResource;
use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(SearchRequest $request,)
    {
        $keyword = $request->validated()['keyword'];
        $posts = Post::where('title','LIKE','%'.$keyword."%")->orderBy('updated_at','DESC')->paginate(5);
        return Inertia::render('Post/Index', [
            'tags' => TagMinResource::collection(Tag::all()),
            'categories' => CategoryMinResource::collection(Category::all()),
            'posts' => IndexPostResource::collection($posts),
            'filters' => [],
        ]);
    }
}
