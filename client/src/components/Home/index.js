import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../../redux/actions";
import Card from "../Card";
import Loading from "../Loading";
import "./index.css";

const Home = () => {
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(true)

	let games = useSelector((state) => state);

	useEffect(() => {
		!games.videogames.length && dispatch(getVideogames());
		if(games.videogames.length) setLoading(false)
		return () => {
			setLoading(!loading)
		}
		 // eslint-disable-next-line
	},[games.videogames]);

	return (
		<div className="home-container">
			{loading === false ? (
				<div className="cards-container">
					{games &&
						games.videogames.map((game) => (
							<Card
								key={game.id}
								id={game.id}
								name={game.name}
								image={game.image}
								genres={game.genres}
							/>
						))}
				</div>
			) : (
				<div><Loading /></div>
			)}
		</div>
	);
};

export default Home;
