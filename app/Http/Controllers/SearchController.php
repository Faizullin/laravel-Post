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
        $posts->withCount('commentsWithReplies');
        $posts->with(['category','tags','user']);
        $posts = $posts->paginate(6)->appends(request()->query());

        $recentPosts = Post::latest()->with(['category','tags','user'])->take(6)->get();
        return Inertia::render('Post/Index', [
            'tags' => TagMinResource::collection(Tag::withCount('posts')->get(),),
            'categories' => CategoryMinResource::collection(Category::withCount('posts')->get(),),
            'recentPosts' => IndexPostResource::collection($recentPosts),
            'posts' => IndexPostResource::collection($posts),
            'appliedFilters' => $appliedFilters,
        ]);
    }
}
