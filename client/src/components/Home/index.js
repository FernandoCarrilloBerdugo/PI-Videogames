import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { clearPage, getVideogames, searchGames } from "../../redux/actions";
import Card from "../Card";
import Loading from "../Loading";
import SearchBar from "../SearchBar";
import "./index.css";

const Home = () => {
	const dispatch = useDispatch();

	const { search } = useLocation();

	let games = useSelector((state) => state);

	useEffect(() => {
		console.log(search)
		if (search) dispatch(searchGames(search));
		else if (!games.videogames.length && !search) dispatch(getVideogames());
		return () => {
			dispatch(clearPage())
		};
		// eslint-disable-next-line
	}, [search]);

	return (
		<div className="home-container">
			{!games.videogames.length || (!games.search.length && search) ? (
				<div>
					<Loading />
				</div>
			) : (
				<div className="home-container">
					<div>
						<SearchBar />
					</div>
					{search ? (
						<div className="cards-container">
							{games.search.length &&
								games.search.map((game) => (
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
					)}
				</div>
			)}
		</div>
	);
};

export default Home;
