import React from 'react';
import PropTypes from 'prop-types';
import { Link, PlusIcon, Title } from 'prism-reactjs';
import PRLocation from './PRLocation';
import PRLocalSchedule from '../PRLocalSchedule';

class PRLocationParent extends React.Component {
  renderAddLocalSchedule(onAddLocalSchedule) {
    return (
      <div className="text-center">
        <Link
          type="with-icon"
          onClick={onAddLocalSchedule}
          icon={<PlusIcon size="small" />}
        >
          Add Local Schedule
        </Link>
      </div>
    );
  }

  render() {
    const {
      data,
      isPrimary,
      locationsList,
      clustersList,
      onCreate,
      onAddLocalSchedule
    } = this.props;
    if (!data && !isPrimary) {
      return (
        <div className="pr-location">
          <div className="pr-button">
            <Link
              type="with-icon"
              icon={<PlusIcon size="small" />}
              className="text-opacity"
              onClick={onCreate}
            >
              Add Recovery Location
            </Link>
          </div>
        </div>
      );
    }
    const { locationName, clusterName, localSchedule } = data || {};
    return (
      <div className="pr-location">
        {isPrimary && (
          <Title size="h2" className="pr-margin-bottom">
            Primary location
          </Title>
        )}
        <PRLocation
          location={locationName}
          cluster={clusterName}
          locationsList={locationsList}
          clustersList={clustersList}
        />
        {localSchedule ? (
          <PRLocalSchedule
            frequency={localSchedule.frequency}
            rpThreshold={localSchedule.rpThreshold}
            type={localSchedule.type}
          />
        ) : (
          this.renderAddLocalSchedule(() => onAddLocalSchedule(data.id))
        )}
      </div>
    );
  }
}

PRLocationParent.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    locationName: PropTypes.string,
    clusterName: PropTypes.string,
    localSchedule: PropTypes.shape({
      frequency: PropTypes.string,
      rpThreshold: PropTypes.number,
      type: PropTypes.string
    })
  }),
  locationsList: PropTypes.array,
  clustersList: PropTypes.array,
  isPrimary: PropTypes.bool,
  onCreate: PropTypes.func,
  onAddLocalSchedule: PropTypes.func
};

export default PRLocationParent;
