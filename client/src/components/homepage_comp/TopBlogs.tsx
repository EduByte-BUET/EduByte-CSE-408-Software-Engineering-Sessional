import React from 'react';

export default function TopBlogs() {
  return (
    <>
    
<section id="blog" className="blog-area pt-170 pb-140">
		<div className="container">
			<div className="row">
				<div className="col-xl-6 col-lg-7">
					<div className="section-title">
						<h2 className="wow fadeInUp" data-wow-delay=".2s">From The Blog</h2>
						<p className="wow fadeInUp" data-wow-delay=".4s">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt utlabo</p>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-xl-4 col-lg-4 col-md-6">
					<div className="single-blog">
						<div className="blog-img">
							<a href="javascript:void(0)" className="d-block">
								<img src="assets/images/blog/blog-1.jpg" alt=""/>
							</a>
						</div>
						<div className="blog-content">
							<h4><a href="javascript:void(0)">Modern website design
							tools</a></h4>
							<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed diam.</p>
						</div>
					</div>
				</div>
				<div className="col-xl-4 col-lg-4 col-md-6">
					<div className="single-blog">
						<div className="blog-img">
							<a href="javascript:void(0)" className="d-block">
								<img src="assets/images/blog/blog-2.jpg" alt=""/>
							</a>
						</div>
						<div className="blog-content">
							<h4><a href="javascript:void(0)">How To install SSL</a></h4>
							<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed diam.</p>
						</div>
					</div>
				</div>
				<div className="col-xl-4 col-lg-4 col-md-6">
					<div className="single-blog">
						<div className="blog-img">
							<a href="javascript:void(0)" className="d-block">
								<img src="assets/images/blog/blog-3.jpg" alt=""/>
							</a>
						</div>
						<div className="blog-content">
							<h4><a href="javascript:void(0)">Getting started with Figma</a></h4>
							<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed diam.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

      
    </>
  );
}
