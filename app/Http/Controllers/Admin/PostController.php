<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Filters\Admin\PostFilter;
use App\Http\Requests\Admin\StorePostRequest;
use App\Http\Requests\Admin\UpdatePostRequest;
use App\Http\Resources\Admin\Category\CategoryMinResource;
use App\Http\Resources\Admin\Post\EditPostResource;
use App\Http\Resources\Admin\Post\IndexPostResource;
use App\Http\Resources\Admin\Tag\TagMinResource;
use App\Http\Resources\Admin\User\UserMinResource;
use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
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
        $appliedFilters = $filter->getAppliedFilters();
        if (array_key_exists('per_page', $appliedFilters) && in_array($appliedFilters['per_page'],['1','10','20','50'])) {
            $posts = $posts->paginate($appliedFilters['per_page'])->appends(request()->query());
        } else {
            $posts = $posts->paginate(1)->appends(request()->query());
        }
        return Inertia::render('Post/Index', [
            'posts' => IndexPostResource::collection($posts),
            'can' => [
                'create' => Auth::user()->can('post create'),
                'edit' => Auth::user()->can('post edit'),
                'delete' => Auth::user()->can('post delete'),
            ],
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
            'users' => UserMinResource::collection(User::all()),
            'can' => [
                'create' => Auth::user()->can('post create'),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePostRequest $request)
    {
        $data = $request->validated();

        try {
            DB::beginTransaction();
            $data['category_id']=$data['category'];
            $data['user_id']=$data['user'];
            $post_tags = $data['tags'];
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

        return redirect()->route('admin.post.edit',$post)->with([
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
        return Inertia::render('Post/Edit', [
            'post' => new EditPostResource($post),
            'tags' => TagMinResource::collection(Tag::all()),
            'categories' => CategoryMinResource::collection(Category::all()),
            'users' => UserMinResource::collection(User::all()),
            'can' => [
                'create' => Auth::user()->can('post edit'),
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
    public function update(UpdatePostRequest $request, Post $post)
    {
        $data = $request->validated();
        $user = Auth::user();
        try {
            DB::beginTransaction();
            $data['category_id']=$data['category'];
            $data['user_id'] = $user->id;
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
        return redirect()->route('admin.post.index')->with([
            'type' => 'success',
            'message' => 'Post has been deleted',
        ]);
    }
}
