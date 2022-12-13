<?php

namespace Tests\Feature;

use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LikeControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_example()
    {

        $user = User::find(1);
        $post = Post::find(1);
        // $user = User::find(1);
        //$post = Post::find(1);
        $res1 = $user->toggleLike($post);

        printf("Data".var_dump([$res1,$user->likes()->count()]));
        //$res =
        //print($res);
        //$response = $this->get('/');
        //$response->assertStatus(200);
    }
}
