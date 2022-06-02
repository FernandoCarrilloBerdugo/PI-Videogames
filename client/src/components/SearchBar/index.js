import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import {
	clearFilter,
	clearPage,
	clearSearch,
	searchGames,
} from "../../redux/actions";
import './index.css'

export default function SearchBar() {
	const [name, setName] = useState("");

	const dispatch = useDispatch();

	const history = useHistory();

	const location = useLocation();

	const handleChange = (e) => {
		setName(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (name === "") {
			alert("type a game in the box");
		} else {
			history.replace({ pathname: location.pathname, search: name });
			dispatch(clearFilter());
			dispatch(clearSearch());
			dispatch(clearPage());
			dispatch(searchGames(name));
			setName("");
		}
	};

	return (
		<div className="searchbar-container">
			<form onSubmit={handleSubmit}>
				<input className="search-input" value={name} onChange={handleChange}/>
				<button style={{"borderRadius":"10px"}}>
					{" "}
					Search
				</button>
			</form>
		</div>
	);
}
