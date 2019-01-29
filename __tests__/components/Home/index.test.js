import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../../../src/components/Home/index';

describe('components/Home/index', () => {
  const props = {
    newBlogs: [],
    trendingBlogs: [],
    pagination: {},
    loggedIn: false,
    getAllBlogs: jest.fn(),
    getTrendingBlogs: jest.fn(),
  };
  let wrapper;

  const setup = () => {
    wrapper = shallow(<Home {...props} />);
  };

  describe('Life cycles', () => {
    it('componentDidmount call fetch API function', () => {
      jest.spyOn(Home.prototype, 'componentDidMount');
      setup();
      expect(Home.prototype.componentDidMount.calls.length).toBe(1);
    });
  });
});