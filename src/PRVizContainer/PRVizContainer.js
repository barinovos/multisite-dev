import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { Link } from 'prism-reactjs';
import PRVizSchema from '../PRVizSchema';
import { DIRECTIONS, CONNECTOR_POSITION } from '../PRVizSchema/Constants';
import PRLocationParent from '../PRLocation';
import PRSchedule from '../PRSchedule';

export default class PRContainer extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      locations: PropTypes.array,
      schedules: PropTypes.array
    }),
    isEditMode: PropTypes.bool,
    locationsList: PropTypes.array.isRequired,
    clustersList: PropTypes.array.isRequired,
    localAZ: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = mapDataToStateWithSchema(
      props,
      this.onUpdateLocation,
      this.onUpdateSchedule
    );
  }

  onUpdateLocation = (id, scheduleId) => {
    const { clustersList, locationsList } = this.props;
    const { locations, schedules } = this.state;
    this.setState({
      locations: locations.map(Location =>
        Location.id === id
          ? {
              id,
              element: (
                <PRLocationParent
                  locationsList={locationsList}
                  clustersList={clustersList}
                  data={{
                    locationName: '',
                    clusterName: ''
                  }}
                />
              )
            }
          : Location
      ),
      schedules: scheduleId
        ? schedules.map(Schedule =>
            Schedule.id === scheduleId
              ? {
                  id: scheduleId,
                  element: (
                    <PRSchedule
                      onCreate={() => this.onUpdateSchedule(scheduleId)}
                    />
                  )
                }
              : Schedule
          )
        : schedules
    });
  };

  onUpdateSchedule = id => {
    const { schedules, schema } = this.state;
    this.setState({
      schedules: schedules.map(S =>
        S.id === id
          ? {
              id,
              element: <PRSchedule />
            }
          : S
      ),
      schema: schema.map(s =>
        s.connectionId === id ? { ...s, disabled: false } : s
      )
    });
  };

  onAddLocation = () => {
    const { locations, schedules, schema } = this.state;
    const { locationsList, clustersList } = this.props;
    const currentLevel = locations.length;
    if (currentLevel > 2) {
      return;
    }
    const id = uuid();
    const scheduleId = uuid();
    const newLocations = locations.concat({
      id,
      element: (
        <PRLocationParent
          locationsList={locationsList}
          clustersList={clustersList}
          onCreate={() => this.onUpdateLocation(id, scheduleId)}
        />
      )
    });
    const newSchedules = schedules.concat({
      id: scheduleId,
      element: (
        <PRSchedule
          onCreate={() => this.onUpdateSchedule(scheduleId)}
          disabled={true}
        />
      )
    });
    const newSchema = schema.concat({
      fromId: locations[currentLevel - 1].id,
      toId: id,
      connectionId: scheduleId,
      disabled: true,
      direction:
        currentLevel === 1
          ? DIRECTIONS.LEFT_TO_RIGHT
          : DIRECTIONS.TOP_TO_BOTTOM,
      position:
        currentLevel === 1 ? CONNECTOR_POSITION.TOP : CONNECTOR_POSITION.RIGHT
    });
    if (currentLevel === 2) {
      const scheduleId = uuid();
      newSchedules.push({
        id: scheduleId,
        element: (
          <PRSchedule
            onCreate={() => this.onUpdateSchedule(scheduleId)}
            disabled={true}
          />
        )
      });
      newSchema.push({
        fromId: locations[0].id,
        toId: id,
        connectionId: scheduleId,
        disabled: true,
        direction: DIRECTIONS.LEFT_TOP_TO_RIGHT_DIAG,
        position: CONNECTOR_POSITION.BOTTOM
      });
    }
    this.setState({
      locations: newLocations,
      schedules: newSchedules,
      schema: newSchema
    });
  };

  onRemoveLocation = () => {
    const { locations, schedules, schema } = this.state;
    const currentLevel = locations.length;
    if (currentLevel < 2) {
      return;
    }
    this.setState({
      locations: locations.slice(0, -1),
      schedules: schedules.slice(0, currentLevel === 3 ? -2 : -1),
      schema: schema.slice(0, currentLevel === 3 ? -2 : -1)
    });
  };

  render() {
    const { locations, schedules, schema } = this.state;
    return (
      <div className="all-height">
        <div className="pr-viz-top-container">
          <Link onClick={this.onAddLocation} className="viz-link">
            Add location
          </Link>
          <Link type="delete" onClick={this.onRemoveLocation}>
            Remove location
          </Link>
        </div>
        <div className="pr-viz-main-container">
          <PRVizSchema
            levels={locations}
            connectors={schedules}
            schema={schema}
          />
        </div>
      </div>
    );
  }
}

export function mapDataToStateWithSchema(
  props,
  onUpdateLocation,
  onUpdateSchedule
) {
  if (props.data && props.data.locations) {
    const state = {
      locations: props.data.locations.map(
        ({ id, locationName, clusterName, localSchedule }, i) => ({
          id,
          element: (
            <PRLocationParent
              isPrimary={i === 0}
              locationsList={props.locationsList}
              clustersList={props.clustersList}
              data={{
                id,
                locationName,
                clusterName,
                localSchedule
              }}
            />
          )
        })
      ),
      schedules: props.data.schedules.map(sch => ({
        id: sch.id,
        element: (
          <PRSchedule
            onCreate={() => onUpdateSchedule(sch.id)}
            data={sch.data}
          />
        )
      })),
      schema: props.data.schedules.map((data, i) => ({
        fromId: data.recoveredFromId,
        toId: data.recoveredToId,
        connectionId: data.id,
        disabled: false,
        direction: setDefaultDirection(i),
        position: setDefaultPosition(i)
      }))
    };
    // This adds disabled elements for Recovery Location
    // and Schedule between them
    if (props.data.locations.length === 1 && props.isEditMode) {
      pushEmptyElementsForLevelOne(
        state,
        props,
        onUpdateLocation,
        onUpdateSchedule
      );
    }
    return state;
  } else if (props.isEditMode) {
    // This branch is "Create" mode
    const genId = uuid();
    return pushEmptyElementsForLevelOne(
      {
        locations: [
          {
            id: genId,
            element: (
              <PRLocationParent
                isPrimary={true}
                locationsList={props.locationsList}
                clustersList={props.clustersList}
                data={{
                  id: genId,
                  locationName: props.localAZ,
                  clusterName: ''
                }}
                onCreate={() => onUpdateLocation(genId)}
              />
            )
          }
        ]
      },
      props,
      onUpdateLocation,
      onUpdateSchedule
    );
  } else {
    throw new Error('For View mode data is required!');
  }
}

function setDefaultDirection(index) {
  switch (index) {
    case 1:
      return DIRECTIONS.TOP_TO_BOTTOM;
    case 2:
      return DIRECTIONS.LEFT_TOP_TO_RIGHT_DIAG;
    default:
      return DIRECTIONS.LEFT_TO_RIGHT;
  }
}

function setDefaultPosition(index) {
  switch (index) {
    case 1:
      return CONNECTOR_POSITION.RIGHT;
    case 2:
      return CONNECTOR_POSITION.BOTTOM;
    default:
      return CONNECTOR_POSITION.TOP;
  }
}

function pushEmptyElementsForLevelOne(
  state,
  props,
  onUpdateLocation,
  onUpdateSchedule
) {
  const genId = uuid();
  const scheduleId = uuid();
  state.locations.push({
    id: genId,
    element: (
      <PRLocationParent
        locationsList={props.locationsList}
        clustersList={props.clustersList}
        onCreate={() => onUpdateLocation(genId, scheduleId)}
      />
    )
  });
  state.schedules = [
    {
      id: scheduleId,
      element: (
        <PRSchedule
          disabled={true}
          onCreate={() => onUpdateSchedule(scheduleId)}
        />
      )
    }
  ];
  state.schema = [
    {
      fromId: state.locations[0].id,
      toId: genId,
      connectionId: scheduleId,
      disabled: true,
      direction: DIRECTIONS.LEFT_TO_RIGHT,
      position: CONNECTOR_POSITION.TOP
    }
  ];
  return state;
}
