import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import AppFooter from '../components/AppFooter';
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

