import { setSearchByOption } from '../../actions/searchByActions';
import { CHANGE_SEARCH_BY } from '../../utils/constants';

test('setSearchByOption action', () => {
  let argument = 12;
  let expectedResult = {
      type: CHANGE_SEARCH_BY,
      payload: argument
  };

  let result = setSearchByOption(argument);

  expect(result).toEqual(expectedResult);
});