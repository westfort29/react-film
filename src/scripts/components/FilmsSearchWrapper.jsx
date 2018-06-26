import * as React from "react";
import { SearchControls, GeneralSearchResults, FilmsList } from './';
const BASIC_URL = 'http://react-cdp-api.herokuapp.com/movies';

export class FilmsSearchWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchSortingTypes: [
        {name: 'release date', isActive: true, id: 'release_date'},
        {name: 'rating', isActive: false, id: 'vote_average'}
      ],
      searchByOptions: [
        {name: 'Title', id: 'title', isActive: true},
        {name: 'Genre', id: 'genres', isActive: false}
      ],
      totalFilmsFound: 0,
      displayFilms: []
    };
  }

  updateData = () => {
    console.log(this.getRequestUrl());
    fetch(this.getRequestUrl())
    .then(response => response.json())
    .then((data) => {
      this.setState(
        {
          displayFilms: data.data,
          totalFilmsFound: data.total
        }
      );
    });
  }

  getRequestUrl = () => {
    let requestUrl = BASIC_URL;
    let params = {};
    params.sortBy = this.getSelectedFilter().id;
    params.searchBy = this.getSelectedSearchOption().id;
    params.search = this.searchInputRef.value;
    params.sortOrder = 'desc';
    requestUrl += '?' + this.getQueryStringFromObject(params);
    return requestUrl;
  }

  onSortOptionClick = (newSelectedSortingOption) => {
    let newOptions = this.state.searchSortingTypes.slice();
    newOptions.map(option => {
      option.isActive = newSelectedSortingOption.name === option.name;
    });
    this.setState({
      searchSortingTypes: newOptions
    });
  }

  onSearchOptionClick = (newSelectedSearchByOption) => {
    let newOptions = this.state.searchByOptions.slice();
    newOptions.map(option => {
      option.isActive = newSelectedSearchByOption.name === option.name;
    });
    this.setState({
      searchByOptions: newOptions
    });
  }

  getSelectedFilter = () => {
    return this.state.searchSortingTypes.find((sortingType) => sortingType.isActive === true);
  }

  getSelectedSearchOption = () => {
    return this.state.searchByOptions.find((searchOption) => searchOption.isActive === true);
  }

  getQueryStringFromObject = (params) => {
    let queryString = '';
    for (let key in params) {
      queryString += key + '=' + params[key] + '&';
    }
    return queryString;
  }

  onSearchClick = () => {
    if (this.searchInputRef.value.length > 3) {
      this.updateData();
    };
  }

  render() {
    return (
      <React.Fragment>
        <SearchControls
          onSearchClick={this.onSearchClick}
          searchInputRef={el => this.searchInputRef = el}
          searchByOptions={this.state.searchByOptions}
          onSearchOptionClick={this.onSearchOptionClick}
        />
        <GeneralSearchResults
          amount={this.state.totalFilmsFound}
          searchSortingTypes={this.state.searchSortingTypes}
          onSortOptionClick={this.onSortOptionClick}
        />
        <ul className="films-search-result">
          {this.state.displayFilms.length ? 
            <FilmsList films={this.state.displayFilms} /> :
            (
              <React.Fragment>
                <li className="films-search-result__no-films-message"> No films found </li>
              </React.Fragment>
            )
          }
        </ul>
      </React.Fragment>
    )
  }
}

