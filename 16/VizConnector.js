//
// Copyright (c) 2019 Nutanix Inc. All rights reserved.
//
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styles from '../Styles';

const testId = 'viz-connector';

const VizConnector = forwardRef(({ children, style, isActive }, ref) => (
  <div
    data-testid={testId}
    style={Object.assign(
      {},
      styles.vizConnector,
      style,
      isActive ? styles.vizConnectorActive : {}
    )}
    ref={ref}
  >
    {children}
  </div>
));

VizConnector.propTypes = {
  /** Custom styles on div element **/
  style: PropTypes.object,
  /** Render the blue border around the box if true **/
  isActive: PropTypes.bool
};

VizConnector.testId = testId;

export default VizConnector;
