import {
	GET_VIDEOGAMES,
	GET_VIDEOGAME_DETAIL,
	GET_GENRES,
	CREATE_VIDEOGAME,
	CLEAR_PAGE,
	FILTER,
} from "../actions/actionTypes";

const initialState = {
	videogames: [],
	videogameDetail: [],
  genres: [],
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
    
    case GET_VIDEOGAME_DETAIL:
      return {
        ...state,
        videogameDetail: payload
      }

    case GET_GENRES:
      return {
        ...state,
        genres: payload
      }

    case CLEAR_PAGE:
      return {
        ...state,
        
      }
		default:
			return state;
	}
}
