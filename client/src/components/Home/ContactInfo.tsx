import React from 'react';

export default function ContactInfo() {
  return (
    <>
    <section id="contact" className="contact-area">
		<div className="map-bg">
			<img src="assets/images/map-bg.svg" alt=""/>
		</div>
		<div className="container">
			<div className="row">
				<div className="col-xl-5 col-lg-5">
					<div className="section-title">
						<h2 className="wow fadeInUp" data-wow-delay=".2s">Get In Touch</h2>
						<p className="wow fadeInUp" data-wow-delay=".4s"></p>
					</div>
					<div className="contact-content">
						<h3>Hot Line Call Us 24/7</h3>
						<h4><a href="javascript:void(0)">000-2222-5555</a></h4>
						<h4><a href="javascript:void(0)">EduByte.01@gmail.com</a></h4>
					</div>
				</div>
				<div className="col-xl-7 col-lg-7">
					<div className="contact-form-wrapper">
						<form action="assets/contact.php">
							<div className="row">
								<div className="col-md-6">
									<input type="text" placeholder="Name" name="name" id="name"/>
								</div>
								<div className="col-md-6">
									<input type="email" placeholder="Email" name="email" id="email"/>
								</div>
							</div>
							<div className="row">
								<div className="col-12">
									<input type="text" placeholder="Subject" name="subject" id="subject"/>
								</div>
							</div>
							<div className="row">
								<div className="col-12">
									<textarea name="message" id="message" rows={4} placeholder="Message"></textarea>
								</div>
							</div>
							<div className="row">
								<div className="col-12 text-right">
									<button className="main-btn btn-hover" type="submit">Send</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</section>
      
    </>
  );
}
