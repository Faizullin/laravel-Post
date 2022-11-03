

export default function Footer() {


	return (
		<footer id="footer" className="footer">
			<div className="container mx-auto sm:px-4">
			  <div className="flex flex-wrap  gy-4">
			    <div className="lg:w-2/5 pr-4 pl-4 md:w-full pr-4 pl-4 footer-info">
			      <a href="index.html" className="logo flex items-center">
			        <span>Impact</span>
			      </a>
			      <p>Cras fermentum odio eu feugiat lide par naso tierra. Justo eget nada terra videa magna derita valies darta donna mare fermentum iaculis eu non diam phasellus.</p>
			      <div className="social-links flex mt-4">
			        <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
			        <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
			        <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
			        <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
			      </div>
			    </div>

			    <div className="lg:w-1/5 pr-4 pl-4 w-1/2 footer-links">
			      <h4>Useful Links</h4>
			      <ul>
			        <li><a href="#">Home</a></li>
			        <li><a href="#">About us</a></li>
			        <li><a href="#">Services</a></li>
			        <li><a href="#">Terms of service</a></li>
			        <li><a href="#">Privacy policy</a></li>
			      </ul>
			    </div>

			    <div className="lg:w-1/5 pr-4 pl-4 w-1/2 footer-links">
			      <h4>Our Services</h4>
			      <ul>
			        <li><a href="#">Web Design</a></li>
			        <li><a href="#">Web Development</a></li>
			        <li><a href="#">Product Management</a></li>
			        <li><a href="#">Marketing</a></li>
			        <li><a href="#">Graphic Design</a></li>
			      </ul>
			    </div>

			    <div className="lg:w-1/4 pr-4 pl-4 md:w-full pr-4 pl-4 footer-contact text-center text-md-start">
			      <h4>Contact Us</h4>
			      <p>
			        A108 Adam Street <br/>
			        New York, NY 535022<br/>
			        United States <br/><br/>
			        <strong>Phone:</strong> +1 5589 55488 55<br/>
			        <strong>Email:</strong> info@example.com<br/>
			      </p>

			    </div>

			  </div>
			</div>

			<div className="container mx-auto sm:px-4 mt-4">
				<div className="copyright">
					&copy; Copyright <strong><span>Impact</span></strong>. All Rights Reserved
				</div>
				<div className="credits">
					Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
					</div>
				</div>
		</footer>
	);
}
