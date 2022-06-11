import {
	GET_VIDEOGAMES,
	SEARCH_GAMES,
	GET_VIDEOGAME_DETAIL,
	GET_GENRES,
	CREATE_VIDEOGAME,
	CLEAR_PAGE,
	GET_PLATFORMS,
	FILTER,
	FILTER_SERVER,
	CLEAR_FILTER,
	FILTER_USER,
	SORT_AZ,
	SORT_ZA,
	SORT_RATING,
	PAGING,
	CLEAR_SEARCH,
} from "./actionTypes";
import axios from "axios";

export function getVideogames() {
	return async (dispatch) => {
		console.log("getting data from API");
		const { data } = await axios.get("http://localhost:3001/videogames");
		dispatch({ type: GET_VIDEOGAMES, payload: data });
	};
}

export function searchGames(query) {
	return async (dispatch) => {
		console.log("searching games in API");
		const { data } = await axios.get(
			`http://localhost:3001/videogames?name=${query}`
		);
		dispatch({ type: SEARCH_GAMES, payload: data });
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
		try {
			const { data } = await axios.post("http://localhost:3001/videogame", input);
			dispatch({ type: CREATE_VIDEOGAME, payload: data });
			window.alert("game was created succesfully");		
		} catch (error) {
			console.log(error)
			alert(error.response.data)
		}
	};
}

export function filterByGenre(filter) {
	return (dispatch) => {
		dispatch({ type: FILTER, payload: filter });
	};
}

export function filterCreated(filter) {
	return (dispatch) => {
		const type = filter === "User" ? FILTER_USER : FILTER_SERVER;
		dispatch({ type });
	};
}

export function sort(sortType) {
	let type = "";
	if (sortType === "AZ") type = SORT_AZ;
	else if (sortType === "ZA") type = SORT_ZA;
	else type = SORT_RATING;
	return { type };
}

export function paging(page) {
	return dispatch => {
		let startIndex;
		if ((page === 1)) startIndex = 0;
		else startIndex = 15 * (page - 1);
		dispatch({type: PAGING, payload: startIndex})
	}
}

export function clearFilter() {
	return { type: CLEAR_FILTER };
}

export function clearPage() {
	return { type: CLEAR_PAGE };
}

export function clearSearch() {
	return {type: CLEAR_SEARCH}
}