import React from 'react';
import { TextLabel } from 'prism-reactjs';
import PRSchedule from './PRSchedule';

let wrapper;

describe('PRSchedule component should', () => {
  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  it('render a link "Add schedule" in Edit mode, if no props provided', () => {
    wrapper = mount(<PRSchedule isEditMode={ true } />);

    expect(wrapper.findByTestId('add-schedule').exists()).toBe(true);
  });

  it('not render a link "Add schedule" in View mode, if no props provided', () => {
    wrapper = mount(<PRSchedule />);

    expect(wrapper.findByTestId('add-schedule').exists()).toBe(false);
  });

  it('render TextLabels, if props are provided', () => {
    const frequency = 'Some frequency';
    wrapper = mount(<PRSchedule data={ { frequency } } />);

    expect(wrapper.contains(<TextLabel>RPO: </TextLabel>)).toBe(true);
    expect(
      wrapper.contains(
        <TextLabel type={ TextLabel.TEXT_LABEL_TYPE.PRIMARY }>
          {frequency}
        </TextLabel>
      )
    ).toBe(true);
  });
});
