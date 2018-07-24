import { GET_FILMS_LIST_SEARCH_REQUEST, GET_FILMS_LIST_SEARCH_SUCCESS, GET_FILMS_LIST_SEARCH_FAIL } from '../utils/constants';

const foundFilmsSearch = {
  foundFilms: [],
  foundFilmsAmount: 0,
  fetching: false,
  isError: false
}

export default function filmsSearchReducer (state = foundFilmsSearch, action) {
  switch (action.type) {
    case GET_FILMS_LIST_SEARCH_REQUEST:
      return { ...state, fetching: true, isError: false }
    case GET_FILMS_LIST_SEARCH_SUCCESS:
      return { ...state, fetching: false, isError: false, foundFilms: action.payload.data, foundFilmsAmount: action.payload.total }
    case GET_FILMS_LIST_SEARCH_FAIL:
      return { ...state, fetching: true, isError: true, foundFilms: [], foundFilmsAmount: 0 }
    default:
    return state;
  }
}