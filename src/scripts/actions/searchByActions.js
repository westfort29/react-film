import { CHANGE_SEARCH_BY } from '../utils/constants';

export const setSearchByOption = (newSeachById) => {
  return {
    type: CHANGE_SEARCH_BY,
    payload: newSeachById
  }
}