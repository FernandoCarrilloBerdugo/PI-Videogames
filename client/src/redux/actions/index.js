import {
	GET_VIDEOGAMES,
	GET_VIDEOGAME_DETAIL,
	GET_GENRES,
	CREATE_VIDEOGAME,
	CLEAR_PAGE,
	FILTER,
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

export function createVideogame(input) {
	return async (dispatch) => {
		const { data } = await axios.post("/videogame", input);
		dispatch({ type: CREATE_VIDEOGAME, payload: data });
	};
}

export function clearPage() {
	return { type: CLEAR_PAGE };
}
