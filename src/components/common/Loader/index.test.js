import React from 'react';
import renderer from 'react-test-renderer';
import Loader from './index';

// eslint-disable-next-line no-undef
describe('<Loader />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<Loader />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});