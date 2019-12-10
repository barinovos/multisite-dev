//
// Copyright (c) 2019 Nutanix Inc. All rights reserved.
//
import React from 'react';
import PropTypes from 'prop-types';

const testId = 'viz-connector';

const VizConnector = ({ children, className, assignRef }) => (
  <div
    data-testid={ testId }
    className={ className }
    ref={ assignRef }
  >
    {children}
  </div>
);

VizConnector.propTypes = {
  /** Class on div element **/
  className: PropTypes.string,
  // This is to pass the ref prop
  assignRef: PropTypes.func
};

VizConnector.testId = testId;

export default VizConnector;
