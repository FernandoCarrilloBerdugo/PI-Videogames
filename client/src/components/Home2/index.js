import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
	clearPage,
	getGenres,
	getPlatforms,
	getVideogames,
	paging,
	sort,
} from "../../redux/actions";
import Card from "../Card";
import FilterByGenre from "../Filters";
import Loading from "../Loading";
import Paging from "../Paging";
import SearchBar from "../SearchBar";
import Sort from "../Sort";
import "../Home/index.css";

export default function Home() {
	const dispatch = useDispatch();

	const games = useSelector((state) => state);

	const { search } = useLocation();

	useEffect(() => {});

	useEffect(() => {
		!games.genres.length && dispatch(getGenres());
		!games.platforms.length && dispatch(getPlatforms());
		!games.videogames.length && dispatch(getVideogames());
		games.videogames.length && !games.paging.length && dispatch(paging(1));
		games.videogames.length && dispatch(sort("Rating"));
		// eslint-disable-next-line
	}, [games.videogames]);

	useEffect(() => {
		games.search.length && dispatch(paging(1));
		return () => {
			games.search.length && dispatch(clearPage());
			search && dispatch(paging(1));
			search && dispatch(sort("Rating"))
		};
		// eslint-disable-next-line
	}, [games.search, search]);

	return (
		<div className="home-container">
			{!games.paging.length && games.filtered === "" ? (
				<Loading />
			) : (
				<>
					<SearchBar />
					<FilterByGenre />
					<Sort />
					<Paging />
					<div className="cards-container">
						{games.paging.length ? (
							games.paging.map((game) => (
								<Card
									key={game.id}
									id={game.id}
									name={game.name}
									image={game.image}
									genres={game.genres}
								/>
							))
						) : (
							<h2>No games match with the parameters selected</h2>
						)}
					</div>
				</>
			)}
		</div>
	);
}
