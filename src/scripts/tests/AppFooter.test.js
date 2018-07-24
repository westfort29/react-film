import React from 'react';
import AppFooter from '../components/AppFooter';
import renderer from 'react-test-renderer';

test('AppFooter should contain right data', () => {
  const component = renderer.create(
    <AppFooter />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

