import {
	GET_VIDEOGAMES,
	GET_VIDEOGAME_DETAIL,
	GET_GENRES,
	CREATE_VIDEOGAME,
	CLEAR_PAGE,
	GET_PLATFORMS,
	// FILTER,
} from "./actionTypes";
import axios from "axios";

export function getVideogames() {
	return async (dispatch) => {
		console.log("getting data from API");
		const { data } = await axios.get("http://localhost:3001/videogames");
		dispatch({ type: GET_VIDEOGAMES, payload: data });
	};
}

export function getVideogameDetail(id) {
	return async (dispatch) => {
		const { data } = await axios.get(`http://localhost:3001/videogame/${id}`);
		dispatch({ type: GET_VIDEOGAME_DETAIL, payload: data });
	};
}

export function getGenres() {
	return async (dispatch) => {
		const { data } = await axios.get("http://localhost:3001/genres");
		dispatch({ type: GET_GENRES, payload: data });
	};
}

export function getPlatforms() {
	return async (dispatch) => {
		const data = [
			"PC",
			"MacOS",
			"Linux",
			"PlayStation 4",
			"PlayStation 5",
			"PSP",
			"PS VITA",
			"Xbox Series S/X",
			"Xbox One",
			"Xbox 360",
			"Nintendo Switch",
			"Nintendo 3DS/2DS",
		];
		dispatch({ type: GET_PLATFORMS, payload: data });
	};
}

export function createVideogame(input) {
	return async (dispatch) => {
			const { data } = await axios.post("http://localhost:3001/videogame",input);
			if (data.name) {
				dispatch({ type: CREATE_VIDEOGAME, payload: data });
				window.alert("game was created succesfully")
			}
			else window.alert("Game with that name already exist in the database")
	};
}

export function clearPage() {
	return { type: CLEAR_PAGE };
}
