import React from 'react';
import { FilmPage } from '../';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

let component;

beforeEach(() => {
  component = shallow(<FilmPage />).instance();
});

global.fetch = jest.fn().mockImplementation( () => new Promise((resolve, reject) => resolve()).catch(e => e));

describe('FilmPage', () => {
  test('should contain right data', () => {
    const renderedComponent = renderer.create(<FilmPage />);
    let tree = renderedComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should convert right query string from empty object', () => {
    expect(component.getQueryStringFromObject({})).toBe('');
  });

  test('should convert right query string from normal object', () => {
    expect(component.getQueryStringFromObject({a: '1', b: '2'})).toBe('a=1&b=2&');
  });
});
