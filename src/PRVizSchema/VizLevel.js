//
// Copyright (c) 2019 Nutanix Inc. All rights reserved.
//
import React from 'react';
import PropTypes from 'prop-types';

const testId = 'viz-level';

const VizLevel = ({ children, className, assignRef }) => (
  <div
    className={ `viz-level ${className || ''}` }
    ref={ assignRef }
    data-testid={ testId }
  >
    {children}
  </div>
);

VizLevel.propTypes = {
  /** Class on div element **/
  className: PropTypes.string,
  // This is to pass the ref prop
  assignRef: PropTypes.func
};

VizLevel.testId = testId;

export default VizLevel;
