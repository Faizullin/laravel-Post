<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Filters\Admin\RoleFilter;
use App\Http\Resources\Admin\Role\EditRoleResource;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:role list', ['only' => ['index', 'show']]);
        $this->middleware('can:role create', ['only' => ['create', 'store']]);
        $this->middleware('can:role edit', ['only' => ['edit', 'update']]);
        $this->middleware('can:role delete', ['only' => ['destroy']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request,RoleFilter $filter)
    {
        $roles = (new Role)->newQuery();
        $roles->filter($filter);
        $roles = $roles->paginate(2)->onEachSide(2)->appends(request()->query());
        return Inertia::render('Role/Index', [
            'roles' => $roles,
            'permissions'=>Permission::all(),
            'can' => [
                'create' => Auth::user()->can('role create'),
                'edit' => Auth::user()->can('role edit'),
                'delete' => Auth::user()->can('role delete'),
            ],
            'filters' => $filter->getFilters(),
        ]);
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
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'max:50','unique:roles,name'],
            'guard_name' => ['required', 'max:50'],
            'permissions' => ['array'],
            'permissions.*' => ['integer','exists:permissions,id'],
        ]);

        $data['guard_name'] = 'web';

        DB::beginTransaction();
        try {
            $role_permissions = $data['permissions'];
            unset($data['permissions']);
            $role = Role::create(
                $data
            );
            $role->givePermissionTo($role_permissions);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
            //abort(500,$e);
        }

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function show(Role $role)
    {
        return $this->authorise('members.view');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function edit(Role $role)
    {
        return [
            "role"=> new EditRoleResource($role),
        ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Role $role)
    {
        $data = $request->validate([
            'name' => ['required', 'max:50','unique:roles,name,'.$role->id],
            'guard_name' => ['required', 'max:50' ],
            'permissions' => ['array'],
            'permissions.*' => ['integer','exists:permissions,id'],
        ]);

        $data['guard_name'] = "web";

        try {
            DB::beginTransaction();
            $role_permissions = $data['permissions'];
            unset($data['permissions']);
            $role->update($data);
            $role->syncPermissions($role_permissions);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
            //abort(500,$e);
        }

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function destroy(Role $role)
    {
        try {
            DB::beginTransaction();
            $role->delete();
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
            //abort(500,$e);
        }
        return redirect()->back();
    }
}
