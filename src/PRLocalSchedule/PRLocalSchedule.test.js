import React from 'react';
import { TextLabel } from 'prism-reactjs';
import PRLocalSchedule from './PRLocalSchedule';

describe('PRLocalSchedule component should', () => {
  it('render text labels', () => {
    const wrapper = shallow(<PRLocalSchedule />);

    expect(wrapper.contains(<TextLabel>RPO: </TextLabel>)).toBe(false);
    expect(wrapper.contains(<TextLabel>Retention: </TextLabel>)).toBe(true);
  });

  it('render text labels', () => {
    const wrapper = mount(<PRLocalSchedule />);

    expect(wrapper.contains(<TextLabel>RPO: </TextLabel>)).toBe(true);
    expect(wrapper.contains(<TextLabel>Retention: </TextLabel>)).toBe(false);
  });

  it('render props, show all after Collapsible expanded', () => {
    const frequency = '4 hours';
    const rpThreshold = 10;
    const type = 'App consistent';
    const wrapper = mount(
      <PRLocalSchedule
        frequency={ frequency }
        rpThreshold={ rpThreshold }
        type={ type }
      />
    );
    wrapper
      .findByTestId('pr-collapsible')
      .at(0)
      .simulate('click');

    expect(
      wrapper.contains(
        <TextLabel type={ TextLabel.TEXT_LABEL_TYPE.PRIMARY }>
          {frequency}
        </TextLabel>
      )
    ).toBe(true);
    expect(
      wrapper.contains(
        <TextLabel type={ TextLabel.TEXT_LABEL_TYPE.PRIMARY }>
          {rpThreshold} Recovery Points
        </TextLabel>
      )
    ).toBe(true);
    expect(
      wrapper.contains(
        <TextLabel className="pr-margin-bottom">{type}</TextLabel>
      )
    ).toBe(true);
  });
});
