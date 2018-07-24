import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchControls from './SearchControls';
import GeneralSearchResults from './GeneralSearchResults';
import FilmsList from './FilmsList';
import {findFilms} from '../actions/findFilmsAction';
import {setSortingType} from '../actions/searchSortingTypeActions';
import {setSearchByOption} from '../actions/searchByActions';
import {urlBuilderService} from '../utils/urlBuilderService';

export class FilmsSearchWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  updateData = () => {
    this.props.findFilms(this.getRequestUrl());
  }

  getRequestUrl = () => {
    let params = {};
    params.sortBy = this.getSelectedFilter().id;
    params.searchBy = this.getSelectedSearchOption().id;
    params.search = this.searchInputRef.value;
    params.sortOrder = 'desc';
    return urlBuilderService.getUrl(params);
  }

  onSortOptionClick = (newSelectedSortingOption) => {
    this.props.setSortingType(newSelectedSortingOption.id);
  }

  onSearchOptionClick = (newSelectedSearchByOption) => {
    this.props.setSearchByOption(newSelectedSearchByOption.id);
  }

  getSelectedFilter = () => {
    return this.props.searchSortingTypes.find((sortingType) => sortingType.isActive === true);
  }

  getSelectedSearchOption = () => {
    return this.props.searchByOptions.find((searchOption) => searchOption.isActive === true);
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
          searchByOptions={this.props.searchByOptions}
          onSearchOptionClick={this.onSearchOptionClick}
        />
        <GeneralSearchResults
          amount={this.props.totalFilmsFound}
          searchSortingTypes={this.props.searchSortingTypes}
          onSortOptionClick={this.onSortOptionClick}
        />
        <ul className="films-search-result">
          {this.props.displayFilms.length ? 
            <FilmsList films={this.props.displayFilms} /> :
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

function mapStateToProps (state) {
  return {
    displayFilms: state.filmsSearchReducer.foundFilms,
    totalFilmsFound: state.filmsSearchReducer.foundFilmsAmount,
    fetching: state.filmsSearchReducer.fetching,
    isError: state.filmsSearchReducer.isError,
    searchSortingTypes: state.sortingTypeReducer.searchSortingTypes,
    searchByOptions: state.searchByReducer.searchByOptions
  }
}

function mapDispatchToProps(dispatch) {
  return {
    findFilms: bindActionCreators(findFilms, dispatch),
    setSortingType: bindActionCreators(setSortingType, dispatch),
    setSearchByOption: bindActionCreators(setSearchByOption, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilmsSearchWrapper);
