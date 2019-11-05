//
// Copyright (c) 2019 Nutanix Inc. All rights reserved.
//
// An SVG Path Component.
//
import React from 'react'
import PropTypes from 'prop-types'
import { Colors, DASH_STROKE, NO_DASH_STROKE } from './utils/VizConstants'

const testId = 'viz-path'

const VizPath = ({ d, position, width, height, isDisabled, isActive }) => (
  <svg style={position} width={width} height={height} data-testid={testId}>
    <path
      d={d}
      stroke={isActive ? Colors.blue : Colors.gray0}
      strokeDasharray={isDisabled ? DASH_STROKE : NO_DASH_STROKE}
      fill="none"
    />
  </svg>
)

VizPath.propTypes = {
  /** Custom position, which render as styles on SVG **/
  position: PropTypes.object,
  /** Path coordinates **/
  d: PropTypes.string.isRequired,
  /** Render the dashed line if true **/
  isDisabled: PropTypes.bool,
  /** Render the blue line if true **/
  isActive: PropTypes.bool,
  /** The actual Width of the SVG **/
  width: PropTypes.number,
  /** The actual Height of the SVG **/
  height: PropTypes.number
}

VizPath.testId = testId

export default VizPath
