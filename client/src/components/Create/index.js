import React, { useEffect, useState } from "react";
import { validDate } from "./regexp";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { createVideogame, getGenres, getPlatforms } from "../../redux/actions";
import Loading from "../Loading";

const Create = () => {
	const [data, setData] = useState({
		name: "",
		description: "",
		released: "",
		rating: 0,
		genres: [],
		platforms: [],
	});

	const [error, setError] = useState({
		name: "",
		description: "",
		released: "",
		rating: "",
		genres: "",
		platforms: "",
	});

	const dispatch = useDispatch();

	const games = useSelector((state) => state);

	useEffect(() => {
		async function fetchdata() {
			await dispatch(getGenres());
			dispatch(getPlatforms());
		}
		if (!games.genres.length) fetchdata();
	}, [dispatch, games]);

	function validateName(e) {
		if (e.target.value.trim() === "") {
			setError({
				...error,
				[e.target.name]: "Cannot be empty",
			});
		} else if (e.target.value.length >= 200) {
			setError({
				...error,
				[e.target.name]: "Whoa there cowboy, too many letters",
			});
		} else {
			setError({
				...error,
				[e.target.name]: "",
			});
			setData({
				...data,
				[e.target.name]: e.target.value,
			});
		}
	}
	function validateDate(e) {
		if (validDate(e.target.value)) {
			setError({
				...error,
				[e.target.name]: "",
			});
			setData({
				...data,
				[e.target.name]: e.target.value,
			});
		} else {
			setData({
				...data,
				[e.target.name]: "",
			});
			setError({
				...error,
				[e.target.name]: "Date is not valid",
			});
		}
	}

	//Debería validar la descripción?
	function validateDescription(e) {
		if (e.target.value.trim() === "") {
			setError({
				...error,
				[e.target.name]: "Cannot be empty",
			});
		} else {
			setError({
				...error,
				[e.target.name]: "",
			});
			setData({
				...data,
				[e.target.name]: e.target.value,
			});
		}
	}

	function validateRating(e) {
		if (e.target.value < 1 || e.target.value > 5) {
			setError({
				...error,
				[e.target.name]: "Rating must be a value between 1-5",
			});
		} else {
			setError({
				...error,
				[e.target.name]: "",
			});
			setData({
				...data,
				[e.target.name]: e.target.value,
			});
		}
	}

	function handleGenres(e) {
		let updateGenres = [...data.genres];
		if (e.target.checked) {
			updateGenres.push(e.target.value);
		} else {
			updateGenres = updateGenres.filter((genres) => genres !== e.target.value);
		}
		setData({
			...data,
			[e.target.name]: updateGenres,
		});
	}

	function handlePlatforms(e) {
		let updatePlatforms = [...data.platforms];
		if (e.target.checked) {
			updatePlatforms.push(e.target.value);
		} else {
			updatePlatforms = updatePlatforms.filter(
				(platform) => platform !== e.target.value
			);
		}
		setData({
			...data,
			[e.target.name]: updatePlatforms,
		});
	}

	function handleSubmit(e) {
		e.preventDefault();
		let i = 0;
		if (data.name === "") i++;
		if (data.description === "") i++;
		if (data.released === "") i++;
		if (data.rating === 0) i++;
		if (data.genres.length < 1) i++;
		if (data.platforms.length < 1) i++;
		for (const err in error) {
			if (error[err] !== "") i++;
		}
		if (i > 0) alert("verify fields");
		else {
			dispatch(createVideogame(data));
		}
	}

	return (
		//poner error e input en un solo div?
		<div className="create-container">
			{!games.genres.length && !games.genres.length ? (
				<>
					<Loading />
				</>
			) : (
				<>
					Please fill all fields
					<form onSubmit={handleSubmit}>
						<div className="error-container">
							{error.name && <span>{error.name}</span>}
						</div>
						<div className="input-container">
							<label>
								name: <input type="text" name="name" onChange={validateName} />
							</label>
						</div>
						<div className="error-container">
							{error.released && <span>{error.released}</span>}
						</div>
						<div className="input-container">
							<label>
								Date released:{" "}
								<input type="date" name="released" onChange={validateDate} />
							</label>
						</div>
						<div className="error-container">
							{error.rating && <span>{error.rating}</span>}
						</div>
						<div className="input-container">
							<label>
								Rating:{" "}
								<input
									type="number"
									step={0.01}
									max={5}
									min={1}
									name="rating"
									onChange={validateRating}
								/>
							</label>
						</div>
						<div className="error-container">
							{error.description && <span>{error.description}</span>}
						</div>
						<div className="input-container">
							<label>
								Description:{" "}
								<textarea
									type="text"
									name="description"
									onChange={validateDescription}
								/>
							</label>
						</div>
						<div className="Genres-container">
							<h2>Select the genres that apply</h2>
							{games.genres.length &&
								games.genres.map((genres) => (
									<div key={genres}>
										<input
											type="checkbox"
											name="genres"
											value={genres}
											onChange={handleGenres}
										/>
										<span>{genres}</span>
									</div>
								))}
						</div>
						<div className="Platforms-container">
							<h2>Select the platforms that apply</h2>
							{games.platforms.length &&
								games.platforms.map((platform) => (
									<div key={platform}>
										<input
											type="checkbox"
											name="platforms"
											value={platform}
											onChange={handlePlatforms}
										/>
										<span>{platform}</span>
									</div>
								))}
						</div>
						<button type="submit">Enviar</button>
					</form>
				</>
			)}
		</div>
	);
};

export default Create;
