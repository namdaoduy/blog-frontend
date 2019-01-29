import React from 'react';
import { shallow } from 'enzyme';
import App from '../../src/components/App';

describe('component/App', () => {
  const props = {
    loggedIn: false,
  };
  let wrapper;

  const setup = () => {
    wrapper = shallow(<App {...props} />);
  };

  describe('render successfully', () => {
    it('render when not login', () => {
      setup();
      expect(wrapper.length).toBe(1);
    });
  });
});