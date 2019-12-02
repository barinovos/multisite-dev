import React from 'react';
import PropTypes from 'prop-types';
import { Select, Input } from 'prism-reactjs';

const PRLocation = ({
    locationsList, clustersList,
    mode = 'view', location, cluster
  }) => {
  return (
    <div className="pr-margin-bottom">
      {mode === 'view' && <Input defaultValue={`${location}: ${cluster}`} />}
      {mode === 'edit' && (
        <div>
          <Select selectOptions={locationsList} />
          <Select selectOptions={clustersList} />
        </div>
      )}
    </div>
  );
};

PRLocation.defaultProps = {
  mode: 'view'
};

PRLocation.propTypes = {
  locationsList: PropTypes.array,
  clustersList: PropTypes.array,
  location: PropTypes.string,
  cluster: PropTypes.string,
  mode: PropTypes.string
};

export default PRLocation;
