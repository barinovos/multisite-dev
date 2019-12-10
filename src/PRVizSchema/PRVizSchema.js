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
  CONNECTOR_POSITION,
  TOP_OFFSET,
  LEVELS,
  BOTTOM_OFFSET,
  CONNECTION_TOP_OFFSET
} from './Constants';
// eslint-disable-next-line import/no-unassigned-import
import './styles.css';

const defaultOffset = { top: TOP_OFFSET };

class PRVizSchema extends React.Component {

  constructor(props) {
    super(props);

    // Library pattern for DOM refs: id => ref
    this.domRefs = {};
    // By default it is null, DOM refs are not ready
    this.state = {
      refsReady: null
    };
    this.setRefs = this.setRefs.bind(this);

    // Subscribe for Resize event and update refs
    window.addEventListener('resize', this.setRefs, false);
  }

  componentDidMount() {
    // Wait for all the DOM refs to be defined after mount
    // and reset them
    this.setRefs();
  }

  componentWillReceiveProps() {
    this.setState({ refsReady: null });
    // This is the workaround (10 is random):
    // we should wait for Refs to re-calculate position
    // and only then set state.refs
    setTimeout(this.setRefs, 10);
  }

  /*
   * Unsubscribe from Resize event on unmount
   * */
  componentWillUnmount() {
    window.removeEventListener('resize', this.setRefs, false);
  }

  /*
   * Trigger to re-render the component
   * */
  setRefs() {
    this.setState({ refsReady: {} });
  }

  renderLevel(index) {
    const { levels } = this.props;
    return levels[index] ? (
      <VizLevel assignRef={ ref => (this.domRefs[levels[index].id] = ref) }>
        {levels[index].element}
      </VizLevel>
    ) : <VizLevel className="viz-hidden" />;
  }

  renderConnection(position) {
    const { connectors } = this.props;
    const connection = connectors.find(con => con.position === position);
    return connection ? (
      <VizConnector
        assignRef={ ref => (this.domRefs[connection.id] = ref) }
        className={ getConnectorClassName(position) }
      >
        {connection.element}
      </VizConnector>
    ) : <VizConnector className="viz-hidden" />;
  }

  render() {
    const { levels, connectors } = this.props;
    // At least 1 level required
    return levels.length ? (
      <div className="viz-container">
        <div className="viz-row">
          <div className="viz-column">
            {this.renderLevel(LEVELS.PRIMARY)}
            {this.renderConnection(CONNECTOR_POSITION.LEFT)}
            {this.renderLevel(LEVELS.FOURTH)}
          </div>
          <div className="viz-column viz-column-middle">
            {this.renderConnection(CONNECTOR_POSITION.TOP)}
            {this.renderConnection(CONNECTOR_POSITION.CENTER_TOP)}
            {this.renderConnection(CONNECTOR_POSITION.CENTER_BOTTOM)}
            {this.renderConnection(CONNECTOR_POSITION.BOTTOM)}
          </div>
          <div className="viz-column">
            {this.renderLevel(LEVELS.SECOND)}
            {this.renderConnection(CONNECTOR_POSITION.RIGHT)}
            {this.renderLevel(LEVELS.THIRD)}
          </div>
        </div>
        {this.state.refsReady && renderSVGs(this.domRefs, connectors)}
      </div>
    ) : null;
  }

}

PRVizSchema.defaultProps = {
  levels: [],
  connectors: []
};

PRVizSchema.propTypes = {
  levels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      element: PropTypes.element
    })
  ).isRequired,
  connectors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      fromId: PropTypes.string,
      toId: PropTypes.string,
      direction: PropTypes.oneOf(Object.values(DIRECTIONS)),
      position: PropTypes.oneOf(Object.values(CONNECTOR_POSITION)),
      disabled: PropTypes.bool,
      active: PropTypes.bool,
      element: PropTypes.element
    })
  ).isRequired
};

export default PRVizSchema;

/**
 * Get class name by position
 * @param {string} position - string value
 * @returns {string} - class name
 */
function getConnectorClassName(position) {
  const baseClass = 'viz-connector';
  switch (position) {
    case CONNECTOR_POSITION.CENTER_TOP:
      return `${baseClass} center-top`;
    case CONNECTOR_POSITION.CENTER_BOTTOM:
      return `${baseClass} center-bottom`;
    default:
      return baseClass;
  }
}

/**
 * Render SVGs
 * @param {Object} domRefs - refs
 * @param {Array} connectors - schemas
 * @returns {*} - elements array
 */
function renderSVGs(domRefs, connectors) {
  if (!domRefs || !connectors || !connectors.length) {
    return null;
  }
  const elements = [];
  connectors.forEach(connector => {
    if (
      connector.direction === DIRECTIONS.LEFT_TO_RIGHT ||
      connector.direction === DIRECTIONS.TOP_TO_BOTTOM
    ) {
      elements.push(renderPath(domRefs, connector));
    }
    if (connector.direction === DIRECTIONS.LEFT_TOP_TO_RIGHT_DIAG) {
      elements.push(
        renderPath(
          domRefs,
          {
            ...connector,
            toId: connector.id
          },
          {
            top: TOP_OFFSET,
            alternate: CONNECTION_TOP_OFFSET
          }
        )
      );
      elements.push(
        renderPath(
          domRefs,
          {
            ...connector,
            fromId: connector.id
          },
          {
            top: CONNECTION_TOP_OFFSET,
            alternate: TOP_OFFSET,
            bottom: BOTTOM_OFFSET
          }
        )
      );
    }
    if (connector.direction === DIRECTIONS.LEFT_BOTTOM_TO_RIGHT_DIAG) {
      elements.push(
        renderPath(
          domRefs,
          {
            ...connector,
            toId: connector.id
          },
          {
            top: CONNECTION_TOP_OFFSET,
            alternate: TOP_OFFSET,
            bottom: BOTTOM_OFFSET
          }
        )
      );
      elements.push(
        renderPath(
          domRefs,
          {
            ...connector,
            fromId: connector.id
          },
          {
            top: TOP_OFFSET,
            alternate: CONNECTION_TOP_OFFSET
          }
        )
      );
    }
  });
  return elements;
}

/**
 * Render VizRelationship
 * @param {Object} domRefs - refs
 * @param {Object} data - data
 * @param {Object} offset - offset data
 * @returns {*} - elements array
 */
function renderPath(domRefs, data, offset = defaultOffset) {
  if (!data) { return null; }
  return (
    <VizRelationship
      key={ data.fromId + data.toId }
      fromRef={ domRefs[data.fromId] }
      toRef={ domRefs[data.toId] }
      direction={ data.direction }
      offset={ offset }
      isDisabled={ data.disabled }
      isActive={ data.active }
    />
  );
}
