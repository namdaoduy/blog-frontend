import React from 'react';
import { shallow } from 'enzyme';
import { Profile } from 'components/User/Profile';
import Auth from 'utils/auth';
import history from 'utils/history';

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
      userInfo: {
        name: 'name',
        email: 'email',
        picture: 'picture',
      },
      userBlogs: [{
        id: 1,
        title: 'Mock title',
        body: 'Mock body',
        author: 'Mock Author',
        created_at: 123456789,
      }],
      getUserInfo: jest.fn(async () => {}),
      getUserBlogs: jest.fn(async () => {}),
      deleteBlog: jest.fn(async () => ({ success: true })),
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

  describe('Test button click', () => {
    it('Test click newBlog, route to /user/blog/new', () => {
      setup();
      const button = wrapper.find('.btn-new-blog');
      button.simulate('click');
      expect(history.push).toHaveBeenLastCalledWith('/user/blog/new');
    });

    it('Test click editBlog, route to /user/blog/id/edit', () => {
      setup();
      const button = wrapper.find('.btn-edit-blog');
      button.simulate('click');
      expect(history.push).toHaveBeenLastCalledWith(`/user/blog/${props.userBlogs[0].id}/edit`);
    });

    describe('Test click deleteBlog', () => {
      it('If cancel delete', () => {
        window.confirm = jest.fn(() => false);
        setup();
        const button = wrapper.find('.btn-delete-blog');
        button.simulate('click');
        expect(wrapper.instance().props.deleteBlog).toHaveBeenCalledTimes(0);
      });

      it('If confirm delete', () => {
        window.confirm = jest.fn(() => true);
        setup();
        const instance = wrapper.instance();
        const mockBlog = jest.spyOn(instance, 'fetchUserBlogs');
        const button = wrapper.find('.btn-delete-blog');
        instance.componentDidMount();
        button.simulate('click');
        expect(instance.props.deleteBlog).toHaveBeenCalledTimes(1);
        expect(mockBlog).toHaveBeenCalledTimes(1);
      });

      it('If deleteBlog throw exception', () => {
        const err = new Error();
        props.deleteBlog = jest.fn(async () => { Promise.reject(err); });
        window.confirm = jest.fn(() => true);
        setup();
        const instance = wrapper.instance();
        const mockBlog = jest.spyOn(instance, 'fetchUserBlogs');
        const button = wrapper.find('.btn-delete-blog');
        instance.componentDidMount();
        button.simulate('click');
        expect(mockBlog).toHaveBeenCalledTimes(1);
      });
    });
  });

  it('Test render when blogData is blank', () => {
    props = {
      ...props,
      userInfo: {},
      userBlogs: [{}],
    };
    setup();
    expect(wrapper).toMatchSnapshot();
  });
});