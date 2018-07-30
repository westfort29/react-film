import React from 'react';
import { FilmsSearchWrapper } from '../components/FilmsSearchWrapper';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter  } from 'react-router-dom';

configure({ adapter: new Adapter() });

const INITIAL_STATE_SEARCH_BY_OPTIONS = [
  {name: 'Title', id: 'title', isActive: true},
  {name: 'Genre', id: 'genres', isActive: false}
];

const INITIAL_STATE_SORTING_OPTIONS = [
  {name: 'release date', isActive: true, id: 'release_date'},
  {name: 'rating', isActive: false, id: 'vote_average'}
];

const MOCK_RESPONSE = {
  json: () => {
    return {
      "data": [
      {
        "id": 316029,
        "title": "The Greatest Showman",
        "tagline": "",
        "vote_average": 8,
        "vote_count": 1727,
        "release_date": "2017-12-20",
        "poster_path": "https://image.tmdb.org/t/p/w500/dfhztJRiElqmYW4kpvjYe1gENsD.jpg",
        "overview": "The story of American showman P.T. Barnum, founder of the circus that became the famous traveling Ringling Bros. and Barnum & Bailey Circus.",
        "budget": 84000000,
        "revenue": 399979606,
        "genres": [
          "Drama",
          "Music"
        ],
        "runtime": 105
      }
    ],
    "total": 1,
    "offset": 0,
    "limit": 10
    }
  }
};
let LOCATION = {search: ""};
let component;

global.fetch = jest.fn().mockImplementation( () => new Promise((resolve, reject) => resolve(MOCK_RESPONSE)).catch(e => e));

beforeEach(() => {
  component = shallow(
    <FilmsSearchWrapper
      location={LOCATION}
      displayFilms={[]}
      totalFilmsFound={0}
      fetching={false}
      isError={false}
      searchSortingTypes={INITIAL_STATE_SORTING_OPTIONS}
      findFilms={()=>{}}
      setSortingType={()=>{}}
      setSearchByOption={()=>{}}
      searchByOptions={INITIAL_STATE_SEARCH_BY_OPTIONS}
      match={{params: {filmId: 316029}}}
      history={{push: ()=>{}}}/>).instance();
  component.searchInputRef = {value: 'test'};
  const setQueryIfNeededSpy = jest.spyOn(component, 'setQueryIfNeeded');
})

describe('FilmsSearchWrapper', () => {
  test('should contain right data', () => {
    const renderedComponent = renderer.create(
    <MemoryRouter >
      <FilmsSearchWrapper
        location={LOCATION}
        displayFilms={[]}
        totalFilmsFound={0}
        fetching={false}
        isError={false}
        searchSortingTypes={INITIAL_STATE_SORTING_OPTIONS}
        findFilms={()=>{}}
        setSortingType={()=>{}}
        setSearchByOption={()=>{}}
        searchByOptions={INITIAL_STATE_SEARCH_BY_OPTIONS}
        match={{params: {filmId: 316029}}}/>
      </MemoryRouter >);
    let tree = renderedComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('onSearchClick callback should updateData if ref contains more then 3 symb', () => {
    const spy = jest.spyOn(component, 'updateData');

    component.onSearchClick();
    expect(spy).toHaveBeenCalled();
  });

  test('onSearchClick callback shouldn\'t updateData if ref contains less then 4 symb', () => {
    const spy = jest.spyOn(component, 'updateData');
    component.searchInputRef.value = '';

    component.onSearchClick();
    expect(spy).not.toHaveBeenCalled();
  });

  test('onSortOptionClick should call setSortingType from props', () => {
    let spy = jasmine.createSpy('setSortingType');
    let testingComponent = shallow(<FilmsSearchWrapper
      displayFilms={[]}
      totalFilmsFound={0}
      fetching={false}
      isError={false}
      searchSortingTypes={INITIAL_STATE_SORTING_OPTIONS}
      findFilms={()=>{}}
      setSortingType={spy}
      searchByOptions={INITIAL_STATE_SEARCH_BY_OPTIONS}/>).instance();
    testingComponent.onSortOptionClick({id: 1});

    expect(spy).toHaveBeenCalledWith(1);
  });

  test('onSearchOptionClick should call setSortingType from props', () => {
    let spy = jasmine.createSpy('setSearchByOption');
    let testingComponent = shallow(<FilmsSearchWrapper
      displayFilms={[]}
      totalFilmsFound={0}
      fetching={false}
      isError={false}
      searchSortingTypes={INITIAL_STATE_SORTING_OPTIONS}
      findFilms={()=>{}}
      setSortingType={()=>{}}
      setSearchByOption={spy}
      searchByOptions={INITIAL_STATE_SEARCH_BY_OPTIONS}/>).instance();
    testingComponent.onSearchOptionClick({id: 1});

    expect(spy).toHaveBeenCalledWith(1);
  });
});
