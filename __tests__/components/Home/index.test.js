import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../../../src/components/Home';

describe('components/Home/index', () => {
  const props = {
    newBlogs: [],
    trendingBlogs: [],
    pagination: {},
    loggedIn: false,
    getAllBlogs: async () => {},
    getTrendingBlogs: async () => {},
  };
  let wrapper;

  const setup = () => {
    wrapper = shallow(<Home {...props} />);
  };

  describe('Life cycles', () => {
    it('componentDidmount call fetch API function', () => {
      setup();
      const instance = wrapper.instance();
      const mockNew = jest.spyOn(instance, 'fetchNewBlogs');
      const mockTrend = jest.spyOn(instance, 'fetchNewBlogs');
      instance.componentDidMount();
      expect(mockNew).toHaveBeenCalledTimes(1);
      expect(mockTrend).toHaveBeenCalledTimes(1);
    });
  });
});