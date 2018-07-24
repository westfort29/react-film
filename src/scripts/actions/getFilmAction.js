import { GET_FILM_DATA_REQUEST, GET_FILM_DATA_SUCCESS, GET_FILM_DATA_FAIL } from '../utils/constants';
import {findSameGenreFilms} from './findSameGenreFilmsAction';
import {urlBuilderService} from '../utils/urlBuilderService';

export const getFilm = (url) => {
  return (dispatch) => {
    dispatch({
      type: GET_FILM_DATA_REQUEST
    });

    return fetch(url)
    .then(response => response.json())
    .then((data) => {
      dispatch({
        type: GET_FILM_DATA_SUCCESS,
        payload: data
      });
    })
    .catch(e => {
      dispatch({
        type: GET_FILM_DATA_FAIL
      });
    })
  }
}

export const getFilmAndSameGenreFilms = (url) => {
  return (dispatch, getState) => {
    return dispatch(getFilm(url)).then(() => {
      let params = {};
      params.searchBy = 'genres';
      params.search = getState().getFilmReducer.film.genres[0];
      return dispatch(findSameGenreFilms(urlBuilderService.getUrl(params)));
    })
  }
}