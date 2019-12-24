import React from 'react';
// import PropTypes from 'prop-types';
import {
  FlexLayout,
  CloseIcon,
  CustomizedSteps,
  Input,
  Link,
  TextLabel,
  PlusIcon
} from 'prism-reactjs';
import uuid from 'uuid/v4';
import './index.scss';

// TODO: remove mocks
import {
  azList,
  fetchClustersList
  // , mockCreateData
} from './mock';
import PRVizContainer, { MODES } from '../PRVizContainer';
import { CONNECTOR_POSITION, DIRECTIONS } from '../PRVizSchema/Constants';

export default class PRContainer extends React.Component {

  state = {
    mode: MODES.create,
    name: '',
    step: 2,
    locations: [],
    schedules: []
  };


  onEditLocation = (id, azName, clusterName) => {
    const { locations } = this.state;
    this.setState({
      locations: locations.map(Location =>
        Location.id === id
          ? {
            id,
            azName,
            clusterName
          }
          : Location
      )
    });
  };

  onAddLocation = (id, azName, clusterName) => {
    const { locations, schedules } = this.state;
    const currentLevel = locations.length;
    if (currentLevel > 2) {
      return;
    }
    if (!currentLevel && id) {
      return this.setState({
        locations: [{
          id,
          azName,
          clusterName
        }]
      });
    }
    const newId = uuid();
    const scheduleId = uuid();
    const newLocations = locations.concat({
      id: newId,
      azName: '',
      clusterName: ''
    });
    const newSchedules = schedules.concat({
      id: scheduleId,
      recoveredFromId: locations[currentLevel - 1].id,
      recoveredToId: newId,
      direction:
        currentLevel === 1
          ? DIRECTIONS.LEFT_TO_RIGHT
          : DIRECTIONS.TOP_TO_BOTTOM,
      position:
        currentLevel === 1 ? CONNECTOR_POSITION.TOP : CONNECTOR_POSITION.RIGHT
    });
    if (currentLevel === 2) {
      const newScheduleId = uuid();
      newSchedules.push({
        id: newScheduleId,
        recoveredFromId: locations[0].id,
        recoveredToId: newId,
        direction: DIRECTIONS.LEFT_TOP_TO_RIGHT_DIAG,
        position: CONNECTOR_POSITION.BOTTOM
      });
    }
    this.setState({
      locations: newLocations,
      schedules: newSchedules
    });
  };

  onAddSchedule = id => {
    console.log('open modal here', id); // eslint-disable-line
    // TODO: replace next lines
    this.setState({
      schedules: this.state.schedules.map(S =>
        S.id === id
          ? {
            ...S,
            // TODO: replace it with data from modal
            data: { frequency: '2 hours' }
          }
          : S
      )
    });
  };

  onEditSchedule = id => {
    console.log('open modal here', id); // eslint-disable-line
    // TODO: replace next lines
    this.setState({
      schedules: this.state.schedules.map(S =>
        S.id === id
          ? {
            ...S,
            // TODO: replace it with data from modal
            data: { frequency: '2 hours' }
          }
          : S
      )
    });
  };

  onToggleSchedule = id =>
    this.setState({
      schedules: this.state.schedules.map(S =>
        S.id === id
          ? {
            ...S,
            active: !S.active
          }
          : S
      )
    });

  onDeleteSchedule = id => {
    console.log('open confirm modal here', id); // eslint-disable-line
    this.setState({
      schedules: this.state.schedules.map(S =>
        S.id === id
          ? {
            ...S,
            disabled: false,
            data: null
          }
          : S
      )
    });
  };

  onAddLocalSchedule = locationId => {
    console.log('open modal here', locationId); // eslint-disable-line
  };

  onDeleteLocation = id => {
    console.log('open confirm modal here', id); // eslint-disable-line
    const { locations, schedules } = this.state;
    const currentLevel = locations.length;
    if (currentLevel < 2) {
      return;
    }
    this.setState({
      locations: locations
        .filter(l => l.id !== id),
      schedules: schedules
        .filter(s => s.recoveredFromId !== id && s.recoveredToId !== id)
    });
  };

  render() {
    const { name, locations, schedules } = this.state;

    const ContentFirst = (
      <div className="all-height">
        <FlexLayout justifyContent="space-between" className="pr-name-actions">
          <FlexLayout className="pr-input">
            <div className="pr-policy-name">
              <TextLabel>Policy name</TextLabel>
            </div>
            <Input
              value={ name }
              onChange={ e => this.setState({ name: e.target.value }) }
            />
          </FlexLayout>
          <div>
            {locations && locations.length > 1 &&
              (<Link
                icon={ <PlusIcon size="small" /> }
                className="pr-add-location-link"
                onClick={ this.onAddLocation }>
                Add Recovery Location
              </Link>)
            }
            <TextLabel type={ TextLabel.TEXT_LABEL_TYPE.PRIMARY }>
              Start Protection
            </TextLabel>
            <Link>Immediately</Link>
          </div>
        </FlexLayout>
        <div className="pr-viz-wrapper">
          <PRVizContainer
            mode={ MODES.create }
            data={ {
              locations,
              schedules
            } }
            azList={ azList }
            fetchClustersList={ fetchClustersList }
            localAZ="Local AZ"
            onAddLocation={ this.onAddLocation }
            onEditLocation={ this.onEditLocation }
            onDeleteLocation={ this.onDeleteLocation }
            onToggleSchedule={ this.onToggleSchedule }
            onAddLocalSchedule={ this.onAddLocalSchedule }
            onAddSchedule={ this.onAddSchedule }
            onEditSchedule={ this.onEditSchedule }
            onDeleteSchedule={ this.onDeleteSchedule }
          />
        </div>
      </div>
    );

    const ContentSecond = (
      <div className="all-height">
        <div className="pr-viz-wrapper">
          <PRVizContainer
            mode={ MODES.view }
            onToggleSchedule={ this.onToggleSchedule }
            data={ {
              locations,
              schedules
            } }
          />
        </div>
      </div>
    );

    const steps = [
      { title: 'Configure Schedule',
        content: ContentFirst,
        key: '1' },
      { title: 'Add Entities',
        content: ContentSecond,
        key: '2' }
    ];

    return (
      <div className="pr-container">
        <FlexLayout justifyContent="space-between" className="pr-title">
          <h3>Create Protection Policy</h3>
          <CloseIcon />
        </FlexLayout>
        <CustomizedSteps
          steps={ steps }
          next={ true }
          done={ true }
          actionsBtnPosition={ 'right' }
          className="pr-steps"
        />
      </div>
    );
  }

}
