//
// Copyright (c) 2019 Nutanix Inc. All rights reserved.
//
// An SVG Path Component.
//
import React from 'react'
import PropTypes from 'prop-types'
import { Colors, DASH_STROKE, NO_DASH_STROKE } from './utils/VizConstants'

const VizPath = ({
  d,
  style,
  isDisabled,
  isActive,
  position,
  width,
  height
}) => (
  <svg style={position} width={width} height={height}>
    <path
      d={d}
      style={style}
      stroke={isActive ? Colors.blue : Colors.gray0}
      strokeDasharray={isDisabled ? DASH_STROKE : NO_DASH_STROKE}
      fill="none"
    />
  </svg>
)

VizPath.propTypes = {
  /** Custom styles **/
  style: PropTypes.object,
  /** Path coordinates **/
  d: PropTypes.string.isRequired,
  /** Render the dashed line if true **/
  isDisabled: PropTypes.bool,
  /** Render the blue line if true **/
  isActive: PropTypes.bool,
  position: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number
}

export default VizPath
