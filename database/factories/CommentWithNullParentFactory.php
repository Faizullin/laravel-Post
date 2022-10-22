<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentWithNullParentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $random_comment = \App\Models\Comment::whereNull('parent_id',null)->get()->random()->id;
        return [
            'message'=>$this->faker->sentence,
            'user_id'=>\App\Models\User::all()->random()->id,
            'post_id'=>$random_comment->post->id,
            'parent_id'=>$random_comment->id,
        ];
    }
}
