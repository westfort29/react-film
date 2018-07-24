import { GET_SAME_GENRE_FILMS_REQUEST, GET_SAME_GENRE_FILMS_SUCCESS, GET_SAME_GENRE_FILMS_FAIL } from '../utils/constants';

const foundFilmsSearch = {
  sameGenreFilms: [],
  fetching: false,
  isError: false
}

export default function sameGenreFilmsReducer (state = foundFilmsSearch, action) {
  switch (action.type) {
    case GET_SAME_GENRE_FILMS_REQUEST:
      return { ...state, fetching: true, isError: false }
    case GET_SAME_GENRE_FILMS_SUCCESS:
      return { ...state, fetching: false, isError: false, sameGenreFilms: action.payload.data }
    case GET_SAME_GENRE_FILMS_FAIL:
      return { ...state, fetching: true, isError: true, sameGenreFilms: [] }
    default:
    return state;
  }
}