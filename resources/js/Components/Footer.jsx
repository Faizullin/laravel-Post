import { Link } from "@inertiajs/inertia-react";
import { mdiFacebook, mdiInstagram, mdiLinkedin, mdiTwitter } from "@mdi/js";
import Icon from "@mdi/react";


export default function Footer() {


	return (
		<footer id="footer" className="footer">
			<div className="container mx-auto sm:px-4">
			  <div className="flex flex-wrap  gy-4">
			    <div className="lg:w-2/5 pr-4 pl-4 md:w-full pr-4 pl-4 footer-info">
                    <Link href={route(`pages.home`)} className="logo flex items-center">
                        <span>PostApp</span>
                    </Link>
                    <p>Cras fermentum odio eu feugiat lide par naso tierra. Justo eget nada terra videa magna derita valies darta donna mare fermentum iaculis eu non diam phasellus.</p>
                    <div className="social-links flex mt-4">
                        <Link href="#" className="twitter">
                            <Icon path={mdiTwitter}
                                size={1}
                                />
                        </Link>
                        <Link href="#" className="facebook">
                            <Icon path={mdiFacebook}
                                size={1}
                                />
                        </Link>
                        <Link href="#" className="instagram">
                            <Icon path={mdiInstagram}
                                size={1}
                                />
                        </Link>
                        <Link href="#" className="linkedin">
                            <Icon path={mdiLinkedin}
                                size={1}
                                />
                        </Link>
                    </div>
			    </div>

                <div className="mt-8 w-full lg:w-3/5 flex flex-wrap">
                    <div className="lg:w-1/4 pr-4 pl-4 w-1/2 footer-links">
                        <h4>Useful Links</h4>
                        <ul>
                            <li>
                                <Link href={route(`pages.home`)}>Home</Link>
                            </li>
                            <li>
                                <Link href={route(`pages.about`)}>About us</Link>
                            </li>
                            <li>
                                <Link href="#">Privacy policy</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="lg:w-1/4 pr-4 pl-4 w-1/2 footer-links">
                        <h4>Our Services</h4>
                        <ul>
                            <li>
                                <Link href={route(`post.create`)}>Create Post</Link>
                            </li>
                            <li>
                                <Link href={route(`post.index`)}>Posts</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="lg:w-1/2 pr-4 pl-4 w-full text-center md:text-start footer-contact">
                        <h4>Contact Us</h4>
                        <p>
                            U38 D25 <br/>
                            Astana, 010000<br/>
                            Kazakhstan <br/><br/>
                            <strong>Phone:</strong> +7 777 777 77 77<br/>
                            <strong>Email:</strong> admin@example.com<br/>
                        </p>
                    </div>

                </div>

			  </div>
			</div>

			<div className="container mx-auto sm:px-4 mt-4">
				<div className="copyright">
					&copy; Copyright <strong><span>PostApp</span></strong>. All Rights Reserved
				</div>
				<div className="credits">
					Designed by <a href="https://tailwindcss.com/">Tailwind</a>
					</div>
				</div>
		</footer>
	);
}
