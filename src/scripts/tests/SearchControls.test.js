import React from 'react';
import { SearchControls } from '../';
import renderer from 'react-test-renderer';

const SEARCH_BY_OPTIONS = [
  { id:'1', name: '1' },
  { id:'2', name: '2' }
];

test('SearchControls should contain right data', () => {
  const component = renderer.create(
    <SearchControls
      onSearchClick={() => {}}
      searchInputRef={ React.createRef() }
      searchByOptions={ SEARCH_BY_OPTIONS }
      onSearchOptionClick={() => {}}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

