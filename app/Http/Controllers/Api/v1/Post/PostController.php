<?php

namespace App\Http\Controllers\Api\v1\Post;

use App\Http\Controllers\Controller;
use App\Http\Filters\Api\v1\PostFilter;
use App\Http\Requests\StorePostRequest;
use App\Http\Resources\Post\IndexPostResource;
use App\Http\Resources\Post\ShowPostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

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
        $posts->withCount('commentsWithReplies');
        $posts->with(['category','tags','user']);
        $appliedFilters = $filter->getAppliedFilters();
        if (array_key_exists('per_page', $appliedFilters) && in_array($appliedFilters['per_page'],['1','6','20','50'])) {
            $posts = $posts->paginate($appliedFilters['per_page'])->appends(request()->query());
        } else {
            $posts = $posts->paginate(6)->appends(request()->query());
        }
        return response()->json(IndexPostResource::collection($posts));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title'=>['required','string','min:3','max:150','unique:posts,title'],
            'description'=>['required','string','max:255'],
            'body'=>['required','string'],
            'category'=>['required','integer','exists:categories,id'],
            'tags'=>['nullable','array'],
            'tag.*'=>['integer','exists:tags,id'],
            'image_path'=>['nullable','image','mimes:jpeg,jpg,png,gif,svg','max:2048'],
        ]);
        if ($validator->fails()) {
            $errors = $validator->errors();
            return response()->json(['errors' => $errors], 422);
        }
        $data = $validator->validated();
        $user = Auth::guard('sanctum')->user();
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

        return response()->json([
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
        $post->loadCount(['commentsWithReplies','likers']);
        $post->load(['tags','category','user']);
        return response()->json(new ShowPostResource($post));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        //
    }
}
