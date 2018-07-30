import * as React from "react";
import {NavLink} from 'react-router-dom';
import { getFilm } from "../actions/getFilmAction";

const FilmOnSearchPage = ({film}) =>
  ( <li className="films-search-result__film">
      <img className="films-search-result__film-img" src={film.poster_path} alt={film.title} />
      <span className="films-search-result__film-year">{new Date(film.release_date).getFullYear()}</span>
      <NavLink to={"/film/" + film.id} className="films-search-result__film-name">{film.title}</NavLink>
      <p className="films-search-result__film-genre">{film.genres.join('&')}</p>
    </li>
  )
;

export default FilmOnSearchPage;
