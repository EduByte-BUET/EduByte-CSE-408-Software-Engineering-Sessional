import React, { useEffect, useState } from "react";
import api from "../../api/GeneralAPI";

export default function Category() {
	const [category, setCategory] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await api.get("/courses/top_categories");
			setCategory(response.data);
		};

		fetchData();
	}, []);

	return (
		<>
			<section className="categories-area pt-100 pb-170">
				<div className="container" spellCheck>
					<div className="row">
						<div className="col-xl-8 col-lg-10 mx-auto">
							<div className="section-title text-center">
								<h2 className="wow fadeInUp" data-wow-delay=".2s">
									Top Catagories
								</h2>
								<p className="wow fadeInUp" data-wow-delay=".4s"></p>
							</div>
						</div>
					</div>
					<div className="row">
						{category.map((cat: any) => (
							<>
								<div className="col-md-4">
									<div
										className="category-wrapper"
										style={{
											cursor: "pointer",
											border: "3px solid #f1f1f1",
											maxHeight: "500px", // Adjust the maximum height as needed
											overflowY: "auto",
										}}
									>
										<div className="single-category">
											<i className="lni lni-pallet"></i>
											<h3>{cat.category}</h3>
											<div style={{ marginTop: 50 }}>
												<p>
													<b>Description: </b>
													{cat.description}
												</p>
												<p>
													<b>Available courses on this category</b>
													<h4>{cat.count}</h4>
												</p>
											</div>
										</div>
									</div>
								</div>
							</>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
