<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Filters\PostFilter;
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
    public function __invoke(SearchRequest $request, PostFilter $filter)
    {
        $data = $request->validated();
        $posts = (new Post)->newQuery();
        $keyword = isset($data['keyword']) ? $data['keyword'] : null;
        if(!is_null($keyword)) {
            $posts = $posts->where('title','LIKE','%'.$data['keyword']."%");
        }
        $posts->filter($filter);
        $appliedFilters = $filter->getAppliedFilters();
        if(!is_null($keyword)) {
            $appliedFilters['filters']['search'] = $keyword;
        }
        $posts->withCount('comments');
        $posts = $posts->paginate(6)->appends(request()->query());
        return Inertia::render('Post/Index', [
            'tags' => TagMinResource::collection(Tag::all()),
            'categories' => CategoryMinResource::collection(Category::all()),
            'recentPosts' => IndexPostResource::collection(Post::latest()->take(6)->get()),
            'posts' => IndexPostResource::collection($posts),
            'appliedFilters' => $appliedFilters,
        ]);
    }
}
