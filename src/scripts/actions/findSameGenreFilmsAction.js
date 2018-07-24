import { GET_SAME_GENRE_FILMS_REQUEST, GET_SAME_GENRE_FILMS_SUCCESS, GET_SAME_GENRE_FILMS_FAIL } from '../utils/constants';

export const findSameGenreFilms = (url) => {
  return (dispatch) => {
    dispatch({
      type: GET_SAME_GENRE_FILMS_REQUEST
    });

    return fetch(url)
    .then(response => response.json())
    .then((data) => {
      dispatch({
        type: GET_SAME_GENRE_FILMS_SUCCESS,
        payload: data
      });
    })
    .catch(e => {
      dispatch({
        type: GET_SAME_GENRE_FILMS_FAIL
      });
    })
  }
}
