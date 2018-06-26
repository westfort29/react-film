import * as React from "react";

const FilmOnSearchPage = ({film}) =>
  (
    <li className="films-search-result__film">
      <img className="films-search-result__film-img" src={film.poster_path} alt={film.title} />
      <span className="films-search-result__film-year">{new Date(film.release_date).getFullYear()}</span>
      <p className="films-search-result__film-name">{film.title}</p>
      <p className="films-search-result__film-genre">{film.genres.join('&')}</p>
    </li>
  )
;

export default FilmOnSearchPage;
