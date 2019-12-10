import React from 'react';
import VizLevel from '../VizLevel';

describe('VizLevel should', () => {
  it('render children', () => {
    const testText = 'Test text';

    const wrapper = mount(<VizLevel>{testText}</VizLevel>);
    expect(wrapper.findByTestId(VizLevel.testId).text()).toEqual(testText);
  });

  it('render className', () => {
    const className = 'active';

    const wrapper = mount(<VizLevel className={ className } />);
    expect(
      wrapper.findByTestId(VizLevel.testId).hasClass('viz-level active')
    ).toBe(true);
  });
});
