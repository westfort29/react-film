import React from 'react';
import { SaySomeThing } from './SaySomeThing.jsx';
import renderer from 'react-test-renderer';

test('SaySomeThing print right data', () => {
  const component = renderer.create(
    <SaySomeThing say="something other" />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

