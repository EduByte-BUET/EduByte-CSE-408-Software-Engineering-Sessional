import "../../css/Search/SearchPage.css";
import React, { useState } from "react";
import api from "../../api/GeneralAPI";
import SearchResultCard from "./SearchResultCard";

const SearchPage = () => {
	const [searchKeyword, setSearchKeyword] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	const handleSearch = async () => {
		try {
			// Make an API call to fetch search results using the searchKeyword
			const response = await api.get(
				`/courses/search?keyword=${searchKeyword}`
			);
			console.log(response.data);
			setSearchResults(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			console.log("Enter key pressed");
			handleSearch();
		}
	};

	return (
		<div className="container">
			<div className="row mt-4" style={{ textAlign: "left" }}>
				<h1 className="search-heading">Search</h1>
			</div>
			<div className="row" style={{ marginBottom: "20px" }}>
				<input
					type="text"
					value={searchKeyword}
					onChange={(e) => setSearchKeyword(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Enter course preference..."
					style={{
						marginRight: "10px",
						borderLeft: "2px solid black",
						borderRight: "2px solid black",
					}}
				/>
			</div>
			<div className="row">
				{searchResults.length > 0 && (
					<h4 className="search-heading" style={{ textAlign: "left" }}>
						Results
					</h4>
				)}
			</div>
			<div className="row">
				<div className="col-md-1"></div>
				<div className="col-md-11">
					{searchResults.length > 0 ? (
						<>
							<SearchResultCard courses={searchResults} />
						</>
					) : (
						<p>No search results found.</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default SearchPage;
