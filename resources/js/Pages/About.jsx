import Herobar from "@/Components/Herobar";
import Layout from "@/Layouts/Layout";
import Img1 from "../../img/about1.jpg";
import Img2 from "../../img/about2.jpg";
import { CheckCircleIcon } from "@heroicons/react/24/solid";



export default function About(){


    return (
        <Layout>
            <Herobar />
            <section id="about" className="about">
                <div className="container mx-auto sm:px-4" data-aos="fade-up">
                    <div className="section-header">
                    <h2>About Us</h2>
                    <p>Aperiam dolorum et et wuia molestias qui eveniet numquam nihil porro incidunt dolores placeat sunt id nobis omnis tiledo stran delop</p>
                    </div>

                    <div className="flex flex-wrap  gy-4">
                    <div className="lg:w-1/2 pr-4 pl-4">
                        <h3>Voluptatem dignissimos provident quasi corporis</h3>
                        <img src={Img1}
                            className="max-w-full h-auto rounded-lg object-cover mb-4" alt=""/>
                        <p>Ut fugiat ut sunt quia veniam. Voluptate perferendis perspiciatis quod nisi et. Placeat debitis quia recusandae odit et consequatur voluptatem. Dignissimos pariatur consectetur fugiat voluptas ea.</p>
                        <p>Temporibus nihil enim deserunt sed ea. Provident sit expedita aut cupiditate nihil vitae quo officia vel. Blanditiis eligendi possimus et in cum. Quidem eos ut sint rem veniam qui. Ut ut repellendus nobis tempore doloribus debitis explicabo similique sit. Accusantium sed ut omnis beatae neque deleniti repellendus.</p>
                    </div>
                    <div className="lg:w-1/2 pr-4 pl-4">
                        <div className="content ps-0 lg:ps-12">
                            <p className="fst-italic mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                magna aliqua.
                            </p>
                            <ul className="mb-4">
                                <li>
                                    <i>
                                        <CheckCircleIcon className="w-6 h-6"/>
                                    </i> Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </li>
                                <li>
                                    <i>
                                        <CheckCircleIcon className="w-6 h-6"/>
                                    </i> Duis aute irure dolor in reprehenderit in voluptate velit.
                                </li>
                                <li>
                                    <i>
                                        <CheckCircleIcon className="w-6 h-6"/>
                                    </i> Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.
                                </li>
                            </ul>
                            <p className="mb-4">
                                Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident
                            </p>
                            <img src={Img2}
                                className="max-w-full h-auto rounded-lg object-cover mb-4" alt=""/>

                        </div>
                    </div>
                    </div>

                </div>
            </section>
        </Layout>
    )
}
