import { CHANGE_SORTING_TYPE } from '../utils/constants';

const searchSortingTypes = {
  searchSortingTypes: [
    {name: 'release date', isActive: true, id: 'release_date'},
    {name: 'rating', isActive: false, id: 'vote_average'}
  ]
};

export default function sortingTypeReducer(state = searchSortingTypes, action) {
  switch (action.type) {
    case CHANGE_SORTING_TYPE:
      return { ...state, searchSortingTypes: getNewSortingTypeObject(state, action.payload) }
    default:
    return state;
  }
}

function getNewSortingTypeObject(state, newSortingTypeId) {
  let newOptions = state.searchSortingTypes.slice();
  newOptions.map(option => {
    option.isActive = newSortingTypeId === option.id;
  });
  return newOptions;
}