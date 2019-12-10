import React from 'react';
import VizConnector from '../VizConnector';

describe('VizConnector', () => {
  it('renders children', () => {
    const testText = 'Test text';

    const wrapper = mount(<VizConnector>{testText}</VizConnector>);
    expect(wrapper.findByTestId(VizConnector.testId).text()).toEqual(
      testText
    );
  });

  it('render className', () => {
    const testClass = 'test-class';
    const wrapper = mount(<VizConnector className={ testClass } />);
    expect(
      wrapper.findByTestId(VizConnector.testId).hasClass(testClass)
    ).toBe(true);
  });
});
