import React from 'react';
import { shallow } from 'enzyme';
import { Profile } from 'components/User/Profile';
import Auth from 'utils/auth';

jest.mock('utils/auth');

describe('components/User/Profile', () => {
  let wrapper;
  let props;

  const setup = () => {
    wrapper = shallow(<Profile {...props} />);
  };

  afterAll(() => {
    Auth.mockClear();
  });

  beforeEach(() => {
    props = {
      userInfo: {},
      userBlogs: [{
        id: 1,
        title: 'Mock title',
        body: 'Mock body',
        author: 'Mock Author',
        created_at: 123456789,
      }],
      getUserInfo: jest.fn(async () => {}),
      getUserBlogs: jest.fn(async () => {}),
      deleteBlog: jest.fn(async () => {}),
    };
  });

  it('Render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  describe('Life cycles', () => {
    it('componentDidmount call fetch API function', () => {
      setup();
      const instance = wrapper.instance();
      const mockInfo = jest.spyOn(instance, 'fetchUserInfo');
      const mockBlog = jest.spyOn(instance, 'fetchUserBlogs');
      instance.componentDidMount();
      expect(mockInfo).toHaveBeenCalledTimes(1);
      expect(mockBlog).toHaveBeenCalledTimes(1);
    });
  });
});