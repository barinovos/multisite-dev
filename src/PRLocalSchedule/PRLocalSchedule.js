import React from 'react';
import PropTypes from 'prop-types';
import { TextLabel, FlexLayout } from 'prism-reactjs';
import Collapsible from '../Shared/Collapsible';

const PRLocalSchedule = ({ frequency, rpThreshold, type }) => {
  const Header = (
    <div>
      <TextLabel>RPO: </TextLabel>
      <TextLabel type={ TextLabel.TEXT_LABEL_TYPE.PRIMARY }>
        {frequency}
      </TextLabel>
    </div>
  );

  return (
    <div className="pr-schedule">
      <Collapsible header={ Header }>
        <FlexLayout
          alignItems="center"
          justifyContent="space-between"
          className="pr-margin-bottom"
        >
          <TextLabel>Retention: </TextLabel>
          <TextLabel type={ TextLabel.TEXT_LABEL_TYPE.PRIMARY }>
            {rpThreshold} Recovery Points
          </TextLabel>
        </FlexLayout>
        <TextLabel className="pr-margin-bottom">{type}</TextLabel>
      </Collapsible>
    </div>
  );
};

PRLocalSchedule.propTypes = {
  frequency: PropTypes.string,
  rpThreshold: PropTypes.number,
  type: PropTypes.string
};

export default PRLocalSchedule;
