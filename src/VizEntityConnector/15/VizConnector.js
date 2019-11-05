//
// Copyright (c) 2019 Nutanix Inc. All rights reserved.
//
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Styles';

const testId = 'viz-connector';

const VizConnector = ({ children, style, isActive, assignRef }) => (
  <div
    data-testid={testId}
    style={Object.assign(
      {},
      styles.vizConnector,
      style,
      isActive ? styles.vizConnectorActive : {}
    )}
    ref={assignRef}
  >
    {children}
  </div>
);

VizConnector.propTypes = {
  /** Custom styles on div element **/
  style: PropTypes.object,
  /** Render the blue border around the box if true **/
  isActive: PropTypes.bool,
  // This is to pass the ref prop
  assignRef: PropTypes.func
};

VizConnector.testId = testId;

export default VizConnector;
