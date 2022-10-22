<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory()->create([
            'name' => 'super-admin',
            'email' => 'super-admin@example.com',
            "password"=>Hash::make("12344321"),
        ]);
        \App\Models\User::factory(10)->create();
    }
}
