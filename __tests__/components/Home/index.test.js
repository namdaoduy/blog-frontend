import React from 'react';
import { shallow } from 'enzyme';
import history from 'utils/history';
import { Home } from 'components/Home';

describe('components/Home/index', () => {
  const mockBlog = {
    id: 1,
    title: 'Mock title',
    body: 'Mock body',
    author: 'Mock Author',
    created_at: 123456789,
  };

  const props = {
    newBlogs: [mockBlog],
    trendingBlogs: [mockBlog],
    pagination: {},
    loggedIn: false,
    getAllBlogs: jest.fn(async () => {}),
    getTrendingBlogs: jest.fn(async () => {}),
  };
  let wrapper;

  const setup = () => {
    wrapper = shallow(<Home {...props} />);
  };

  beforeEach(() => {
    history.push.mockClear();
  });

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

  describe('Test button click', () => {
    describe('When not login', () => {
      props.loggedIn = false;
      setup();
      const btnWriteNow = wrapper.find('.btn-1');
      const btnMakeAccount = wrapper.find('.btn-2');

      it('BtnWriteNow: Route to login if not login yet', () => {
        btnWriteNow.simulate('click');
        expect(history.push).toHaveBeenCalledWith('/login');
      });

      it('BtnMakeAcount: Route to make acount if not login', () => {
        btnMakeAccount.simulate('click');
        expect(history.push).toHaveBeenCalledWith('/login');
      });
    });

    describe('When logged in', () => {
      props.loggedIn = true;
      setup();
      const btnWriteNow = wrapper.find('.btn-1');
      const btnMakeAccount = wrapper.find('.btn-2');

      it('BtnWriteNow: Route to user/blog/new if logged in', () => {
        btnWriteNow.simulate('click');
        expect(history.push).toHaveBeenCalledWith('/user/blog/new');
      });

      it('BtnMakeAcount: Route to profile if not logged in', () => {
        btnMakeAccount.simulate('click');
        expect(history.push).toHaveBeenCalledWith('/user');
      });
    });
  });

  describe('Test method change page', () => {
    setup();
    const instance = wrapper.instance();
    instance.handleChangePage(10);
    expect(instance.props.getAllBlogs).toHaveBeenCalledWith({ page: 10 });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});