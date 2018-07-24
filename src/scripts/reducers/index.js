import { combineReducers } from 'redux'
import filmsSearchReducer from './filmsSearchReducer';
import getFilmReducer from './getFilmReducer';
import sameGenreFilmsReducer from './sameGenreFilmsReducer';
import searchByReducer from './searchByReducer';
import sortingTypeReducer from './sortingTypeReducer';

export default combineReducers({
  filmsSearchReducer,
  getFilmReducer,
  sameGenreFilmsReducer,
  searchByReducer,
  sortingTypeReducer
})