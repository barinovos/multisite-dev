//
// Copyright (c) 2019 Nutanix Inc. All rights reserved.
//
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  Fragment
} from 'react'
import PropTypes from 'prop-types'
import VizRelationship from './VizRelationship'
import VizLevel from './VizLevel'
import VizConnector from './VizConnector'
import {
  DIRECTIONS,
  MAX_LEVELS,
  TOP_OFFSET,
  BOTTOM_OFFSET,
  CONNECTION_TOP_OFFSET,
  CONNECTION,
  FROM,
  TO
} from './utils/VizConstants'
import { useEventListener } from './useEventListener'
import styles from './Styles'

const VizEntityConnector = ({
  levels = [],
  connectors = [],
  activeConnection,
  disabledConnection
}) => {
  const [refs, setRefs] = useState({})
  const [updateTrigger, triggerUpdate] = useState({})
  const primaryRef = useRef(null)
  const secondaryRef = useRef(null)
  const thirdRef = useRef(null)
  const fourthRef = useRef(null)
  const diagonalConnectionOneRef = useRef(null)
  const diagonalConnectionTwoRef = useRef(null)
  const level = levels.length

  useEffect(() => {
    if (primaryRef.current) {
      const currentRefs = {
        PRIME_TO_SECONDARY: {
          from: primaryRef.current,
          to: secondaryRef.current,
          direction: DIRECTIONS.LEFT_TO_RIGHT,
          connectionIndex: 0
        }
      }
      if (level > MAX_LEVELS - 1 && thirdRef && thirdRef.current) {
        currentRefs.PRIME_TO_THIRD = {
          from: primaryRef.current,
          to: thirdRef.current,
          connection: diagonalConnectionOneRef.current,
          direction: DIRECTIONS.LEFT_TOP_TO_RIGHT_DIAG,
          connectionIndex: 1
        }
        currentRefs.SECOND_TO_THIRD = {
          from: secondaryRef.current,
          to: thirdRef.current,
          direction: DIRECTIONS.TOP_TO_BOTTOM,
          connectionIndex: 2
        }
      }
      if (level > MAX_LEVELS && fourthRef && fourthRef.current) {
        currentRefs.PRIME_TO_FOURTH = {
          from: primaryRef.current,
          to: fourthRef.current,
          direction: DIRECTIONS.TOP_TO_BOTTOM,
          connectionIndex: 3
        }
        currentRefs.FOURTH_TO_SECONDARY = {
          from: fourthRef.current,
          to: secondaryRef.current,
          connection: diagonalConnectionTwoRef.current,
          direction: DIRECTIONS.LEFT_BOTTOM_TO_RIGHT_DIAG,
          connectionIndex: 4
        }
        currentRefs.FOURTH_TO_THIRD = {
          from: fourthRef.current,
          to: thirdRef.current,
          direction: DIRECTIONS.LEFT_TO_RIGHT,
          connectionIndex: 5
        }
      }
      setRefs(currentRefs)
    }
  }, [primaryRef, level, updateTrigger])

  const handler = useCallback(() => triggerUpdate({}), [triggerUpdate])
  useEventListener('resize', handler)

  // We accept minimum 2 levels of Connection with at least 1 connection in between
  if (!level || level < MAX_LEVELS - 1 || !connectors.length)
    return <div>Error! Levels and connections required</div>

  const defaultOffset = { top: TOP_OFFSET }
  const FlexPlaceholder = <VizConnector style={{ visibility: 'hidden' }} />
  const renderRelationship = (
    data,
    withConnector = true,
    offset = defaultOffset,
    fromField = FROM,
    toField = TO
  ) => (
    <VizRelationship
      fromRef={data[fromField]}
      toRef={data[toField]}
      direction={data.direction}
      offset={offset}
      isDisabled={disabledConnection === data.connectionIndex}
      isActive={activeConnection === data.connectionIndex}
    >
      {withConnector && (
        <VizConnector isActive={activeConnection === data.connectionIndex}>
          {connectors[data.connectionIndex]}
        </VizConnector>
      )}
    </VizRelationship>
  )

  return (
    <div style={styles.container}>
      <div style={styles.row}>
        <div style={styles.column}>
          {/* Always start from 0 to render Primary location */}
          <VizLevel ref={primaryRef}>{levels[0]}</VizLevel>
          {refs.PRIME_TO_FOURTH && renderRelationship(refs.PRIME_TO_FOURTH)}
          {level > MAX_LEVELS && (
            <VizLevel ref={fourthRef}>{levels[MAX_LEVELS]}</VizLevel>
          )}
        </div>
        <div style={{ ...styles.column, ...styles.middleColumn }}>
          <Fragment>
            {refs.PRIME_TO_SECONDARY &&
              renderRelationship(refs.PRIME_TO_SECONDARY)}
            {refs.PRIME_TO_THIRD ? (
              <Fragment>
                {renderRelationship(
                  refs.PRIME_TO_THIRD,
                  false,
                  {
                    top: TOP_OFFSET,
                    alternate: CONNECTION_TOP_OFFSET
                  },
                  FROM,
                  CONNECTION
                )}
                {renderRelationship(
                  refs.PRIME_TO_THIRD,
                  false,
                  {
                    top: CONNECTION_TOP_OFFSET,
                    alternate: TOP_OFFSET,
                    bottom: BOTTOM_OFFSET
                  },
                  CONNECTION,
                  TO
                )}
              </Fragment>
            ) : (
              FlexPlaceholder
            )}
            {level > MAX_LEVELS - 1 && (
              <VizConnector
                ref={diagonalConnectionOneRef}
                style={{ ...styles.vizConnectorAbsolute, top: '30%' }}
                isActive={activeConnection === 1}
              >
                {connectors[1]}
              </VizConnector>
            )}
            {refs.FOURTH_TO_SECONDARY && (
              <Fragment>
                {renderRelationship(
                  refs.FOURTH_TO_SECONDARY,
                  false,
                  {
                    top: CONNECTION_TOP_OFFSET,
                    alternate: TOP_OFFSET,
                    bottom: BOTTOM_OFFSET
                  },
                  FROM,
                  CONNECTION
                )}
                {renderRelationship(
                  refs.FOURTH_TO_SECONDARY,
                  false,
                  { top: TOP_OFFSET, alternate: CONNECTION_TOP_OFFSET },
                  CONNECTION,
                  TO
                )}
              </Fragment>
            )}
            {level > MAX_LEVELS && (
              <VizConnector
                ref={diagonalConnectionTwoRef}
                style={{ ...styles.vizConnectorAbsolute, top: '60%' }}
                isActive={activeConnection === 4}
              >
                {connectors[MAX_LEVELS + 1]}
              </VizConnector>
            )}
            {refs.FOURTH_TO_THIRD
              ? renderRelationship(refs.FOURTH_TO_THIRD, true, {
                  bottom: BOTTOM_OFFSET
                })
              : FlexPlaceholder}
          </Fragment>
        </div>
        <div style={styles.column}>
          <VizLevel ref={secondaryRef}>{levels[1]}</VizLevel>
          {refs.SECOND_TO_THIRD
            ? renderRelationship(refs.SECOND_TO_THIRD)
            : FlexPlaceholder}
          {level > MAX_LEVELS - 1 && (
            <Fragment>
              <VizLevel ref={thirdRef}>{levels[MAX_LEVELS - 1]}</VizLevel>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  )
}

VizEntityConnector.propTypes = {
  levels: PropTypes.arrayOf(PropTypes.element).isRequired,
  connectors: PropTypes.arrayOf(PropTypes.element).isRequired,
  activeConnection: PropTypes.number,
  disabledConnection: PropTypes.number
}

export default VizEntityConnector
