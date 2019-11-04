import React from 'react'
import { render } from '@testing-library/react'
import VizPath from '../VizPath'
import { Colors, DASH_STROKE, NO_DASH_STROKE } from '../utils/VizConstants'

const pathSelector = 'path'

describe('VizPath', () => {
  it('renders d attribute on Path element and default attrs', () => {
    const d = 'M 0 0 L 1 1'

    render(<VizPath d={d} />)
    const element = document.querySelector(pathSelector)
    expect(element).toHaveAttribute('d', d)
    expect(element).toHaveAttribute('stroke', Colors.gray0)
    expect(element).toHaveAttribute('stroke-dasharray', NO_DASH_STROKE)
  })

  it('renders width and height', () => {
    const d = 'M 0 0 L 100 1'
    const width = 100
    const height = 1

    const { getByTestId } = render(<VizPath d={d} width={width} height={height}/>)
    expect(getByTestId(VizPath.testId)).toHaveAttribute('width', width + '')
    expect(getByTestId(VizPath.testId)).toHaveAttribute('height', height + '')
  })

  it('renders position as a style', () => {
    const position = { top: '100px' }
    const d = 'M 0 0 L 1 1'

    const { getByTestId } = render(<VizPath d={d} position={position} />)
    expect(getByTestId(VizPath.testId)).toHaveStyle(
      JSON.stringify(position).replace(/[{}"]/gi, '')
    )
  })

  it('renders different stroke attr on Path element when Active', () => {
    const d = 'M 0 0 L 1 1'

    render(<VizPath d={d} isActive />)
    expect(document.querySelector(pathSelector)).toHaveAttribute('stroke', Colors.blue)
  })

  it('renders different stroke-dasharray attr on Path element when Active', () => {
    const d = 'M 0 0 L 1 1'

    render(<VizPath d={d} isDisabled />)
    expect(document.querySelector(pathSelector)).toHaveAttribute('stroke-dasharray', DASH_STROKE)
  })
})
