import React from 'react';
import { shallow } from 'enzyme';
import history from 'utils/history';
import TrendingBlog from 'components/Home/TrendingBlog';

describe('components/Home/TrendingBlog.js', () => {
  let props;
  let wrapper;

  const setup = () => {
    wrapper = shallow(<TrendingBlog {...props} />);
  };

  beforeEach(() => {
    props = {
      blog: {
        id: 1,
        title: 'Mock title',
        body: 'Mock body',
        author: 'Mock Author',
        created_at: 123456789,
      },
    };
  });

  describe('Render correctly', () => {
    it('When blog is valid', () => {
      setup();
      expect(wrapper).toMatchSnapshot();
    });

    it('When blog is invalid', () => {
      props.blog = {};
      setup();
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('Change route correctly', () => {
    setup();
    wrapper.instance().handleClick();
    expect(history.push).toHaveBeenCalledWith(`/blog/${props.blog.id}`);
  });
});
