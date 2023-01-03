import Layout from "@/Layouts/Layout";
import { useForm } from "@inertiajs/inertia-react";


export default function Contact(){
    const {data,setData,errors,post,reset} = useForm({
        name:"",
        email:"",
        subject:"",
        message:"",
    });
    const handleChange = (e) => setData({...data,[e.target.name]:e.target.value});
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('pages.contact.store'),{
            data,
            onSuccess: () => {
                reset()
            }
        });
    }
    return (
        <Layout>
            <section id="contact" className="contact">
                <div className="container mx-auto sm:px-4" data-aos="fade-up">
                    <div className="section-header">
                        <h2>Contact</h2>
                        <p>Nulla dolorum nulla nesciunt rerum facere sed ut inventore quam porro nihil id ratione ea sunt quis dolorem dolore earum</p>
                    </div>

                    <div className="flex flex-wrap  gx-lg-0 gy-4">
                        <div className="lg:w-1/3 pl-4">
                            <div className="info-container flex flex-col items-center justify-center">
                                <div className="info-item flex">
                                    <i className="flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                        </svg>
                                    </i>
                                    <div>
                                    <h4>Location:</h4>
                                    <p>U38 D25, Astana(Kazakhstan), 010000</p>
                                    </div>
                                </div>

                                <div className="info-item flex">
                                    <i className="flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                        </svg>
                                    </i>
                                    <div>
                                    <h4>Email:</h4>
                                    <p>admin@example.com</p>
                                    </div>
                                </div>

                                <div className="info-item flex">
                                    <i className="flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                        </svg>
                                    </i>
                                    <div>
                                    <h4>Call:</h4>
                                    <p>+7 777 777 77 77</p>
                                    </div>
                                </div>

                                <div className="info-item flex">
                                    <i className="flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </i>
                                    <div>
                                        <h4>Open Hours:</h4>
                                        <p>Mon-Sat: 11AM - 23PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-2/3 pr-4 md:mt-0 mt-6">
                            <form action="forms/contact.php" className="php-email-form" onSubmit={handleSubmit}>
                                <div className="flex flex-wrap ">
                                    <div className="w-full md:w-1/2 md:pr-4">
                                        <input type="text" className="block appearance-none w-full py-1 px-2 text-base leading-normal bg-white text-gray-800 border border-gray-300 rounded"
                                            name="name" id="name" placeholder="Your Name" required
                                            value={data.name} onChange={handleChange} />
                                    </div>
                                    <div className="w-full md:w-1/2 md:pl-4 md:mt-0 mt-9">
                                        <input type="email" className="block appearance-none w-full py-1 px-2 text-base leading-normal bg-white text-gray-800 border border-gray-300 rounded"
                                            name="email" id="email" placeholder="Your Email" required
                                            value={data.email} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="md:mt-6 mt-9">
                                    <input type="text" className="block appearance-none w-full py-1 px-2 text-base leading-normal bg-white text-gray-800 border border-gray-300 rounded"
                                        name="subject" id="subject" placeholder="Subject" required
                                        value={data.subject} onChange={handleChange} />
                                </div>
                                <div className="md:mt-6 mt-9">
                                    <textarea className="block appearance-none w-full py-1 px-2 text-base leading-normal bg-white text-gray-800 border border-gray-300 rounded"
                                        name="message" rows="7" placeholder="Message" required
                                        value={data.message} onChange={handleChange} />
                                </div>
                                <div className="my-3">
                                    <div className="loading">Loading</div>
                                    <div className="error-message"></div>
                                    <div className="sent-message">Your message has been sent. Thank you!</div>
                                </div>
                                <div className="text-center md:mt-6 mt-9">
                                    <button type="submit">Send Message</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
