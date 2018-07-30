import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FilmsList from './FilmsList';
import {findSameGenreFilms} from '../actions/findSameGenreFilmsAction';
import {getFilm} from '../actions/getFilmAction';
import {getFilmAndSameGenreFilms} from '../actions/getFilmAction';
import { urlBuilderService } from '../utils/urlBuilderService';
import {NavLink} from 'react-router-dom';

export class FilmPage extends React.PureComponent {
  constructor(props, context) {
    super(props, context);

    this.props.getFilmAndSameGenreFilms(urlBuilderService.getUrl({}, this.props.match.params.filmId));
  }

   componentDidUpdate(prevProps) {
    if (prevProps.match.params.filmId !== this.props.match.params.filmId) {
      this.props.getFilmAndSameGenreFilms(urlBuilderService.getUrl({}, this.props.match.params.filmId));
    }
  }

  render() {
    return (
      <div className="film-page">
        <div className="film-page__info-wrapper">
          <div className="film-page__content">
            <div className="film-page__heading">
              <span className="logo">netflixroulette</span>
              <NavLink to="/search" className="film-page__search-link">Search</NavLink>
            </div>
            <section className="film-page__film-info">
              <div className="film-page__poster-wrapper">
                <img className="film-page__poster" src={this.props.film.poster_path} alt={this.props.film.title} />
              </div>

              <div className="film-page__text-info">
                <h1 className="film-page__film-title">{this.props.film.title}</h1>
                <p className="film-page__film-rewards">{this.props.film.tagline}</p>
                <p className="film-page__film-time"> 
                  <span className="film-page__film-year">{new Date(this.props.film.release_date).getFullYear()}</span>
                  <span className="film-page__film-duration">{this.props.film.runtime} min</span>
                </p>
                <p className="film-page__film-description">{this.props.film.overview}</p>
              </div>
            </section>
          </div>
        </div>
        <div className="film-page__same-genre-heading">
          Films by <span className="film-page__genre-title">{this.props.film.genres[0]} genre </span>
        </div>
        <ul className="films-search-result">
          <FilmsList films={this.props.sameGenreFilms} />
        </ul>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    sameGenreFilms: state.sameGenreFilmsReducer.sameGenreFilms,
    isFetchingSameGenreFilms: state.sameGenreFilmsReducer.fetching,
    isErrorFetchinSameGenreFilms: state.sameGenreFilmsReducer.isError,
    film: state.getFilmReducer.film,
    isFetchingFilm: state.getFilmReducer.fetching,
    isErrorFetchingFilm: state.getFilmReducer.isError

  }
}

function mapDispatchToProps(dispatch) {
  return {
    findSameGenreFilms: bindActionCreators(findSameGenreFilms, dispatch),
    getFilm: bindActionCreators(getFilm, dispatch),
    getFilmAndSameGenreFilms: bindActionCreators(getFilmAndSameGenreFilms, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilmPage);