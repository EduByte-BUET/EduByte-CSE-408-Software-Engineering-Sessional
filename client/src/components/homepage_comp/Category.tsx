import React from 'react';

export default function Category() {
  return (
    <>
    
    <section className="categories-area pt-170 pb-170" >
		<div className="container" spellCheck >
			<div className="row">
				<div className="col-xl-8 col-lg-10 mx-auto">
					<div className="section-title text-center">
						<h2 className="wow fadeInUp" data-wow-delay=".2s">Top Catagories</h2>
						<p className="wow fadeInUp" data-wow-delay=".4s"></p>
					</div>
				</div>
			</div>
			<div className="row mb-30">
				<div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
					<a href="#" className="d-block category-wrapper">
						<div className="single-category">
							<i className="lni lni-pallet"></i>
							<h3>Design</h3>
						</div>
					</a>
				</div>
				<div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
					<a href="#" className="d-block category-wrapper">
						<div className="single-category">
							<i className="lni lni-code-alt"></i>
							<h3>Development</h3>
						</div>
					</a>
				</div>
				<div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
					<a href="#" className="d-block category-wrapper">
						<div className="single-category">
							<i className="lni lni-target-customer"></i>
							<h3>Marketing</h3>
						</div>
					</a>
				</div>
				<div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
					<a href="#" className="d-block category-wrapper">
						<div className="single-category">
							<i className="lni lni-seo"></i>
							<h3>SEO</h3>
						</div>
					</a>
				</div>
				<div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
					<a href="#" className="d-block category-wrapper">
						<div className="single-category">
							<i className="lni lni-camera"></i>
							<h3>Photography</h3>
						</div>
					</a>
				</div>
				<div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
					<a href="#" className="d-block category-wrapper">
						<div className="single-category">
							<i className="lni lni-bar-chart"></i>
							<h3>Business</h3>
						</div>
					</a>
				</div>
				<div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
					<a href="#" className="d-block category-wrapper">
						<div className="single-category">
							<i className="lni lni-keyword-research"></i>
							<h3>Analysis</h3>
						</div>
					</a>
				</div>
				<div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
					<a href="#" className="d-block category-wrapper">
						<div className="single-category">
							<i className="lni lni-android"></i>
							<h3>IT & Software</h3>
						</div>
					</a>
				</div>
			</div>
			<div className="row">
				<div className="col-xl-12">
					<div className="view-all-btn text-center">
						<a href="#" className="main-btn">View All Course</a>
					</div>
				</div>
			</div>
		</div>
	</section>
      
    </>
  );
}
