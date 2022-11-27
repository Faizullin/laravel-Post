<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Filters\Admin\ContactFilter;
use App\Http\Requests\Admin\StoreContactRequest;
use App\Http\Requests\Admin\UpdateContactRequest;
use App\Http\Resources\Admin\Contact\EditContactResource;
use App\Http\Resources\Admin\Contact\IndexContactResource;
use App\Models\Contact;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ContactController extends Controller
{

    public function __construct()
    {
        $this->middleware('can:contact list', ['only' => ['index', 'show']]);
        $this->middleware('can:contact create', ['only' => ['create', 'store']]);
        $this->middleware('can:contact edit', ['only' => ['edit', 'update']]);
        $this->middleware('can:contact delete', ['only' => ['destroy']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(ContactFilter $filter)
    {
        $contacts = (new Contact)->newQuery();
        $contacts->filter($filter);
        $contacts = $contacts->paginate(2)->onEachSide(2)->appends(request()->query());
        return Inertia::render('Contact/Index', [
            'contacts' => IndexContactResource ::collection($contacts),
            'can' => [
                'create' => Auth::user()->can('contact create'),
                'edit' => Auth::user()->can('contact edit'),
                'delete' => Auth::user()->can('contact delete'),
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

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreContactRequest $request)
    {
        $data = $request->validated();

        try {
            DB::beginTransaction();
            $contact = Contact::create($data);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }

        return back()->with([
            'type' => 'success',
            'message' => 'Contact has been created',
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function show(Contact $contact)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function edit(Contact $contact)
    {
        return [
            "contact"=> new EditContactResource($contact),
        ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateContactRequest $request, Contact $contact)
    {
        $data = $request->validated();

        try {
            DB::beginTransaction();
            $contact->update($data);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function destroy(Contact $contact)
    {
        try {
            DB::beginTransaction();
            $contact->delete();
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
        return back()->with([
            'type' => 'success',
            'message' => 'Contact has been deleted',
        ]);
    }
}
