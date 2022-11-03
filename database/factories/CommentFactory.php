<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'message'=>$this->faker->sentence,
            'user_id'=>\App\Models\User::all()->random()->id,
            'commentable_id'=>\App\Models\Post::all()->random()->id,
            'commentable_type'=>"App\Models\Post",
            'parent_id'=>null,
        ];
    }
    public function withParent()
    {
        return $this->state(function ($attributes) {
            $random_comment = \App\Models\Comment::whereNull('parent_id',null)->get()->random();
            return [
                'message'=>$this->faker->sentence,
                'user_id'=>\App\Models\User::all()->random()->id,
                'commentable_id'=>$random_comment->post->id,
                'commentable_type'=>"App\Models\Post",
                'parent_id'=>$random_comment->id,
            ];
        });
    }
}
