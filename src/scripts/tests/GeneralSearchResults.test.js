import React from 'react';
import { GeneralSearchResults } from '../';
import renderer from 'react-test-renderer';

const SEARCH_SORTING_TYPES =[
  {name: 'release date', isActive: true, id: 'release_date'},
  {name: 'rating', isActive: false, id: 'vote_average'}
];

test('GeneralSearchResults should contain right data', () => {
  const component = renderer.create(
    <GeneralSearchResults
      amount={ 8 }
      searchSortingTypes={SEARCH_SORTING_TYPES}
      onSortOptionClick={ ()=>{} }
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

