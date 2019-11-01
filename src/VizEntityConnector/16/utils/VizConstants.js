//
// Copyright (c) 2019 Nutanix Inc. All rights reserved.
//
// General constants
//
export const DIRECTIONS = {
  LEFT : 'L',
  RIGHT: 'R',
  //  new ones
  LEFT_TO_RIGHT: 'ltr',
  TOP_TO_BOTTOM: 'ttb',
  LEFT_TOP_TO_RIGHT_DIAG: 'lttrD',
  LEFT_BOTTOM_TO_RIGHT_DIAG: 'lbtrD'
}

export const LEVEL_WIDTH = 300
export const CONNECTOR_WIDTH = 270
export const MIN_LEVEL_HEIGHT = 106
export const MIN_CONNECTION_HEIGHT = 40
export const MAX_LEVELS = 3
export const TOP_OFFSET = 36
export const BOTTOM_OFFSET = MIN_LEVEL_HEIGHT - TOP_OFFSET
export const CONNECTION_TOP_OFFSET = MIN_CONNECTION_HEIGHT / 2
export const FROM = 'from'
export const TO = 'to'
export const CONNECTION = 'connection'

export const Colors = {
  gray1: '#f3f4f5',
  gray0: ' #b8bfca',
  blue: '#22a5f7'
}

export const DASH_STROKE = '5,5'
export const NO_DASH_STROKE = '0'
