import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
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

const PRVizContainer = props => {
  const { locations, schedules } = mapDataToSchema(props);
  return (
    <div className="all-height">
      <PRVizSchema levels={ locations } connectors={ schedules } />
    </div>
  );
};

PRVizContainer.propTypes = {
  data: PropTypes.shape({
    locations: PropTypes.array,
    schedules: PropTypes.array
  }),
  mode: PropTypes.oneOf(Object.values(MODES)).isRequired,
  azList: PropTypes.array,
  fetchClustersList: PropTypes.func,
  localAZ: PropTypes.string,
  onAddLocation: PropTypes.func,
  onEditLocation: PropTypes.func,
  onDeleteLocation: PropTypes.func,
  onAddSchedule: PropTypes.func,
  onEditSchedule: PropTypes.func,
  onDeleteSchedule: PropTypes.func,
  onToggleSchedule: PropTypes.func,
  onAddLocalSchedule: PropTypes.func,
  onEditLocalSchedule: PropTypes.func,
  onDeleteLocalSchedule: PropTypes.func
};

export default PRVizContainer;

/**
 * Main method to map data to Schema
 * @param {Object} props - props from component
 * @returns {Object} - State object
 */
export function mapDataToSchema(props) {
  const {
    mode,
    azList,
    data: { locations, schedules },
    fetchClustersList
  } = props;
  if (locations && locations.length) {
    const state = {
      locations: locations.map(
        ({ id, azName, clusterName, localSchedule }, i) => ({
          id,
          element: (
            <PRLocationParent
              isPrimary={ i === 0 }
              isOpenForEdit={ !azName }
              isEditMode={ isCreateEditMode(mode) }
              azList={ azList }
              fetchClustersList={ fetchClustersList }
              onUpdate={ (newAzName, newClusterName) =>
                props.onEditLocation(id, newAzName, newClusterName) }
              onDelete={ props.onDeleteLocation }
              onAddLocalSchedule={ () => props.onAddLocalSchedule(id) }
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
      schedules: schedules && schedules.length ? schedules
        .filter(sch => sch.data || isCreateEditMode(mode))
        .map((sch, i) => {
          const recoveredFrom = locations.find(l => l.id === sch.recoveredFromId);
          const recoveredTo = locations.find(l => l.id === sch.recoveredToId);
          const isDisabled = !(recoveredFrom && recoveredFrom.azName &&
            recoveredTo && recoveredTo.azName);
          return {
            id: sch.id,
            fromId: sch.recoveredFromId,
            toId: sch.recoveredToId,
            disabled: !sch.data,
            direction: sch.direction || setDefaultDirection(i),
            position: sch.position || setDefaultPosition(i),
            active: sch.active,
            element: sch.data ? (
              <PRSchedule
                id={ sch.id }
                data={ sch.data }
                isEditMode={ isCreateEditMode(mode) }
                active={ sch.active }
                onEdit={ () => props.onEditSchedule(sch.id) }
                onDelete={ () => props.onDeleteSchedule(sch.id) }
                onToggle={ () => props.onToggleSchedule(sch.id) }
              />
            ) : (
              <PREntityPlaceholder
                text={ 'Add Schedule' }
                disabled={ isDisabled }
                onClick={ () => props.onAddSchedule(sch.id) }
              />
            )
          };
        }) : []
    };
    // This adds disabled elements for Recovery Location
    // and Schedule between them
    // Only for "Create" mode
    if (locations.length === 1 && isCreateMode(mode)) {
      pushEmptyElementsForLevelOne(state, props, false);
    }
    return state;
  } else if (isCreateMode(mode)) {
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
                azList={ azList }
                fetchClustersList={ fetchClustersList }
                data={ {
                  id: genId,
                  azName: props.localAZ,
                  clusterName: ''
                } }
                onUpdate={ (azName, clusterName) =>
                  props.onAddLocation(genId, azName, clusterName) }
              />
            )
          }
        ]
      },
      props,
      true
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
 * @param {Object} props - props
 * @param {Boolean} disabled - is disabled
 * @returns {Object} - modified state
 */
export function pushEmptyElementsForLevelOne(state, props, disabled) {
  const genId = uuid();
  const scheduleId = uuid();
  state.locations.push({
    id: genId,
    element: (
      <PREntityPlaceholder
        isLocation={ true }
        disabled={ disabled }
        text={ 'Add Recovery Location' }
        onClick={ () => props.onAddLocation(genId, scheduleId, true) }
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
      element: (
        <PREntityPlaceholder
          text={ 'Add Schedule' }
          disabled={ true }
          onClick={ () => props.onAddSchedule(scheduleId) }
        />
      )
    }
  ];
  return state;
}
