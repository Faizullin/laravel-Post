<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class ProfileController extends Controller
{

    public function edit(Request $request)
    {
        $user = Auth::user();


        return Inertia::render("Dashboard/Profile/Index",[
            "user" => $user,
        ]);
    }


    public function update(Request $request)
    {
        $user = User::find(Auth::user()->id);
        $data = $request->validate([
            'name' => ['required', 'max:50','unique:users,name,'.$user->id],
            'email' => ['required', 'max:50','unique:users,email,'.$user->id ],
        ]);

        try {
            DB::beginTransaction();
            $user->update($data);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }

        return redirect()->back();
    }



    public function updatePassword(Request $request)
    {
        $data = $request->validate([
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'password_current' => ['required',  'current_password'],
        ]);
        $user = User::find(Auth::user()->id);

        try {
            DB::beginTransaction();
            $user->password = Hash::make($data['password']);
            $user->save();
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
        return redirect()->back();
    }

    public function destroy(User $user)
    {
        //
    }
}
