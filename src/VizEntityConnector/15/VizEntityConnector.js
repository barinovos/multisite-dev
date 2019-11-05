//
// Copyright (c) 2019 Nutanix Inc. All rights reserved.
//
import React from 'react';
import PropTypes from 'prop-types';
import VizRelationship from './VizRelationship';
import VizLevel from './VizLevel';
import VizConnector from './VizConnector';
import {
  DIRECTIONS,
  MAX_LEVELS,
  TOP_OFFSET,
  BOTTOM_OFFSET,
  CONNECTION_TOP_OFFSET,
  CONNECTION,
  FROM,
  TO
} from '../utils/VizConstants';
import styles from '../Styles';

const defaultOffset = { top: TOP_OFFSET };

class VizEntityConnector extends React.Component {
  state = {
    refs: {}
  };

  constructor(props) {
    super(props);

    // We collect all the Refs here to have a better support from IDE
    this.primaryRef = null;
    this.secondaryRef = null;
    this.thirdRef = null;
    this.fourthRef = null;
    this.diagonalConnectionOneRef = null;
    this.diagonalConnectionTwoRef = null;
    this.setRefs = this.setRefs.bind(this);

    // Subscribe for Resize event and update refs
    window.addEventListener('resize', this.setRefs, false);
  }

  componentDidMount() {
    // Wait for all the DOM refs to be defined after mount
    // and reset them
    this.setRefs();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { levels, connectors } = this.props;
    // Only Levels and Connectors matters to get a DOM access and set refs again
    if (nextProps.levels !== levels || nextProps.connectors !== connectors) {
      // This is ugly, I know - we should wait for Refs to re-calculate position
      // and only then set state.refs
      // 10 - is just a random number here, bigger than 0
      setTimeout(this.setRefs, 10);
    }
  }

  /*
   * Unsubscribe from Resize event on unmount
   * */
  componentWillUnmount() {
    window.removeEventListener('resize', this.setRefs, false);
  }

  /*
   * Currently the directions and order of Levels are hardcoded
   * but later we can make it more universe and configurable
   * */
  setRefs() {
    const level = this.props.levels.length;

    const currentRefs = {
      PRIME_TO_SECONDARY: {
        from: this.primaryRef,
        to: this.secondaryRef,
        direction: DIRECTIONS.LEFT_TO_RIGHT,
        connectionIndex: 0
      }
    };
    if (level > MAX_LEVELS - 1 && this.thirdRef) {
      currentRefs.PRIME_TO_THIRD = {
        from: this.primaryRef,
        to: this.thirdRef,
        connection: this.diagonalConnectionOneRef,
        direction: DIRECTIONS.LEFT_TOP_TO_RIGHT_DIAG,
        connectionIndex: 1
      };
      currentRefs.SECOND_TO_THIRD = {
        from: this.secondaryRef,
        to: this.thirdRef,
        direction: DIRECTIONS.TOP_TO_BOTTOM,
        connectionIndex: 2
      };
    }
    if (level > MAX_LEVELS && this.fourthRef) {
      currentRefs.PRIME_TO_FOURTH = {
        from: this.primaryRef,
        to: this.fourthRef,
        direction: DIRECTIONS.TOP_TO_BOTTOM,
        connectionIndex: 3
      };
      currentRefs.FOURTH_TO_SECONDARY = {
        from: this.fourthRef,
        to: this.secondaryRef,
        connection: this.diagonalConnectionTwoRef,
        direction: DIRECTIONS.LEFT_BOTTOM_TO_RIGHT_DIAG,
        connectionIndex: 4
      };
      currentRefs.FOURTH_TO_THIRD = {
        from: this.fourthRef,
        to: this.thirdRef,
        direction: DIRECTIONS.LEFT_TO_RIGHT,
        connectionIndex: 5
      };
    }
    this.setState({ refs: currentRefs });
  }

  renderRelationship(
    data,
    withConnector = true,
    offset = defaultOffset,
    fromField = FROM,
    toField = TO
  ) {
    const { connectors, activeConnection, disabledConnection } = this.props;
    if (!data) return null;

    return (
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
    );
  }

  render() {
    const { levels, connectors, activeConnection } = this.props;
    const { refs } = this.state;
    const level = levels.length;

    // We accept minimum 2 levels of Connection with at least 1 connection in between
    // if nothing provided - nothing rendered
    if (!level || level < MAX_LEVELS - 1 || !connectors.length) return null;

    const FlexPlaceholder = <VizConnector style={{ visibility: 'hidden' }} />;

    return (
      <div style={styles.container}>
        <div style={styles.row}>
          <div style={styles.column}>
            {/* Always start from 0 to render Primary location */}
            <VizLevel assignRef={ref => (this.primaryRef = ref)}>
              {levels[0]}
            </VizLevel>
            {this.renderRelationship(refs.PRIME_TO_FOURTH)}
            {level > MAX_LEVELS && (
              <VizLevel assignRef={ref => (this.fourthRef = ref)}>
                {levels[MAX_LEVELS]}
              </VizLevel>
            )}
          </div>
          <div style={{ ...styles.column, ...styles.middleColumn }}>
            {this.renderRelationship(refs.PRIME_TO_SECONDARY)}
            {refs.PRIME_TO_THIRD ? (
              <div>
                {this.renderRelationship(
                  refs.PRIME_TO_THIRD,
                  false,
                  {
                    top: TOP_OFFSET,
                    alternate: CONNECTION_TOP_OFFSET
                  },
                  FROM,
                  CONNECTION
                )}
                {this.renderRelationship(
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
              </div>
            ) : (
              FlexPlaceholder
            )}
            {/* 30% is the offset of the second row */}
            {level > MAX_LEVELS - 1 && (
              <VizConnector
                assignRef={ref => (this.diagonalConnectionOneRef = ref)}
                style={{ ...styles.vizConnectorAbsolute, top: '30%' }}
                isActive={activeConnection === 1}
              >
                {connectors[1]}
              </VizConnector>
            )}
            {refs.FOURTH_TO_SECONDARY && (
              <div>
                {this.renderRelationship(
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
                {this.renderRelationship(
                  refs.FOURTH_TO_SECONDARY,
                  false,
                  { top: TOP_OFFSET, alternate: CONNECTION_TOP_OFFSET },
                  CONNECTION,
                  TO
                )}
              </div>
            )}
            {/* 60% is the offset of the third row and 4 is hardcoded for a moment */}
            {level > MAX_LEVELS && (
              <VizConnector
                assignRef={ref => (this.diagonalConnectionTwoRef = ref)}
                style={{ ...styles.vizConnectorAbsolute, top: '60%' }}
                isActive={activeConnection === 4}
              >
                {connectors[MAX_LEVELS + 1]}
              </VizConnector>
            )}
            {refs.FOURTH_TO_THIRD
              ? this.renderRelationship(refs.FOURTH_TO_THIRD, true, {
                  bottom: BOTTOM_OFFSET
                })
              : FlexPlaceholder}
          </div>
          <div style={styles.column}>
            <VizLevel assignRef={ref => (this.secondaryRef = ref)}>
              {levels[1]}
            </VizLevel>
            {refs.SECOND_TO_THIRD
              ? this.renderRelationship(refs.SECOND_TO_THIRD)
              : FlexPlaceholder}
            {level > MAX_LEVELS - 1 && (
              <VizLevel assignRef={ref => (this.thirdRef = ref)}>
                {levels[MAX_LEVELS - 1]}
              </VizLevel>
            )}
          </div>
        </div>
      </div>
    );
  }
}

VizEntityConnector.defaultProps = {
  levels: [],
  connectors: []
};

VizEntityConnector.propTypes = {
  levels: PropTypes.arrayOf(PropTypes.element).isRequired,
  connectors: PropTypes.arrayOf(PropTypes.element).isRequired,
  activeConnection: PropTypes.number,
  disabledConnection: PropTypes.number
};

export default VizEntityConnector;
