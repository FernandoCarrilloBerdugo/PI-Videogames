import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearPage, getVideogameDetail } from "../../redux/actions";
import "./index.css";

const Detail = () => {
	const { id } = useParams();

	const dispatch = useDispatch();

	const game = useSelector((state) => state.videogameDetail);

	useEffect(() => {
		dispatch(getVideogameDetail(id));

		return () => {
			dispatch(clearPage());
		};
	}, [dispatch, id]);

	return (
		<div className="detail-container">
			{console.log(game)}
			<h2>Title: {game.name}</h2>
      <img className="game-image" src={game.image} alt={game.name} />
			{game.genres.length &&
				game.genres.map((genre, i) => (
					<ul key={i}>
						<h3>{genre}</h3>
					</ul>
				))}
		</div>
	);
};

export default Detail;
