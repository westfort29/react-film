import { setSortingType } from '../../actions/searchSortingTypeActions';
import { CHANGE_SORTING_TYPE } from '../../utils/constants';

test('setSortingType action', () => {
  let argument = 12;
  let expectedResult = {
      type: CHANGE_SORTING_TYPE,
      payload: argument
  };

  let result = setSortingType(argument);

  expect(result).toEqual(expectedResult);
});