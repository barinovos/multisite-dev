//
// Copyright (c) 2019 Nutanix Inc. All rights reserved.
//
// An SVG Path Component.
//
import React from 'react';
import PropTypes from 'prop-types';

const testId = 'viz-path';

const VizPath = ({ d, position, width, height, isDisabled, isActive }) => (
  <svg style={position} width={width} height={height} data-testid={testId}>
    <path
      d={d}
      className={`viz-path ${
        isDisabled ? 'disabled' : isActive ? 'active' : ''
      }`}
    />
  </svg>
);

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
};

VizPath.testId = testId;

export default VizPath;
