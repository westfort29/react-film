import { GET_FILM_DATA_REQUEST, GET_FILM_DATA_SUCCESS, GET_FILM_DATA_FAIL } from '../utils/constants';

const foundFilmsSearch = {
  film: {
    genres: [''],
    release_date: '1.1.2001'
  },
  fetching: false,
  isError: false
}

export default function getFilmReducer (state = foundFilmsSearch, action) {
  switch (action.type) {
    case GET_FILM_DATA_REQUEST:
      return { ...state, fetching: true, isError: false }
    case GET_FILM_DATA_SUCCESS:
      return { ...state, fetching: false, isError: false, film: action.payload }
    case GET_FILM_DATA_FAIL:
      return { ...state, fetching: true, isError: true, film: {} }
    default:
    return state;
  }
}