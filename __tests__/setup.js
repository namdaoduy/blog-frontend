import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

global.console.log = jest.fn();

Enzyme.configure({ adapter: new Adapter() });
