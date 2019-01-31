import React from 'react';
import { shallow } from 'enzyme';
import history from 'utils/history';
import { App } from '../../src/components/App';

jest.mock('utils/history.js');

describe('component/App', () => {
  let props;
  let wrapper;

  const setup = async () => {
    wrapper = shallow(<App {...props} />);
    await Promise.resolve();
  };

  beforeEach(() => {
    props = {
      loggedIn: false,
    };
  });

  describe('render successfully', () => {
    it('render when not login', async () => {
      await setup();
      expect(wrapper).toMatchSnapshot();
    });

    it('renders when login', async () => {
      props.loggedIn = true;
      await setup();
      expect(wrapper).toMatchSnapshot();
    });
  });
});