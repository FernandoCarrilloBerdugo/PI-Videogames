import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../../redux/actions";
import Card from "../Card";
import './index.css'

const Home = () => {
	const dispatch = useDispatch();

	let games = useSelector((state) => state);

	useEffect(() => {
		!games.videogames.length && dispatch(getVideogames());
		console.log(games);
	});

	return (
		<div className="home-container">
			<h1>Videogames</h1>
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
		</div>
	);
};

export default Home;
