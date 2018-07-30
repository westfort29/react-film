import sortingTypeReducer from '../../reducers/sortingTypeReducer';
import { CHANGE_SORTING_TYPE } from '../../utils/constants';

describe('sortingTypeReducer', () => {
  test('should return the initial state', () => {
    expect(sortingTypeReducer(undefined, {})).toEqual(
      {
        searchSortingTypes: [
          {name: 'release date', isActive: true, id: 'release_date'},
          {name: 'rating', isActive: false, id: 'vote_average'}
        ]
      }
    )
  })

  test('should change active sorting type', () => {
    expect(sortingTypeReducer(undefined, {type: CHANGE_SORTING_TYPE, payload: 'vote_average'})).toEqual(
      {
        searchSortingTypes: [
          {name: 'release date', isActive: false, id: 'release_date'},
          {name: 'rating', isActive: true, id: 'vote_average'}
        ]
      }
    )
  })
})