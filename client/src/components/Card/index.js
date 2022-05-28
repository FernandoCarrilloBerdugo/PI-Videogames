import React from "react";
import { Link } from "react-router-dom";
import img from "./default.jpg";
import "./index.css";

const Card = (props) => {
	return (
		<div className="videogame">
			<Link to={`/videogame/${props.id}`}>
				<h3 className="card-name">{props.name}</h3>
				<img className="card-image" src={props.image ? props.image : img} alt={props.name} />
				<div className="card-genres">
					{props.genres &&
						props.genres.map((genre) => (
							<ul className="card-genrelist" key={props.id + Math.random()}>{genre}</ul>
						))}
				</div>
			</Link>
		</div>
	);
};

export default Card;
