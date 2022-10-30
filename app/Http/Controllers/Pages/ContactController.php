<?php

namespace App\Http\Controllers\Pages;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactRequest;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
        $data = $request->validate([
            'name' => ['required','string','max:50'],
            'email' => ['required','email','max:50'],
            'message' => ['required','email','max:500'],
        ]);
        //  Store data in database
        Contact::create($data);
        //  Send mail to admin
        // \Mail::send('mail', array(
        //     'name' => $data['name'],
        //     'email' => $data['email'],
        //     'subject' => $data['subject'],
        //     'message' => $data['message'],
        // ), function($message) use ($request){
        //     $message->from($data['email']);
        //     $message->to('digambersingh126@gmail.com', 'Admin')->subject($data['subject']);
        // });

        return back()->with([
            'success' => 'We have received your message and would like to thank you for writing to us.'
        ]);
    }
}
