import React, { useEffect, useState } from "react";
import { validDate } from "./regexp";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { getGenres, getPlatforms } from "../../redux/actions";

const Create = () => {
	const [data, setData] = useState({
		name: "",
		description: "",
		released: "",
		rating: 0,
		genre: [],
		platforms: [],
	});

	const [error, setError] = useState({});

	const dispatch = useDispatch();

	const games = useSelector(state => state)

	useEffect(()=>{
		async function fetchdata(){
		await dispatch(getGenres())
	  dispatch(getPlatforms())
		}
		console.log(games.genres.length)
		if(!games.genres.length) fetchdata()
	},[dispatch, games])

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
		if(e.target.value.trim() === "") {
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
		if(e.target.value < 0 || e.target.value > 5) {
			setError({
				...error,
				[e.target.name]: "Rating must be a value between 0-5",
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
		let updateGenres = [...data.genre]
		if(e.target.checked) {
			updateGenres.push(e.target.value)
		} else {
			updateGenres = updateGenres.filter(genre => genre !== e.target.value)
		}
		setData({
			...data,
			[e.target.name]: updateGenres
		})
	}

	function handlePlatforms(e) {
		let updatePlatforms = [...data.platforms]
		if(e.target.checked) {
			updatePlatforms.push(e.target.value)
		} else {
			updatePlatforms = updatePlatforms.filter(platform => platform !== e.target.value)
		}
		setData({
			...data,
			[e.target.name]: updatePlatforms
		})
	}

	return (
		//poner error e input en un solo div?
		<div className="create-container">
			Please fill all fields
			<form>
				<div className="error-container">
					{error.name && <span>{error.name}</span>}
				</div>
				<div className="input-container">
					<label>
						name:{" "}
						<input type="text" name="name" onChange={(e) => validateName(e)} />
					</label>
				</div>
				<div className="error-container">
					{error.released && <span>{error.released}</span>}
				</div>
				<div className="input-container">
					<label>
						Date released:{" "}
						<input
							type="date"
							name="released"
							onChange={(e) => validateDate(e)}
						/>
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
							min={0}
							name="rating"
							onChange={(e) => validateRating(e)}
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
							onChange={(e) => validateDescription(e)}
						/>
					</label>
				</div>
				<div className="Genres-container">
					<h2>Select the genres that apply</h2>
					{games.genres.length && games.genres.map(genre => (
						<div key={genre}><input type="checkbox" name="genre" value={genre} onChange={handleGenres}/><span>{genre}</span></div>
					))}
				</div>
				<div className="Platforms-container">
					<h2>Select the platforms that apply</h2>
					{games.platforms.length && games.platforms.map(platform => (
						<div key={platform}><input type="checkbox" name="platforms" value={platform} onChange={handlePlatforms}/><span>{platform}</span></div>
					))}
				</div>
			</form>
		</div>
	);
};

export default Create;
