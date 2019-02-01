import React from 'react';
import { shallow } from 'enzyme';
import { BlogEditor } from 'components/User/BlogEditor';

describe('components/User/Profile', () => {
  let wrapper;
  let props;

  const setup = () => {
    wrapper = shallow(<BlogEditor {...props} />);
  };

  beforeEach(() => {
    props = {
      match: { params: { blog_id: 1 } },
      edittingBlog: {
        id: 1,
        title: 'Mock title',
        body: 'Mock body',
        author: 'Mock Author',
        created_at: 123456789,
      },
      createBlog: jest.fn(async () => {}),
      updateBlog: jest.fn(async () => {}),
      getEdittingBlog: jest.fn(async () => {}),
    };
  });

  describe('Test render', () => {
    it('Render correctly', () => {
      setup();
      expect(wrapper).toMatchSnapshot();
    });

    it('Render error correctly', () => {
      setup();
      wrapper.setState({ error: true });
      expect(wrapper).toMatchSnapshot();
    });

    it('Render editor correctly', () => {
      setup();
      wrapper.setState({ isLoading: false });
      expect(wrapper).toMatchSnapshot();
    });

    it('Render if create new blog', () => {
      props.match.params = {};
      setup();
      expect(wrapper).toMatchSnapshot();
    });
  });
});