import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { clearFilter, clearPage, getVideogames, searchGames } from "../../redux/actions";
import Card from "../Card";
import FilterByGenre from "../Filters";
import Loading from "../Loading";
import SearchBar from "../SearchBar";
import "./index.css";

const Home = () => {
	const dispatch = useDispatch();

	const { search } = useLocation();

	let games = useSelector((state) => state);

	useEffect(() => {
		if(!games.videogames.legth) dispatch(getVideogames())
		if(search) dispatch(searchGames(search))
		// eslint-disable-next-line
	}, [])
	
	useEffect(() => {
		return () =>{
			if(games.search.length) dispatch(clearPage())
			if(search === "") dispatch(clearFilter())
		}
		// eslint-disable-next-line
	},[search])
	
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
					<div>
						<FilterByGenre />
					</div>
					{search || games.search.length ? (
						<div className="cards-container">
								{
									games.filtered && games.search 
									? (games.filtered.map(game => 
										(<Card 
											key={game.id}
											id={game.id}
											name={game.name}
											image={game.image}
											genres={game.genres}
											/>)
										)) : games.search.map(game => (
											<Card 
											key={game.id}
											id={game.id}
											name={game.name}
											image={game.image}
											genres={game.genres}
											/>
										))
								}
						</div>
					) : (
						<div className="cards-container">
							{games.filtered !== ""
								? (!games.filtered.length && (
										<h2>No games of this genre in the database</h2>
								  )) ||
								  games.filtered.map((game) => (
										<Card
											key={game.id}
											id={game.id}
											name={game.name}
											image={game.image}
											genres={game.genres}
										/>
								  ))
								: games.videogames.map((game) => (
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
