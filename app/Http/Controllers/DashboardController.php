<?php

namespace App\Http\Controllers;

use App\Http\Filters\PostFilter;
use App\Http\Resources\Comment\IndexCommentResource;
use App\Http\Resources\Post\IndexPostResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class DashboardController extends Controller
{

    public function index()
    {
        return Inertia::render('Dashboard/Index', [
            'user' => Auth::user(),
        ]);
    }

    public function post(Request $request, PostFilter $filter)
    {
        $posts = Auth::user()->posts();
        $posts->filter($filter);
        if ($request->has("per_page")) {
            $posts = $posts->paginate($request->input("per_page"))->onEachSide(2)->appends(request()->query());
        } else {
            $posts = $posts->paginate(2)->onEachSide(2)->appends(request()->query());
        }


        return Inertia::render('Dashboard/Post/Index', [
            'posts' => IndexPostResource::collection($posts),
            'user' => Auth::user(),
        ]);
    }

    public function comment(Request $request)
    {
        $comments = Auth::user()->comments();
        //$comments->filter($filter);
        if ($request->has("per_page")) {
            $comments = $comments->paginate($request->input("per_page"))->onEachSide(2)->appends(request()->query());
        } else {
            $comments = $comments->paginate(2)->onEachSide(2)->appends(request()->query());
        }


        return Inertia::render('Dashboard/Comment/Index', [
            'comments' => IndexCommentResource::collection($comments),
            'user' => Auth::user(),
        ]);
    }

    public function favouritePost()
    {
        $posts = Auth::user()->posts;
        return Inertia::render('Dashboard/Index', [
            'posts' => IndexPostResource::collection($posts),
            'user' => Auth::user(),
        ]);
    }
}
