

export default function Herobar(){
    return (
        <section id="hero" className="hero">
            <div className="container mx-auto sm:px-4 relative">
            <div className="flex flex-wrap  gy-5" data-aos="fade-in">
                <div className="lg:w-1/2 pr-4 pl-4 order-2 lg:order-1 flex flex-col justify-center text-center text-lg-start">
                <h2>Welcome to <span>Impact</span></h2>
                <p>Sed autem laudantium dolores. Voluptatem itaque ea consequatur eveniet. Eum quas beatae cumque eum quaerat.</p>
                <div className="flex justify-center lg:justify-start">
                    <a href="#about" className="btn-get-started">Get Started</a>
                    <a href="https://www.youtube.com/watch?v=LXb3EKWsInQ" className="glightbox btn-watch-video flex items-center"><i className="bi bi-play-circle"></i><span>Watch Video</span></a>
                </div>
                </div>
                <div className="lg:w-1/2 pr-4 pl-4 order-1 lg:order-2">
                <img src="/img/hero-img.svg" className="max-w-full h-auto" alt="" data-aos="zoom-out" data-aos-delay="100"/>
                </div>
            </div>
            </div>

            <div className="icon-boxes relative">
            <div className="container mx-auto sm:px-4 relative">
                <div className="flex flex-wrap  gy-4 mt-5">

                <div className="xl:w-1/4 pr-4 pl-4 md:w-1/2 pr-4 pl-4" data-aos="fade-up" data-aos-delay="100">
                    <div className="icon-box">
                    <div className="icon"><i className="bi bi-easel"></i></div>
                    <h4 className="title"><a href="" className="stretched-link">Lorem Ipsum</a></h4>
                    </div>
                </div>

                <div className="xl:w-1/4 pr-4 pl-4 md:w-1/2 pr-4 pl-4" data-aos="fade-up" data-aos-delay="200">
                    <div className="icon-box">
                    <div className="icon"><i className="bi bi-gem"></i></div>
                    <h4 className="title"><a href="" className="stretched-link">Sed ut perspiciatis</a></h4>
                    </div>
                </div>

                <div className="xl:w-1/4 pr-4 pl-4 md:w-1/2 pr-4 pl-4" data-aos="fade-up" data-aos-delay="300">
                    <div className="icon-box">
                    <div className="icon"><i className="bi bi-geo-alt"></i></div>
                    <h4 className="title"><a href="" className="stretched-link">Magni Dolores</a></h4>
                    </div>
                </div>

                <div className="xl:w-1/4 pr-4 pl-4 md:w-1/2 pr-4 pl-4" data-aos="fade-up" data-aos-delay="500">
                    <div className="icon-box">
                    <div className="icon"><i className="bi bi-command"></i></div>
                    <h4 className="title"><a href="" className="stretched-link">Nemo Enim</a></h4>
                    </div>
                </div>

                </div>
            </div>
            </div>
        </section>
    )
}
