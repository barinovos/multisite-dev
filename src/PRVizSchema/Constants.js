//
// Copyright (c) 2019 Nutanix Inc. All rights reserved.
//
// General constants
//
export const DIRECTIONS = {
  LEFT_TO_RIGHT: 'ltr',
  TOP_TO_BOTTOM: 'ttb',
  LEFT_TOP_TO_RIGHT_DIAG: 'lttrD',
  LEFT_BOTTOM_TO_RIGHT_DIAG: 'lbtrD'
};

/* We bound connectors to the fixed UI schema:
*  (Check VD for Multi-site for it)
*
*  Level----TOP-----Level
*    -   CENTER_TOP   -
*    LEFT          RIGHT
*    -  CENTER_BOTTOM -
*  Level---BOTTOM---Level
*
*/
export const CONNECTOR_POSITION = {
  TOP: 'TOP',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  BOTTOM: 'BOTTOM',
  CENTER_TOP: 'CENTER_TOP',
  CENTER_BOTTOM: 'CENTER_BOTTOM'
};

export const LEVELS = {
  PRIMARY: 0,
  SECOND: 1,
  THIRD: 2,
  FOURTH: 3
};

export const MIN_LEVEL_HEIGHT = 106;
export const MIN_CONNECTION_HEIGHT = 40;
export const TOP_OFFSET = 36;
export const BOTTOM_OFFSET = MIN_LEVEL_HEIGHT - TOP_OFFSET;
export const CONNECTION_TOP_OFFSET = MIN_CONNECTION_HEIGHT / 2;
