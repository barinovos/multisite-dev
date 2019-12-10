import React from 'react';
import VizRelationship from '../VizRelationship';

describe('VizRelationship', () => {
  it('should render svg (VizPath)', () => {
    const wrapper = mount(
      <VizRelationship
        fromRef={ Object.create(null) }
        toRef={ Object.create(null) }
        direction={ 'any' }
      />
    );

    expect(wrapper.exists('svg')).toBe(true);
  });
});
