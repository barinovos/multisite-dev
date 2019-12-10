import React from 'react';
import { mount } from 'enzyme';
import PRLocationParent from './PRLocationParent';

describe('PRLocationParent component should', () => {
  it('render a link "Add Recovery Location", if no data provided', () => {
    const mockFn = jest.fn();
    const wrapper = mount(
      <PRLocationParent onCreate={ mockFn } isEditMode={ true } />
    );

    expect(wrapper.exists({ type: 'with-icon' })).toBe(true);
    wrapper.find({ type: 'with-icon' }).simulate('click');

    expect(mockFn).toHaveBeenCalled();
  });
});
