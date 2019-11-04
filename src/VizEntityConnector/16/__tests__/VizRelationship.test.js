import React from 'react'
import { render } from '@testing-library/react'
import VizRelationship from '../VizRelationship'

describe('VizRelationship', () => {
  it('should render children', () => {
    const testText = 'Test text'

    const { getByText } = render(
      <VizRelationship
        fromRef={Object.create(null)}
        toRef={Object.create(null)}
        direction={'any'}
      >
        {testText}
      </VizRelationship>
    )
    expect(getByText(testText)).toBeInTheDocument()
    expect(getByText(testText)).toBeVisible()
  })

  it('should render svg', () => {
    render(
      <VizRelationship
        fromRef={Object.create(null)}
        toRef={Object.create(null)}
        direction={'any'}
      />
    )
    expect(document.querySelector('svg')).toBeInTheDocument()
  })
})
