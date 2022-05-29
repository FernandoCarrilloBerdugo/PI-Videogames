import {
	GET_VIDEOGAMES,
	SEARCH_GAMES,
	GET_VIDEOGAME_DETAIL,
	GET_GENRES,
	GET_PLATFORMS,
	CREATE_VIDEOGAME,
	CLEAR_PAGE,
	FILTER,
	FILTER_SERVER,
	CLEAR_FILTER,
	FILTER_USER,
	SORT_AZ,
	SORT_ZA,
	SORT_RATING,
} from "../actions/actionTypes";

const initialState = {
	videogames: [],
	search: [],
	videogameDetail: [],
	genres: [],
	platforms: [],
	filtered: "",
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
				search: payload,
			};

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

		case FILTER:
			return {
				...state,
				filtered: state.search.length
					? state.search.filter((game) => game.genres.includes(payload))
					: state.videogames.filter((game) => game.genres.includes(payload)),
			};

		case FILTER_USER:
			return {
				...state,
				filtered: state.search.length
					? (state.filtered.length && state.filtered.filter(game => typeof(game.id) === "string")) || state.search.filter(game => typeof(game.id) === "string")
					: (state.filtered.length && state.filtered.filter(game => typeof(game.id) === "string")) || state.videogames.filter(game => typeof(game.id) === "string")
			}

		case FILTER_SERVER:
			return {
				...state,
				filtered: state.search.length
					? (state.filtered.length && state.filtered.filter(game => typeof(game.id) === "number")) || state.search.filter(game => typeof(game.id) === "number")
					: (state.filtered.length && state.filtered.filter(game => typeof(game.id) === "number")) || state.videogames.filter(game => typeof(game.id) === "number")
			}

		case CLEAR_FILTER:
			return {
				...state,
				filtered: "",
			};

		case CLEAR_PAGE:
			return {
				...state,
				videogameDetail: [],
				search: [],
			};

		case SORT_AZ:
			return {
				...state,
				videogames: state.videogames.sort((a,b) => {
					if(a.name.toLowerCase() < b.name.toLowerCase()) return -1
					if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
					else return 0
				}),
				search: state.search.length ? state.search.sort((a,b) => {
					if(a.name.toLowerCase() < b.name.toLowerCase()) return -1
					if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
					else return 0
				}) : state.search,
				filtered: state.filtered.length ? state.filtered.sort((a,b) => {
					if(a.name.toLowerCase() < b.name.toLowerCase()) return -1
					if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
					else return 0
				}) : state.filtered
			}

		case SORT_ZA:
			return {
				...state,
				videogames: state.videogames.sort((a,b) => {
					if(a.name.toLowerCase() < b.name.toLowerCase()) return 1
					if(a.name.toLowerCase() > b.name.toLowerCase()) return -1
					else return 0
				}),
				search: state.search.length ? state.search.sort((a,b) => {
					if(a.name.toLowerCase() < b.name.toLowerCase()) return 1
					if(a.name.toLowerCase() > b.name.toLowerCase()) return -1
					else return 0
				}) : state.search,
				filtered: state.filtered.length ? state.filtered.sort((a,b) => {
					if(a.name.toLowerCase() < b.name.toLowerCase()) return 1
					if(a.name.toLowerCase() > b.name.toLowerCase()) return -1
					else return 0
				}) : state.filtered
			}
		

		case SORT_RATING: 
			return {
				...state,
				videogames: state.videogames.sort((a,b) => {
					if(a.rating < b.rating) return 1
					if(a.rating > b.rating) return -1
					else return 0
				}),
				search: state.search.length ? state.search.sort((a,b) => {
					if(a.rating < b.rating) return 1
					if(a.rating > b.rating) return -1
					else return 0
				}) : state.search,
				filtered: state.filtered.length ? state.filtered.sort((a,b) => {
					if(a.rating < b.rating) return 1
					if(a.rating > b.rating) return -1
					else return 0
				}) : state.filtered
			}
		
		default:
			return state;
	}
}
