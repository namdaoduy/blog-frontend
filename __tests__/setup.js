import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import history from 'utils/history';

global.console.log = jest.fn();
window.alert = jest.fn();
jest.mock('utils/history.js');

Enzyme.configure({ adapter: new Adapter() });
