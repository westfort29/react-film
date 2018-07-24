import React from 'react';
import { FilmPage } from '../components/FilmPage';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

let component;

beforeEach(() => {
  component = shallow(<FilmPage
    sameGenreFilms={[]}
    isFetchingSameGenreFilms={false}
    isErrorFetchinSameGenreFilms={false}
    film={{ genres: [''], release_date: '1.1.2001' }}
    isFetchingFilm={false}
    isErrorFetchingFilm={false}
    findSameGenreFilms={()=>{}}
    getFilmAndSameGenreFilms={()=>{}}/>).instance();
});

global.fetch = jest.fn().mockImplementation( () => new Promise((resolve, reject) => resolve()).catch(e => e));

describe('FilmPage', () => {
  test('should contain right data', () => {
    const renderedComponent = renderer.create(<FilmPage
      sameGenreFilms={[]}
      isFetchingSameGenreFilms={false}
      isErrorFetchinSameGenreFilms={false}
      film={{ genres: [''], release_date: '1.1.2001' }}
      isFetchingFilm={false}
      isErrorFetchingFilm={false}
      findSameGenreFilms={()=>{}}
      getFilmAndSameGenreFilms={()=>{}}/>);
    let tree = renderedComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
