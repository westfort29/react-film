import React from 'react';
import { ErrorBoundary, AppFooter } from '../';
import renderer from 'react-test-renderer';

test('ErrorBoundary should contain right data', () => {
  const component = renderer.create(
    <ErrorBoundary>
      <AppFooter />
    </ErrorBoundary>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

