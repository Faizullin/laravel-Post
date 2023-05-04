<?php

namespace App\Http\Controllers;

use App\Http\Filters\Dashboard\CommentFilter;
use App\Http\Filters\Dashboard\PostFilter;
use App\Http\Resources\Comment\IndexCommentDashboardResource;
use App\Http\Resources\Post\IndexPostResource;
use App\Http\Resources\User\IndexUserDashboardResource;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{

    public function index()
    {
        return Inertia::render('Dashboard/Index', [
            'user' => new IndexUserDashboardResource(Auth::user()),
        ]);
    }

    public function post(Request $request, PostFilter $filter)
    {
        $user = $request->user();
        $posts = Post::query();//$user->posts();

        $posts->filter($filter);
        $posts->withCount('comments');
        $posts->with(['category','tags','user']);
        $appliedFilters = $filter->getAppliedFilters();
        if (array_key_exists('per_page', $appliedFilters) && in_array($appliedFilters['per_page'],['1','10','20','50'])) {
            $posts = $posts->paginate($appliedFilters['per_page'])->appends(request()->query());
        } else {
            $posts = $posts->paginate(1)->appends(request()->query());
        }

        return Inertia::render('Dashboard/Post/Index', [
            'posts' => IndexPostResource::collection($posts),
            'user' => new IndexUserDashboardResource($user),
            'appliedFilters' => $appliedFilters,
        ]);
    }

    public function comment(CommentFilter $filter)
    {
        $user = Auth::user();
        $comments = $user->comments();
        $comments->filter($filter);
        $comments->with(['user','post']);
        $appliedFilters = $filter->getAppliedFilters();
        if (array_key_exists('per_page', $appliedFilters) && in_array($appliedFilters['per_page'],['1','10','20','50'])) {
            $comments = $comments->paginate($appliedFilters['per_page'])->appends(request()->query());
        } else {
            $comments = $comments->paginate(1)->appends(request()->query());
        }
        return Inertia::render('Dashboard/Comment/Index', [
            'comments' => IndexCommentDashboardResource::collection($comments),
            'user' => new IndexUserDashboardResource($user),
            'appliedFilters' => $appliedFilters,
        ]);
    }

    public function favouritePost(PostFilter $filter)
    {

        $user = Auth::user();
        $posts = $user->likedPosts();
        $posts->filter($filter);
        $posts->withCount('comments');
        $posts->with(['category','tags','user']);
        $appliedFilters = $filter->getAppliedFilters();
        if (array_key_exists('per_page', $appliedFilters) && in_array($appliedFilters['per_page'],['1','10','20','50'])) {
            $posts = $posts->paginate($appliedFilters['per_page'])->onEachSide(1)->appends(request()->query());
        } else {
            $posts = $posts->paginate(1)->onEachSide(1)->appends(request()->query());
        }
        return Inertia::render('Dashboard/FavouritePost/Index', [
            'posts' => IndexPostResource::collection($posts),
            'user' => new IndexUserDashboardResource($user),
            'appliedFilters' => $appliedFilters,
        ]);
    }
}
