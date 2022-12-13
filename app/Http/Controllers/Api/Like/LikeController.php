<?php

namespace App\Http\Controllers\Api\Like;

use App\Http\Controllers\Controller;
use App\Http\Resources\Like\LikedPostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{


    public function like(Request $request)
    {
        $data = $request->validate([
            'post'=>['required','exists:posts,id'],
        ]);
        $user = Auth::user();
        $post = Post::find($data['post']);

        $like = $user->toggleLike($post);

        if(is_null($like)) {
            return response()->json([
                'count'=> $post->likers()->count(),
                'type' => 'like',
                'status'=> false,
            ]);
        }
        return response()->json([
            'count'=> $post->likers()->count(),
            'type' => 'like',
            'status'=> true,
            'post_id' => $like->likeable_id,
        ]);
    }
}
