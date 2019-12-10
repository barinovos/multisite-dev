import React from 'react';
import { Link } from 'prism-reactjs';
import Collapsible from './Collapsible';

let wrapper;

describe('Collapsible component should', () => {
  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  describe('some group (logic', () => {
    it('render at least Link if no props provided', () => {
      wrapper = mount(<Collapsible />);

      expect(wrapper.contains(<Link type="expandable" />)).toBe(true);
    });

    it('render Link which is collapsed by default', () => {
      wrapper = mount(<Collapsible />);

      expect(wrapper.exists({ expanded: false })).toBe(true);
    });
  });

  it('not render a children, until is expanded', () => {
    const children = <span>Hello</span>;
    wrapper = mount(<Collapsible>{children}</Collapsible>);

    expect(wrapper.contains(children)).toBe(false);
  });

  it('render a children after on header click (expanded)', () => {
    const children = <span>Hello</span>;
    wrapper = mount(<Collapsible>{children}</Collapsible>);

    wrapper.findByTestId('pr-collapsible').at(0).simulate('click');

    expect(wrapper.contains(children)).toBe(true);
  });

  it('render header', () => {
    const header = <span>I am a header</span>;
    wrapper = mount(<Collapsible header={ header } />);

    expect(wrapper.contains(header)).toBe(true);
  });
});
