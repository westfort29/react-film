import * as React from "react";
import FilmOnSearchPage from './FilmOnSearchPage';

const FilmsList = ({films}) =>
  (
    <React.Fragment>
      {films.map(film => (
        <React.Fragment key={film.id}>
          <FilmOnSearchPage film={film} />
        </React.Fragment>)
      )}
      <li className="films-search-result__film films-search-result__film--dummy"></li>
      <li className="films-search-result__film films-search-result__film--dummy"></li>
      <li className="films-search-result__film films-search-result__film--dummy"></li>
      <li className="films-search-result__film films-search-result__film--dummy"></li>
    </React.Fragment>
  );

export default FilmsList;
