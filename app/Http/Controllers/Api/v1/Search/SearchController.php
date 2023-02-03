<?php

namespace App\Http\Controllers\Api\v1\Search;

use App\Http\Controllers\Controller;
use App\Http\Requests\Search\SearchRequest;
use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function __invoke(SearchRequest $request)
    {
        $keyword = $request->validated()['keyword'];
        $maxNumber = 5;
        $posts = Post::where('title','LIKE','%'.$keyword."%")->orderBy('updated_at','DESC');
        $tags = [];
        $postNumber = $posts->count();
        if($postNumber < $maxNumber){
            $tags = Tag::where('title','LIKE','%'.$keyword."%")->take($maxNumber-$postNumber)->get();
            $posts = $posts->take($postNumber)->get();
        }else{
            $posts = $posts->take($maxNumber)->get();
        }
        return response()->json([
            'tags'=>$tags,
            'posts'=>$posts,
        ]);
    }
}
