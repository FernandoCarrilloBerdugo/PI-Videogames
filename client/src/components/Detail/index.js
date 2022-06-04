import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearPage, getVideogameDetail } from "../../redux/actions";
import Loading from "../Loading";
import img from "./default.jpg";
import "./index.css";

const Detail = () => {
	const { id } = useParams();

	const dispatch = useDispatch();

	const game = useSelector((state) => state.videogameDetail);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		dispatch(getVideogameDetail(id));
		return () => {
			dispatch(clearPage());
		};
	}, [dispatch, id]);

	useEffect(() => {
		if(game.name) setLoading(false)
	},[game])

	return (
		<>
			{loading ? (
				<div>
					<Loading />
				</div>
			) : (
				<div className="detail-container">
					{console.log(game)}
					<div className="detail-name">
						<h2 className="game-name">Name: {game.name}</h2>
					</div>
					<div className="released-rating">
						<span className="released-rating-span">
							<b>Released: </b>
							{game.released}
						</span>
						<span className="released-rating-span">
							<b>Rating: </b>
							{game.rating}
						</span>
					</div>
					<div>
						<img className="game-image" src={game.image ? game.image : img} alt={game.name} />
					</div>
					<div className="genres">
						<span>
							<b>Genres: </b>
						</span>
						{(game.length || game.genres) &&
							game.genres.map((genre, i) => (
								<ul className="genre-li" key={genre + i}>
									<p>{genre}</p>
								</ul>
							))}
					</div>
					<h2>Description</h2>
					<div
						className="game-description"
						dangerouslySetInnerHTML={{ __html: game.description }}
					></div>
					<div className="platforms">
						<div className="platforms-title">
							<h2>Platforms</h2>
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
			)}
		</>
	);
};

export default Detail;
