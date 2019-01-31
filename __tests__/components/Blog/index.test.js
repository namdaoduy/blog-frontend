import React from 'react';
import { shallow } from 'enzyme';
import { Blog } from 'components/Blog';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

describe('components/Blog/index', () => {
  let wrapper;
  let props;

  const setup = () => {
    wrapper = shallow(<Blog {...props} />);
  };

  beforeEach(() => {
    props = {
      match: {
        params: {
          blog_id: 1,
        },
      },
      blogData: {},
      isLiked: false,
      loggedIn: false,
      getBlogById: jest.fn(async () => {}),
      likeBlog: jest.fn(async () => {}),
    };
  });

  it('Render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  describe('Test like button', () => {
    it('When not logged in, expect alert error', () => {
      props.loggedIn = false;
      setup();
      const btnLike = wrapper.find('.btn-like');
      btnLike.simulate('click');
      expect(window.alert).toHaveBeenCalledTimes(1);
    });

    it('When logged in, but liked, return', () => {
      props.loggedIn = true;
      props.isLiked = true;
      setup();
      const instance = wrapper.instance();
      const mockLike = jest.spyOn(instance, 'fetchLike');
      const btnLike = wrapper.find('.btn-like');
      instance.componentDidMount();
      btnLike.simulate('click');
      expect(mockLike).toHaveBeenCalledTimes(0);
    });

    it('When logged in, not liked before, call fetchLike', () => {
      props.loggedIn = true;
      props.isLiked = false;
      setup();
      const instance = wrapper.instance();
      const mockLike = jest.spyOn(instance, 'fetchLike');
      const btnLike = wrapper.find('.btn-like');
      instance.componentDidMount();
      btnLike.simulate('click');
      expect(mockLike).toHaveBeenCalledTimes(1);
    });
  });

  describe('Test render like button', () => {
    it('When liked', () => {
      props.isLiked = true;
      setup();
      expect(wrapper.find(Favorite).exists()).toBe(true);
    });

    it('When not liked', () => {
      props.isLiked = false;
      setup();
      expect(wrapper.find(FavoriteBorder).exists()).toBe(true);
    });
  });
});