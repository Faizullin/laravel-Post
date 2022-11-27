<?php

namespace App\Http\Controllers\Api\Comment;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Http\Resources\Comment\IndexCommentResource;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = $request->validate([
            "post_id" => ["required","integer","exists:posts,id"],
        ]);
        $comments = Post::find($data["post_id"])->comments()->latest()->paginate(1)->appends($request->query());
        return IndexCommentResource::collection($comments);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCommentRequest $request)
    {
        $data = $request->validated();
        try{
            DB::beginTransaction();
            $comment = new Comment;
            $comment->message = $data["message"];
            $comment->user()->associate($request->user());
            $post = Post::find($data["post_id"]);
            $post->comments()->save($comment);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }

        return back()->with([
            'type' => 'success',
            'message' => 'Comment has been created',
        ]);
    }


    public function storeReply(StoreCommentRequest $request)
    {
        $data = $request->validated();
        try{
            DB::beginTransaction();
            $comment = new Comment();
            $comment->message = $data["message"];
            $comment->user()->associate($request->user());
            $comment->user_id = Auth::user()->id;
            $comment->parent_id = $data["parent_id"];
            $post = Post::find($data["post_id"]);
            $post->comments()->save($comment);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }

        return back()->with([
            'type' => 'success',
            'message' => 'Comment has been created',
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCommentRequest $request,Comment $comment)
    {
        $data = $request->validated();
        try{
            DB::beginTransaction();
            $comment->message = $data["message"];
            $comment->save();
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }

        return back()->with([
            'type' => 'success',
            'message' => 'Comment has been updated',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Comment $comment)
    {
        try{
            DB::beginTransaction();
            $comment->delete();
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }

        return response()->json([
            'type' => 'success',
            'message' => 'Comment has been deleted',
        ]);
    }
}
