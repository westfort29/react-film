import { CHANGE_SORTING_TYPE } from '../utils/constants';

export const setSortingType = (newSortingTypeId) => {
  return {
    type: CHANGE_SORTING_TYPE,
    payload: newSortingTypeId
  }
}