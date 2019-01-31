import React from 'react';
import { shallow } from 'enzyme';
import history from 'utils/history';
import { Login } from 'components/Login';

describe('components/Login/index', () => {
  let wrapper;
  let props;

  const setup = () => {
    wrapper = shallow(<Login {...props} />);
  };

  beforeEach(() => {
    history.push.mockClear();
    props = {
      loginGoogle: jest.fn(async () => {}),
    };
  });

  it('Render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  describe('Test Google login handle', () => {
    it('Response from Google has error', () => {
      setup();
      const resGoogle = { error: true };
      const instance = wrapper.instance();
      instance.responseGoogle(resGoogle);
      expect(window.alert).toHaveBeenCalled();
    });

    it('Response from Google success', () => {
      setup();
      const resGoogle = { error: false };
      const instance = wrapper.instance();
      instance.responseGoogle(resGoogle);
      expect(instance.props.loginGoogle).toHaveBeenCalledWith(resGoogle);
    });
  });

  describe('Test handleLogin when action dispatched', () => {
    setup();
    const instance = wrapper.instance();
    it('If success', () => {
      const res = { success: true };
      instance.handleLogin(res);
      expect(history.push).toHaveBeenCalledWith('/user');
    });

    it('If failure', () => {
      const res = { success: false };
      instance.handleLogin(res);
      expect(window.alert).toHaveBeenCalled();
    });
  });
});