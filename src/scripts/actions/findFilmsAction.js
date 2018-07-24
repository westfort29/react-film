import { GET_FILMS_LIST_SEARCH_REQUEST, GET_FILMS_LIST_SEARCH_SUCCESS, GET_FILMS_LIST_SEARCH_FAIL } from '../utils/constants';

export const findFilms = (url) => {
  return (dispatch) => {
    dispatch({
      type: GET_FILMS_LIST_SEARCH_REQUEST
    });

    return fetch(url)
    .then(response => response.json())
    .then((data) => {
      dispatch({
        type: GET_FILMS_LIST_SEARCH_SUCCESS,
        payload: data
      });
    })
    .catch(e => {
      dispatch({
        type: GET_FILMS_LIST_SEARCH_FAIL
      });
    })
  }
}