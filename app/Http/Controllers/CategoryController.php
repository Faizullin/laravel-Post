<?php

namespace App\Http\Controllers;

use App\Http\Filters\PostFilter;
use App\Http\Resources\Category\CategoryMinResource;
use App\Http\Resources\Post\IndexPostResource;
use App\Http\Resources\Tag\TagMinResource;
use App\Models\Category;
use App\Models\Post;
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
    public function __invoke(PostFilter $filter, Category $category)
    {

        $posts = $category->posts();
        $posts->filter($filter);
        $posts = $posts->paginate(6);
        $appliedFilters = $filter->getAppliedFilters();
        $appliedFilters['filters']['category'] = $category->slug;

        return Inertia::render('Post/Index', [
            'tags' => TagMinResource::collection(Tag::all()),
            'categories' => CategoryMinResource::collection(Category::all()),
            'recentPosts' => IndexPostResource::collection(Post::latest()->take(6)->get()),
            'posts' => IndexPostResource::collection($posts),
            'appliedFilters' => $appliedFilters,
        ]);
    }
}
