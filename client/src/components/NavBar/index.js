import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearSearch, paging } from "../../redux/actions";
import "./index.css";

const NavBar = () => {
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(clearSearch());
		dispatch(paging(1));
	};

	return (
		<ul className="navbar">
			<Link className="link" to="/">
				<li className="navbar-element">Landing</li>
			</Link>
			<Link onClick={handleClick} className="link" to="/videogames">
				<li className="navbar-element">Home</li>
			</Link>
			<Link className="link" to="/create/videogame">
				<li className="navbar-element">Create a Game</li>
			</Link>
		</ul>
	);
};

export default NavBar;
