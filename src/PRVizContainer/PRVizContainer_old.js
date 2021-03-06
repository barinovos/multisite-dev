import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { Link } from 'prism-reactjs';
import PRVizSchema from '../PRVizSchema';
import { DIRECTIONS, CONNECTOR_POSITION } from '../PRVizSchema/Constants';
import PRLocationParent from '../PRLocation';
import PRSchedule from '../PRSchedule';
import PREntityPlaceholder from '../PREntityPlaceholder';

export const MODES = {
  create: 'create',
  edit: 'edit',
  view: 'view'
};

const isCreateEditMode = mode => mode === MODES.create || mode === MODES.edit;

const isCreateMode = mode => mode === MODES.create;

export default class PRVizContainer extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      locations: PropTypes.array,
      schedules: PropTypes.array
    }),
    mode: PropTypes.oneOf(Object.values(MODES)).isRequired,
    azList: PropTypes.array,
    fetchClustersList: PropTypes.func,
    localAZ: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = mapDataToStateWithSchema(
      props,
      this.onUpdateLocation,
      this.onUpdateSchedule
    );
  }

  onUpdateLocation = (id, scheduleId, fromPlaceholder) => {
    const { fetchClustersList, azList, mode } = this.props;
    const { locations, schedules } = this.state;
    if (!isCreateEditMode(mode)) {
      return;
    }
    this.setState({
      locations: locations.map(Location =>
        Location.id === id
          ? {
            id,
            element: (
              <PRLocationParent
                key={ id }
                isEditMode={ true }
                isOpenForEdit={ isCreateMode(mode) }
                azList={ azList }
                fetchClustersList={ fetchClustersList }
                data={ {
                  id,
                  azName: '',
                  clusterName: ''
                } }
              />
            )
          }
          : Location
      ),
      schedules: scheduleId
        ? schedules.map(Schedule =>
          Schedule.id === scheduleId
            ? {
              ...Schedule,
              disabled: false,
              element: fromPlaceholder ? (
                <PREntityPlaceholder
                  text={ 'Add Schedule' }
                  onClick={ () => this.onUpdateSchedule(scheduleId) }
                />
              ) : (
                <PRSchedule
                  isEditMode={ true }
                  data={ Schedule.data || { frequency: '2 hours' } }
                  onCreate={ () => this.onUpdateSchedule(scheduleId) }
                />
              )
            }
            : Schedule
        )
        : schedules
    });
  };

  onUpdateSchedule = (id, data) => {
    if (!isCreateEditMode(this.props.mode)) {
      return;
    }
    this.setState({
      schedules: this.state.schedules.map(S =>
        S.id === id
          ? {
            ...S,
            // TODO: replace it just with data
            element: <PRSchedule data={ data || { frequency: '2 hours' } } />
          }
          : S
      )
    });
  };

  onAddLocation = () => {
    const { locations, schedules } = this.state;
    const { azList, fetchClustersList, mode } = this.props;
    const currentLevel = locations.length;
    if (currentLevel > 2 || !isCreateEditMode(mode)) {
      return;
    }
    const id = uuid();
    const scheduleId = uuid();
    const newLocations = locations.concat({
      id,
      element: (
        <PRLocationParent
          azList={ azList }
          fetchClustersList={ fetchClustersList }
          isOpenForEdit={ true }
          isEditMode={ true }
          data={ {
            id,
            azName: '',
            clusterName: ''
          } }
          onCreate={ () => this.onUpdateLocation(id, scheduleId) }
        />
      )
    });
    const newSchedules = schedules.concat({
      id: scheduleId,
      fromId: locations[currentLevel - 1].id,
      toId: id,
      disabled: true,
      direction:
        currentLevel === 1
          ? DIRECTIONS.LEFT_TO_RIGHT
          : DIRECTIONS.TOP_TO_BOTTOM,
      position:
        currentLevel === 1 ? CONNECTOR_POSITION.TOP : CONNECTOR_POSITION.RIGHT,
      element: (
        <PREntityPlaceholder
          text={ 'Add Schedule' }
          disabled={ true }
          onCreate={ () => this.onUpdateSchedule(scheduleId) }
        />
      )
    });
    if (currentLevel === 2) {
      const newScheduleId = uuid();
      newSchedules.push({
        id: newScheduleId,
        fromId: locations[0].id,
        toId: id,
        disabled: true,
        direction: DIRECTIONS.LEFT_TOP_TO_RIGHT_DIAG,
        position: CONNECTOR_POSITION.CENTER_TOP,
        element: (
          <PREntityPlaceholder
            text={ 'Add Schedule' }
            disabled={ true }
            onCreate={ () => this.onUpdateSchedule(newScheduleId) }
          />
        )
      });
    }
    this.setState({
      locations: newLocations,
      schedules: newSchedules
    });
  };

  onRemoveLocation = () => {
    const { locations, schedules } = this.state;
    const currentLevel = locations.length;
    if (currentLevel < 2) {
      return;
    }
    this.setState({
      locations: locations.slice(0, -1),
      schedules: schedules.slice(0, currentLevel === 3 ? -2 : -1)
    });
  };

  render() {
    const { locations, schedules } = this.state;
    return (
      <div className="all-height">
        <div className="pr-viz-top-container">
          <Link onClick={ this.onAddLocation } className="viz-link">
            Add location
          </Link>
          <Link type="delete" onClick={ this.onRemoveLocation }>
            Remove location
          </Link>
        </div>
        <div className="pr-viz-main-container">
          <PRVizSchema levels={ locations } connectors={ schedules } />
        </div>
      </div>
    );
  }

}

/**
 * Main method to map data to Schema
 * @param {*} props - props from component
 * @param {Function} onUpdateLocation - callback
 * @param {Function} onUpdateSchedule - callback
 * @returns {*} - State object
 */
export function mapDataToStateWithSchema(
  props,
  onUpdateLocation,
  onUpdateSchedule
) {
  if (props.data && props.data.locations) {
    const state = {
      locations: props.data.locations.map(
        ({ id, azName, clusterName, localSchedule }, i) => ({
          id,
          element: (
            <PRLocationParent
              isPrimary={ i === 0 }
              isOpenForEdit={ isCreateMode(props.mode) }
              isEditMode={ isCreateEditMode(props.mode) }
              azList={ props.azList }
              fetchClustersList={ props.fetchClustersList }
              data={ {
                id,
                azName,
                clusterName,
                localSchedule
              } }
            />
          )
        })
      ),
      schedules: props.data.schedules.map((sch, i) => ({
        id: sch.id,
        fromId: sch.recoveredFromId,
        toId: sch.recoveredToId,
        disabled: !sch.data,
        direction: sch.direction || setDefaultDirection(i),
        position: sch.position || setDefaultPosition(i),
        element: (
          <PRSchedule
            isEditMode={ isCreateEditMode(props.mode) }
            onCreate={ () => onUpdateSchedule(sch.id) }
            data={ sch.data }
          />
        )
      }))
    };
    // This adds disabled elements for Recovery Location
    // and Schedule between them
    // Only for "Create" mode
    if (props.data.locations.length === 1 && isCreateMode(props.mode)) {
      pushEmptyElementsForLevelOne(state, props, onUpdateLocation);
    }
    return state;
  } else if (isCreateMode(props.mode)) {
    // This branch is "Create" mode
    const genId = uuid();
    return pushEmptyElementsForLevelOne(
      {
        locations: [
          {
            id: genId,
            element: (
              <PRLocationParent
                isPrimary={ true }
                isOpenForEdit={ true }
                isEditMode={ true }
                azList={ props.azList }
                fetchClustersList={ props.fetchClustersList }
                data={ {
                  id: genId,
                  azName: props.localAZ,
                  clusterName: ''
                } }
                onCreate={ () => onUpdateLocation(genId) }
              />
            )
          }
        ]
      },
      props,
      onUpdateLocation
    );
  }
  throw new Error('For View mode data is required!');
}

/**
 * Set default direction by index
 * @param {number} index - index
 * @returns {string} - direction value
 */
export function setDefaultDirection(index) {
  switch (index) {
    case 1:
      return DIRECTIONS.TOP_TO_BOTTOM;
    case 2:
      return DIRECTIONS.LEFT_TOP_TO_RIGHT_DIAG;
    default:
      return DIRECTIONS.LEFT_TO_RIGHT;
  }
}

/**
 * Set default position by index
 * @param {number} index - index
 * @returns {string} - position value
 */
export function setDefaultPosition(index) {
  switch (index) {
    case 1:
      return CONNECTOR_POSITION.RIGHT;
    case 2:
      return CONNECTOR_POSITION.CENTER_TOP;
    default:
      return CONNECTOR_POSITION.TOP;
  }
}

/**
 * Add empty elements for Edit mode
 * @param {Object} state - current state
 * @param {*} props - props
 * @param {Function} onUpdateLocation - callback
 * @returns {Object} - modified state
 */
export function pushEmptyElementsForLevelOne(state, props, onUpdateLocation) {
  const genId = uuid();
  const scheduleId = uuid();
  state.locations.push({
    id: genId,
    element: (
      <PREntityPlaceholder
        isLocation={ true }
        text={ 'Add Recovery Location' }
        onClick={ () => onUpdateLocation(genId, scheduleId, true) }
      />
    )
  });
  state.schedules = [
    {
      id: scheduleId,
      fromId: state.locations[0].id,
      toId: genId,
      disabled: true,
      direction: DIRECTIONS.LEFT_TO_RIGHT,
      position: CONNECTOR_POSITION.TOP,
      element: <PREntityPlaceholder text={ 'Add Schedule' } disabled={ true } />
    }
  ];
  return state;
}
