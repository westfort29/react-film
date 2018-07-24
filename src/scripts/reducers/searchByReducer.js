import { CHANGE_SEARCH_BY } from '../utils/constants';

const searchByOptions = {
  searchByOptions: [
    {name: 'Title', id: 'title', isActive: true},
    {name: 'Genre', id: 'genres', isActive: false}
  ]
};

export default function searchByReducer(state = searchByOptions, action) {
  switch (action.type) {
    case CHANGE_SEARCH_BY:
      return { ...state, searchByOptions: getNewSearchByObject(state, action.payload) }
    default:
    return state;
  }
}

function getNewSearchByObject(state, newSeachById) {
  let newOptions = state.searchByOptions.slice();
  newOptions.map(option => {
    option.isActive = newSeachById === option.id;
  });
  return newOptions;
}