import React from 'react';
import { FilmsSearchWrapper } from '../';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

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

let component;

global.fetch = jest.fn().mockImplementation( () => new Promise((resolve, reject) => resolve(MOCK_RESPONSE)).catch(e => e));

beforeEach(() => {
  component = shallow(<FilmsSearchWrapper />).instance();
  component.searchInputRef = {value: 'test'};
})

describe('FilmsSearchWrapper', () => {
  test('should contain right data', () => {
    const renderedComponent = renderer.create(<FilmsSearchWrapper />);
    let tree = renderedComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should convert right query string from empty object', () => {
    expect(component.getQueryStringFromObject({})).toBe('');
  });

  test('should convert right query string from normal object', () => {
    expect(component.getQueryStringFromObject({a: '1', b: '2'})).toBe('a=1&b=2&');
  });

  test('onSearchOptionClick callback should set appropriate search by option', () => {
    component.onSearchOptionClick(INITIAL_STATE_SEARCH_BY_OPTIONS[1]);
    let expectedResult = [
      {name: 'Title', id: 'title', isActive: false},
      {name: 'Genre', id: 'genres', isActive: true}
    ];
    expect(component.state.searchByOptions).toMatchObject(expectedResult);
  });

  test('onSortOptionClick callback should set appropriate sorting type', () => {
    component.onSortOptionClick(INITIAL_STATE_SORTING_OPTIONS[1]);
    let expectedResult = [
      {name: 'release date', isActive: false, id: 'release_date'},
      {name: 'rating', isActive: true, id: 'vote_average'}
    ];
    expect(component.state.searchSortingTypes).toMatchObject(expectedResult);
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
    expect(spy).toBeCalledTimes(0);
  });

  test('getRequestUrl should return appropriate url', () => {
    let expectedResult = 'http://react-cdp-api.herokuapp.com/movies?sortBy=release_date&searchBy=title&search=test&sortOrder=desc&';
    expect(component.getRequestUrl()).toBe(expectedResult);
  });

  test('updateData should set appropriate state after response', (done) => {
    component.updateData();

    setTimeout(() => {
      expect(component.state.displayFilms).toMatchObject(MOCK_RESPONSE.json().data);
      expect(component.state.totalFilmsFound).toBe(1);
      done();
    }, 100); 
  });
});
