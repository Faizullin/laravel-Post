<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'title'=>$this->faker->unique()->name,
            'description'=>$this->faker->sentence,
            'body'=>$this->faker->text,
            'user_id'=>\App\Models\User::all()->random()->id,
            'category_id'=>\App\Models\Category::all()->random()->id
        ];
    }
}
