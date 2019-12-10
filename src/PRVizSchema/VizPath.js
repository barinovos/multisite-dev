//
// Copyright (c) 2019 Nutanix Inc. All rights reserved.
//
// An SVG Path Component.
//
import React from 'react';
import PropTypes from 'prop-types';

const testId = 'viz-path';

const VizPath = ({ d, style, width, height, isDisabled, isActive }) => (
  <svg
    style={ style }
    width={ width }
    height={ height }
    data-testid={ testId }
    className={ `viz-path${isDisabled ? ' disabled' : ''}${isActive ? ' active' : ''}` }
  >
    <path d={ d } />
  </svg>
);

VizPath.propTypes = {
  /** Custom style (position), which render as styles on SVG **/
  style: PropTypes.object,
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
