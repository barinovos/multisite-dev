//
// Copyright (c) 2019 Nutanix Inc. All rights reserved.
//
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Styles';

const testId = 'viz-level';

const VizLevel = ({ children, style, assignRef }) => (
  <div
    style={{ ...styles.vizLevel, ...style }}
    ref={assignRef}
    data-testid={testId}
  >
    {children}
  </div>
);

VizLevel.propTypes = {
  /** Custom styles on div element **/
  style: PropTypes.object,
  // This is to pass the ref prop
  assignRef: PropTypes.func
};

VizLevel.testId = testId;

export default VizLevel;
