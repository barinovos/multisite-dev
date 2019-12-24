import React from 'react';
import PropTypes from 'prop-types';
import {
  ElementPlusLabel,
  Select,
  FlexLayout,
  Link,
  Divider
} from 'prism-reactjs';

const PRLocation = ({
  azList,
  clustersList,
  azName,
  clusterName,
  isPrimary,
  isLoading,
  onChangeAZ,
  onChangeCluster,
  onSave,
  onCancel
}) => {
  return (
    <div className="pr-location-edit pr-margin-bottom">
      <div className="pr-top-inner-padding">
        {!isPrimary && (
          <h4 className="ntnx pr-margin-bottom">Recovery location</h4>
        )}
        <ElementPlusLabel
          label="Location"
          className="pr-margin-bottom"
          element={
            <Select
              disabled={ isPrimary }
              selectOptions={ azList }
              value={ azName }
              onChange={ onChangeAZ }
            />
          }
        />
        <ElementPlusLabel
          label="Cluster"
          className="pr-margin-bottom"
          element={
            <Select
              disabled={ isLoading }
              selectOptions={ clustersList }
              value={ isLoading ? 'Loading...' : clusterName }
              onChange={ onChangeCluster }
            />
          }
        />
      </div>
      <Divider />
      <div className="pr-bottom-inner-padding">
        <FlexLayout alignItems="center" justifyContent="flex-end">
          {!isPrimary && <Link onClick={ onCancel }>Cancel</Link>}
          <Link disabled={ !clusterName || !azName } onClick={ onSave }>
            Save
          </Link>
        </FlexLayout>
      </div>
    </div>
  );
};

PRLocation.propTypes = {
  azList: PropTypes.array,
  clustersList: PropTypes.array,
  azName: PropTypes.string,
  clusterName: PropTypes.string,
  isPrimary: PropTypes.bool,
  onChangeAZ: PropTypes.func,
  onChangeCluster: PropTypes.func,
  onSave: PropTypes.func,
  onCancel: PropTypes.func
};

export default PRLocation;
