//
// Copyright (c) 2019 Nutanix Inc. All rights reserved.
//
import React from 'react';
import PropTypes from 'prop-types';
import { calcPosition, calcWidthHeightPath } from './Util';
import VizPath from './VizPath';

const VizRelationship = ({
  fromRef,
  toRef,
  direction,
  isDisabled = false,
  isActive = false,
  offset
}) => {
  if (!fromRef || !toRef) return null;

  const position = calcPosition(direction, fromRef, toRef, offset);
  const { width, height, d } = calcWidthHeightPath(
    direction,
    fromRef,
    toRef,
    position,
    offset
  );
  return (
      <VizPath
        position={position}
        width={width}
        height={height}
        d={d}
        isActive={isActive}
        isDisabled={isDisabled}
      />
  );
};

VizRelationship.propTypes = {
  fromRef: PropTypes.object.isRequired,
  toRef: PropTypes.object.isRequired,
  connectionRef: PropTypes.object,
  direction: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  isActive: PropTypes.bool,
  offset: PropTypes.shape({
    top: PropTypes.number,
    alternate: PropTypes.number,
    bottom: PropTypes.number
  })
};

export default VizRelationship;
