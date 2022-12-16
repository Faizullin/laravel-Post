<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Filters\Admin\TagFilter;
use App\Http\Requests\Admin\StoreTagRequest;
use App\Http\Requests\Admin\UpdateTagRequest;
use App\Http\Resources\Admin\Tag\EditTagResource;
use App\Http\Resources\Admin\Tag\IndexTagResource;
use App\Models\Tag;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TagController extends Controller
{

    public function __construct()
    {
        $this->middleware('can:tag list', ['only' => ['index', 'show']]);
        $this->middleware('can:tag create', ['only' => ['create', 'store']]);
        $this->middleware('can:tag edit', ['only' => ['edit', 'update']]);
        $this->middleware('can:tag delete', ['only' => ['destroy']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(TagFilter $filter)
    {
        $tags = (new Tag)->newQuery();
        $tags->filter($filter);
        if (array_key_exists('per_page',$filter->input) && in_array($filter->input['per_page'],['1','10','20','50'])) {
            $tags = $tags->paginate($filter->input['per_page'])->onEachSide(2)->appends(request()->query());
        } else {
            $tags = $tags->paginate(1)->onEachSide(2)->appends(request()->query());
        }
        return Inertia::render('Tag/Index', [
            'tags' => IndexTagResource ::collection($tags),
            'can' => [
                'create' => Auth::user()->can('tag create'),
                'edit' => Auth::user()->can('tag edit'),
                'delete' => Auth::user()->can('tag delete'),
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
        return Inertia::render('Tag/Index', [
            'editTag' => $tag,
            'activeForm' => 'create',
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTagRequest $request)
    {
        $data = $request->validated();

        try {
            DB::beginTransaction();
            $tag = Tag::create($data);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }

        return back()->with([
            'type' => 'success',
            'message' => 'Tag has been created',
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function show(Tag $tag)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function edit(Tag $tag)
    {
        return [
            "tag"=> new EditTagResource($tag),
        ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTagRequest $request, Tag $tag)
    {
        $data = $request->validated();

        try {
            DB::beginTransaction();
            $tag->update($data);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tag $tag)
    {
        try {
            DB::beginTransaction();
            $tag->delete();
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
        return back()->with([
            'type' => 'success',
            'message' => 'Tag has been deleted',
        ]);
    }
}
