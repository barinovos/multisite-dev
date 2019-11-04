import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import styles from './Styles'

const testId = 'viz-level'

const VizLevel = forwardRef(({ children, style }, ref) => (
  <div style={{ ...styles.vizLevel, ...style }} ref={ref} data-testid={testId}>
    {children}
  </div>
))

VizLevel.propTypes = {
  /** Custom styles on div element **/
  style: PropTypes.object
}

VizLevel.testId = testId

export default VizLevel
