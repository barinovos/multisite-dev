import React from 'react';
import PropTypes from 'prop-types';
import { TextLabel, FlexLayout, Link } from 'prism-reactjs';
import Collapsible from '../Shared/Collapsible';

const PRSchedule = ({ data, onCreate, disabled, active }) => {
  if (!data) {
    return (
      <div className="pr-button">
        <Link
          type="with-icon"
          onClick={onCreate}
          disabled={disabled}
          data-testid="add-schedule"
        >
          Add Schedule
        </Link>
      </div>
    );
  }
  const { frequency, rpThreshold, type } = data;

  const Header = (
    <FlexLayout>
      <TextLabel>RPO: </TextLabel>
      <TextLabel type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}>
        {frequency}
      </TextLabel>
    </FlexLayout>
  );

  return (
    <div className={`pr-schedule ${active ? 'active' : ''}`}>
      <Collapsible header={Header}>
        <FlexLayout
          alignItems="center"
          justifyContent="space-between"
          className="pr-margin-bottom"
        >
          <TextLabel>Local AZ: Peach Seeds</TextLabel>
          <TextLabel type={TextLabel.TEXT_LABEL_TYPE.PRIMARY}>
            {rpThreshold} Recovery Points
          </TextLabel>
        </FlexLayout>
        <TextLabel className="pr-margin-bottom">{type}</TextLabel>
      </Collapsible>
    </div>
  );
};

PRSchedule.propTypes = {
  data: PropTypes.shape({
    frequency: PropTypes.string,
    rpThreshold: PropTypes.number,
    type: PropTypes.string
  }),
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  onCreate: PropTypes.func
};

export default PRSchedule;
