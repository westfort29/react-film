import * as React from "react";
import { FilmsList } from "./";
const BASIC_URL = 'http://react-cdp-api.herokuapp.com/movies';

export default class FilmPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      film: {
        id: 68718,
        title: "Django Unchained",
        tagline: "Life, liberty and the pursuit of vengeance.",
        vote_average: 7.9,
        vote_count: 12144,
        release_date: "2012-12-25",
        poster_path: "https://image.tmdb.org/t/p/w500/5WJnxuw41sddupf8cwOxYftuvJG.jpg",
        overview: "With the help of a German bounty hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner.",
        budget: 100000000,
        revenue: 425368238,
        genres: [
          "Drama",
          "Western"
        ],
        runtime: 165
      },
      sameGenreFilms: []
    }

    this.getFilmsWithSameGenre();
  }

  getFilmsWithSameGenre = () => {
    fetch(this.getRequestUrl())
    .then(response => response.json())
    .then((data) => {
      this.setState(
        {
          sameGenreFilms: data.data
        }
      );
    });
  }

  getRequestUrl = () => {
    let requestUrl = BASIC_URL;
    let params = {};
    params.searchBy = 'genres';
    params.search = this.state.film.genres[0];
    requestUrl += '?' + this.getQueryStringFromObject(params);
    return requestUrl;
  }

  getQueryStringFromObject = (params) => {
    let queryString = '';
    for (let key in params) {
      queryString += key + '=' + params[key] + '&';
    }
    return queryString;
  }

  render() {
    return (
      <div className="film-page">
        <div className="film-page__info-wrapper">
          <div className="film-page__content">
            <div className="film-page__heading">
              <span className="logo">netflixroulette</span>
              <a className="film-page__search-link">Search</a>
            </div>
            <section className="film-page__film-info">
              <div className="film-page__poster-wrapper">
                <img className="film-page__poster" src={this.state.film.poster_path} alt={this.state.film.title} />
              </div>

              <div className="film-page__text-info">
                <h1 className="film-page__film-title">{this.state.film.title}</h1>
                <p className="film-page__film-rewards">{this.state.film.tagline}</p>
                <p className="film-page__film-time"> 
                  <span className="film-page__film-year">{new Date(this.state.film.release_date).getFullYear()}</span>
                  <span className="film-page__film-duration">{this.state.film.runtime} min</span>
                </p>
                <p className="film-page__film-description">{this.state.film.overview}</p>
              </div>
            </section>
          </div>
        </div>
        <div className="film-page__same-genre-heading">
          Films by <span className="film-page__genre-title">{this.state.film.genres[0]} genre </span>
        </div>
        <ul className="films-search-result">
          <FilmsList films={this.state.sameGenreFilms} />
        </ul>
      </div>
    )
  }
}
