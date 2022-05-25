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
			{console.log(game.length)}
			<div className="detail-name">
			<h2 className="game-name">Name: {game.name}</h2>
			</div>
			<div className="released-rating">
				<span className="released-rating-span"><b>Released:  </b>{game.released}</span>
				<span className="released-rating-span"><b>Rating:  </b>{game.rating}</span>
			</div>
			<div>
				<img className="game-image" src={game.image} alt={game.name} />
			</div>
			<div className="genres">
				<span><b>Genres: </b></span>
				{(game.length || game.genres) &&
					game.genres.map((genre, i) => (
						<ul className="genre-li" key={genre + i}>
							<p>{genre}</p>
						</ul>
					))}
			</div>
			<div className="description" dangerouslySetInnerHTML={{ __html:game.description}}></div>
			<div className="platforms">
				<div className="platforms-title">
					<h2>Platforms: </h2>
				</div>
				<div className="platforms-list">
					{(game.length || game.platforms) &&
						game.platforms.map((platform, i) => (
							<li className="platforms-list-li" key={platform + i}>
								{platform}
							</li>
						))}
				</div>
			</div>
		</div>
	);
};

export default Detail;
