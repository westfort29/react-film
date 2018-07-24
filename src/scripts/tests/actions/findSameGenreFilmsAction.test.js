import { GET_SAME_GENRE_FILMS_REQUEST, GET_SAME_GENRE_FILMS_SUCCESS, GET_SAME_GENRE_FILMS_FAIL } from '../../utils/constants';
import { findSameGenreFilms } from '../../actions/findSameGenreFilmsAction';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let dispatch = jest.fn();

describe('findSameGenreFilms action', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  })

  test('should dispatch success action type on success response', (done) => {
    let data = {};
    fetchMock.getOnce('/success', { body: data, headers: { 'content-type': 'application/json' } });
    const store = mockStore();

    return store.dispatch(findSameGenreFilms('/success'))
      .then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(2);
        expect(expectedActions).toContainEqual({type: GET_SAME_GENRE_FILMS_REQUEST});
        expect(expectedActions).toContainEqual({type: GET_SAME_GENRE_FILMS_SUCCESS, payload: data });
        done();
      })
  });

  test('should dispatch fail action type on failed response', (done) => {
    fetchMock.mock('/fail', 400);
    const store = mockStore();

    return store.dispatch(findSameGenreFilms('/fail'))
      .then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(2);
        expect(expectedActions).toContainEqual({type: GET_SAME_GENRE_FILMS_REQUEST});
        expect(expectedActions).toContainEqual({type: GET_SAME_GENRE_FILMS_FAIL});
        done();
      })
  });
});
