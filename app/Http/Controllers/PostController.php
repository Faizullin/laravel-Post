<?php

namespace App\Http\Controllers;

use App\Http\Filters\PostFilter;
use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\Category\CategoryMinResource;
use App\Http\Resources\Post\EditPostResource;
use App\Http\Resources\Post\IndexPostResource;
use App\Http\Resources\Post\ShowPostResource;
use App\Http\Resources\Tag\TagMinResource;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(PostFilter $filter)
    {
        $posts = (new Post)->newQuery();
        $posts->filter($filter);
        $appliedFilters = $filter->getAppliedFilters();
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

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Post/Create', [
            'tags' => TagMinResource::collection(Tag::all()),
            'categories' => CategoryMinResource::collection(Category::all()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorePostRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePostRequest $request)
    {

        $data = $request->validated();
        $user = Auth::user();
        try {
            DB::beginTransaction();
            $data['category_id']=$data['category'];
            $data['user_id']=$user->id;

            $post_tags = isset($data['tags']) ? $data['tags'] : [];
            unset($data['category'],$data['user'],$data['tags']);
            if ($request->hasFile('image_path')) {
                $data['image_path'] = $request->file('image_path')->store('img', 'public');
            }
            $post = Post::create($data);
            $post->tags()->attach($post_tags);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }

        return redirect()->route("post.edit",$post)->with([
            'type' => 'success',
            'message' => 'Post has been created',
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(PostFilter $filter, Post $post)
    {
        $post->loadCount(['commentsWithReplies','likers']);
        $post->load(['tags','category','user']);
        $appliedFilters = $filter->getAppliedFilters();
        $appliedFilters['filters']['tags'] = $post->tags->map(function($tag) {
            return $tag->slug;
        });
        $appliedFilters['filters']['category'] = $post->category->slug;

        $recentPosts = Post::latest()->with(['category','tags','user'])->take(6)->get();
        return Inertia::render('Post/Show', [
            'tags' => TagMinResource::collection(Tag::withCount('posts')->get(),),
            'categories' => CategoryMinResource::collection(Category::withCount('posts')->get(),),
            'post' => new ShowPostResource($post),
            'recentPosts' => IndexPostResource::collection($recentPosts),
            'appliedFilters' => $appliedFilters,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
        $post->loadCount(['commentsWithReplies','likers']);
        $post->load(['tags','category','user']);
        return Inertia::render('Post/Edit', [
            'tags' => TagMinResource::collection(Tag::all()),
            'categories' => CategoryMinResource::collection(Category::all()),
            'post' => new EditPostResource($post),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePostRequest  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        $data = $request->validated();
        $user = Auth::user();
        try {
            DB::beginTransaction();
            $data['category_id']=$data['category'];
            $data['user_id']=$user->id;

            $post_tags = isset($data['tags']) ? $data['tags'] : [];
            if ($request->hasFile('image_path')) {

                $data['image_path'] = $request->file('image_path')->store('img','public');
                $image_disk = Storage::disk('public');

                if ($post->image_path && $image_disk->exists($post->image_path)) {
                    $image_disk->delete($post->image_path);
                }
            } else {
                unset($data['image_path']);
            }

            unset($data['category'],$data['user'],$data['tags']);
            $post->update($data);
            $post->tags()->sync($post_tags);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }

        return back()->with([
            'type' => 'success',
            'message' => 'Post has been updated',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        try {
            DB::beginTransaction();
            $image_disk = Storage::disk('public');
            if($post->image_path && $image_disk->exists($post->image_path)){
                $image_disk->delete($post->image_path);
            }
            $post->delete();
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
        return redirect()->route('dashboard.post.index')->with([
            'type' => 'success',
            'message' => 'Post has been deleted',
        ]);
    }
}
