//
// Copyright (c) 2019 Nutanix Inc. All rights reserved.
//
// Path and lines utilities
//
import { DIRECTIONS } from './Constants';

export const calcPosition = (direction, fromRef, toRef, offset) => {
  const position = { position: 'absolute', zIndex: -1 };
  if (!direction || !fromRef) return position;
  switch (direction) {
    case DIRECTIONS.LEFT_TO_RIGHT:
      position.left = fromRef.offsetLeft + fromRef.clientWidth;
      position.top = offset.bottom
        ? fromRef.offsetTop + fromRef.clientHeight - offset.bottom
        : fromRef.offsetTop + offset.top;
      return position;
    case DIRECTIONS.LEFT_TOP_TO_RIGHT_DIAG:
      position.left = fromRef.offsetLeft + fromRef.clientWidth;
      position.top = fromRef.offsetTop + offset.top;
      return position;
    case DIRECTIONS.TOP_TO_BOTTOM:
      position.left = fromRef.offsetLeft + fromRef.clientWidth / 2;
      position.top = fromRef.offsetTop;
      return position;
    case DIRECTIONS.LEFT_BOTTOM_TO_RIGHT_DIAG:
      position.left = fromRef.offsetLeft + fromRef.clientWidth;
      position.top = toRef.offsetTop + offset.top;
      return position;
    default:
      return position;
  }
};

export const calcWidthHeightPath = (
  direction,
  fromRef,
  toRef,
  position,
  offset
) => {
  const params = { width: 0, height: 0, d: '' };
  if (!fromRef || !toRef || !direction || !position) return params;
  switch (direction) {
    case DIRECTIONS.LEFT_TO_RIGHT:
      params.width = Math.abs(toRef.offsetLeft - position.left);
      params.height = 1;
      params.d = `M 0 0 L ${params.width} 1`;
      return params;
    case DIRECTIONS.LEFT_TOP_TO_RIGHT_DIAG:
      params.width = Math.abs(toRef.offsetLeft - position.left);
      params.height = offset.bottom
        ? Math.abs(
            position.top -
              (toRef.offsetTop + toRef.clientHeight - offset.bottom)
          )
        : Math.abs(toRef.offsetTop - position.top) + offset.alternate;
      // in case it is 0 - straight line
      params.height = params.height || 1;
      params.d = `M 0 0 C ${params.width / 2} 0, ${params.width / 2} ${
        params.height
      } ${params.width} ${params.height}`;
      return params;
    case DIRECTIONS.TOP_TO_BOTTOM:
      params.width = 1;
      params.height = Math.abs(
        toRef.offsetTop - position.top + toRef.clientHeight
      );
      params.d = `M 0 0 L 1 ${params.height}`;
      return params;
    case DIRECTIONS.LEFT_BOTTOM_TO_RIGHT_DIAG:
      params.width = Math.abs(toRef.offsetLeft - position.left);
      params.height = offset.bottom
        ? Math.abs(fromRef.offsetTop + fromRef.clientHeight - position.top) -
          offset.bottom
        : Math.abs(fromRef.offsetTop - position.top) + offset.alternate;
      // in case it is 0 - straight line
      params.height = params.height || 1;
      params.d = `M 0 ${params.height} C ${params.width / 2} ${
        params.height
      }, ${params.width / 2} 0 ${params.width} 0`;
      return params;
    default:
      return params;
  }
};
