<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Search\SearchRequest;
use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(SearchRequest $request)
    {
        $keyword = $request->validated()['keyword'];
        $posts = Post::where('title','LIKE','%'.$keyword."%")->orderBy('updated_at','DESC')->paginate(5);
        $categories = Category::all();
        $tags = Tag::all();
        return view('post.index',compact('posts','categories','tags'));
    }
}
