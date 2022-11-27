<?php

namespace App\Http\Controllers\Pages;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactRequest;
use App\Mail\ContactMail;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Mail;

class ContactController extends Controller
{
    /**

     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Contact');
    }



    public function store(StoreContactRequest $request)
    {
        $data = $request->validated();
        try {
            DB::beginTransaction();
            $contact = Contact::create($data);
            Mail::to(config("mail.reply_to.address"))->queue(new ContactMail($contact));
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }



        // \Mail::send('emails.contact.index', array(
        //     'name' => $data['name'],
        //     'email' => $data['email'],
        //     'subject' => $data['subject'],
        //     'message' => $data['message'],
        // ), function($message) use ($data){
        //     $message->from($data['email']);
        //     $message->to("admin@mail.ru", 'Admin')->subject($data['subject']);
        // });

        return back()->with([
            'success' => 'We have received your message and would like to thank you for writing to us.'
        ]);
    }
}
