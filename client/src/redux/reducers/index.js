import {
	GET_VIDEOGAMES,
	SEARCH_GAMES,
	GET_VIDEOGAME_DETAIL,
	GET_GENRES,
	GET_PLATFORMS,
	CREATE_VIDEOGAME,
	CLEAR_PAGE,
	// FILTER,
} from "../actions/actionTypes";

const initialState = {
	videogames: [],
	search: [],
	videogameDetail: {},
	genres: [],
	platforms: [],
	filteredVideogames: [],
	orderedVideogames: [],
};

export default function reducer(state = initialState, { type, payload }) {
	switch (type) {
		case GET_VIDEOGAMES:
			return {
				...state,
				videogames: payload,
			};

		case SEARCH_GAMES:
			return {
				...state,
				search: payload
			}

		case GET_VIDEOGAME_DETAIL:
			return {
				...state,
				videogameDetail: payload,
			};

		case GET_GENRES:
			return {
				...state,
				genres: payload,
			};

		case GET_PLATFORMS:
			return {
				...state,
				platforms: payload,
			};

		case CREATE_VIDEOGAME:
			return {
				...state,
				videogames: [...state.videogames, payload],
			};

		case CLEAR_PAGE:
			return {
				...state,
				videogameDetail: [],
				search: [],
			};
		default:
			return state;
	}
}
