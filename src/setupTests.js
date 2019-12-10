// react-testing-library renders your components to document.body,
// this adds jest-dom's custom assertions
import '@testing-library/jest-dom/extend-expect'
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

const getTestIdSelector = id => `[data-testid="${id}"]`;

global.shallow = Component => {
  const wrapper = shallow(Component);
  wrapper.findByTestId = id => wrapper.find(getTestIdSelector(id));
  return wrapper;
};

global.mount = Component => {
  const wrapper = mount(Component);
  wrapper.findByTestId = id => wrapper.find(getTestIdSelector(id));
  return wrapper;
};
