import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { clearFilter, clearSearch, searchGames } from "../../redux/actions";

export default function SearchBar() {
	const [name, setName] = useState("");

	// const searchList = useSelector(state=>state.search)

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
			dispatch(clearFilter())
			dispatch(clearSearch())
			dispatch(searchGames(name));
			setName("")
		}
	};
	
	
	return (
		<form onSubmit={handleSubmit}>
			Search: <input value={name} onChange={handleChange} />
			<button type="submit">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="#000"
				>
					<path
						fillRule="evenodd"
						d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
						clipRule="evenodd"
					/>
				</svg>
			</button>
		</form>
	);
}
