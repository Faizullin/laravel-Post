<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Filters\Admin\UserFilter;
use App\Http\Requests\Admin\StoreUserRequest;
use App\Http\Requests\Admin\UpdateUserRequest;
use App\Http\Resources\Admin\Role\RoleMinResource;
use App\Http\Resources\Admin\User\EditUserResource;
use App\Http\Resources\Admin\User\IndexUserResource;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:user list', ['only' => ['index', 'show']]);
        $this->middleware('can:user create', ['only' => ['create', 'store']]);
        $this->middleware('can:user edit', ['only' => ['edit', 'update']]);
        $this->middleware('can:user delete', ['only' => ['destroy']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request,UserFilter $filter)
    {
        $users = (new User)->newQuery();
        $users->filter($filter);
        $users = $users->paginate(2)->onEachSide(2)->appends(request()->query());
        return Inertia::render('User/Index', [
            'users' => IndexUserResource::collection($users),
            'roles'=>RoleMinResource::collection(Role::all()),
            'can' => [
                'create' => Auth::user()->can('user create'),
                'edit' => Auth::user()->can('user edit'),
                'delete' => Auth::user()->can('user delete'),
            ],
            'filters' => $filter->getFilters(),
        ]);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();


        try {
            DB::beginTransaction();
            $user_roles = $data['roles'];
            unset($data['roles']);
            $user = User::create($data);
            $user->assignRole($user_roles);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
            //abort(500,$e);
        }

        return back()->with([
            'type' => 'success',
            'message' => 'User has been created',
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return $this->authorise('members.view');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        return [
            "user"=> new EditUserResource($user),
        ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();

        try {
            DB::beginTransaction();
            $user_roles = $data['roles'];
            unset($data['roles']);
            $user->update($data);
            $user->syncRoles($user_roles);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
            //abort(500,$e);
        }

        return back()->with([
            'type' => 'success',
            'message' => 'User has been updated',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        try {
            DB::beginTransaction();
            $user->delete();
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
            //abort(500,$e);
        }
        return back()->with([
            'type' => 'success',
            'message' => 'User has been deleted',
        ]);
    }
}
