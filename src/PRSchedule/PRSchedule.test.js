import React from 'react';
import { mount } from 'enzyme';
import { TextLabel } from 'prism-reactjs';
import PRSchedule from './PRSchedule';

const getTestIdSelector = id => `[data-testid="${id}"]`;
let wrapper;

describe('PRSchedule component should', () => {
  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  it('render a link "Add schedule", if no props provided', () => {
    wrapper = mount(<PRSchedule />);

    expect(wrapper.exists(getTestIdSelector('add-schedule'))).toBe(true);
    expect(wrapper.exists(TextLabel)).toBe(false);
  });

  it('render everything, if props are provided', () => {
    wrapper = mount(<PRSchedule frequency={'4 hours'}/>);

    expect(wrapper.exists(getTestIdSelector('add-schedule'))).toBe(false);
    expect(wrapper.contains(<TextLabel>RPO: </TextLabel>)).toBe(true);
  });
});
