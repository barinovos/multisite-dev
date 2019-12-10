import React from 'react';
import VizPath from '../VizPath';

const pathSelector = 'path';

describe('VizPath', () => {
  it('renders d attribute on Path element and default class', () => {
    const d = 'M 0 0 L 1 1';

    const wrapper = mount(<VizPath d={ d } />);
    const element = wrapper.find(pathSelector);
    expect(element.prop('d')).toEqual(d);
    expect(wrapper.findByTestId(VizPath.testId).hasClass('viz-path')).toBe(
      true
    );
  });

  it('renders width and height', () => {
    const d = 'M 0 0 L 100 1';
    const width = 100;
    const height = 1;

    const wrapper = mount(<VizPath d={ d } width={ width } height={ height } />);
    expect(wrapper.findByTestId(VizPath.testId).prop('width')).toEqual(
      width
    );
    expect(wrapper.findByTestId(VizPath.testId).prop('height')).toEqual(
      height
    );
  });

  it('renders custom styles', () => {
    const style = { top: '100px' };
    const d = 'M 0 0 L 1 1';

    const wrapper = mount(<VizPath d={ d } style={ style } />);
    expect(wrapper.findByTestId(VizPath.testId).prop('style').top).toEqual(
      style.top
    );
  });

  it('renders different class on Path element when isActive', () => {
    const d = 'M 0 0 L 1 1';

    const wrapper = mount(<VizPath d={ d } isActive={ true } />);
    expect(
      wrapper.findByTestId(VizPath.testId).hasClass('viz-path active')
    ).toBe(true);
  });

  it('renders different class on Path element when isDisabled', () => {
    const d = 'M 0 0 L 1 1';

    const wrapper = mount(<VizPath d={ d } isDisabled={ true } />);
    expect(
      wrapper.findByTestId(VizPath.testId).hasClass('viz-path disabled')
    ).toBe(true);
  });
});
