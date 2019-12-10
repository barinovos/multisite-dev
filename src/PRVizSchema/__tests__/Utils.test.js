//
// Copyright (c) 2019 Nutanix Inc. All rights reserved.
//
// Path and lines utilities
//
import { DIRECTIONS, TOP_OFFSET } from '../Constants';
import { calcPosition, calcWidthHeightPath } from '../Util';

const fromRef = {
  offsetLeft: 100,
  offsetTop: 100,
  clientWidth: 200,
  clientHeight: 100
};

const toRef = {
  offsetLeft: 200,
  offsetTop: 100,
  clientWidth: 200,
  clientHeight: 100
};

describe('Viz Utils', () => {
  describe('calcPosition should return proper result for ', () => {
    it('DIRECTIONS.LEFT_TO_RIGHT', () => {
      const offset = { top: TOP_OFFSET };
      const result = calcPosition(
        DIRECTIONS.LEFT_TO_RIGHT,
        fromRef,
        toRef,
        offset
      );

      expect(result.position).toEqual('absolute');
      expect(result.zIndex).toEqual(-1);
      expect(result.left).toEqual(fromRef.offsetLeft + fromRef.clientWidth);
      expect(result.top).toEqual(fromRef.offsetTop + offset.top);
    });

    it('DIRECTIONS.LEFT_TO_RIGHT with bottom offset', () => {
      const offset = { bottom: TOP_OFFSET };
      const result = calcPosition(
        DIRECTIONS.LEFT_TO_RIGHT,
        fromRef,
        toRef,
        offset
      );

      expect(result.left).toEqual(fromRef.offsetLeft + fromRef.clientWidth);
      expect(result.top).toEqual(
        fromRef.offsetTop + (fromRef.clientHeight - offset.bottom)
      );
    });

    it('DIRECTIONS.TOP_TO_BOTTOM', () => {
      const offset = { top: TOP_OFFSET };
      const result = calcPosition(
        DIRECTIONS.TOP_TO_BOTTOM,
        fromRef,
        toRef,
        offset
      );

      expect(result.left).toEqual(fromRef.offsetLeft + (fromRef.clientWidth / 2));
      expect(result.top).toEqual(fromRef.offsetTop);
    });
  });

  describe('calcWidthHeightPath should return proper result for ', () => {
    it('DIRECTIONS.LEFT_TO_RIGHT', () => {
      const offset = { top: TOP_OFFSET };
      const position = {
        left: 300
      };
      const result = calcWidthHeightPath(
        DIRECTIONS.LEFT_TO_RIGHT,
        fromRef,
        toRef,
        position,
        offset
      );

      expect(result.width).toEqual(Math.abs(toRef.offsetLeft - position.left));
      expect(result.height).toEqual(1);
      expect(result.d).toEqual(`M 0 0 L ${result.width} 1`);
    });
  });
});
