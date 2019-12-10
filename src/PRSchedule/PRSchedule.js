import React from 'react';
import PropTypes from 'prop-types';
import { TextLabel, FlexLayout } from 'prism-reactjs';
import Collapsible from '../Shared/Collapsible';

const PRSchedule = ({ data, onEdit, active, isEditMode }) => {
  const { frequency = '', rpThreshold = '', type } = data || {};

  const Header = (
    <div>
      <TextLabel>RPO: </TextLabel>
      <TextLabel type={ TextLabel.TEXT_LABEL_TYPE.PRIMARY }>
        {frequency}
      </TextLabel>
    </div>
  );

  return (
    <div
      className={ `pr-schedule ${active ? 'active' : ''}` }
      onClick={ () => isEditMode && onEdit(data) }
    >
      <Collapsible header={ Header }>
        <FlexLayout
          alignItems="center"
          justifyContent="space-between"
          className="pr-margin-bottom"
        >
          <TextLabel className="text-ellipsis">Local AZ: Peach Seeds</TextLabel>
          <TextLabel
            type={ TextLabel.TEXT_LABEL_TYPE.PRIMARY }
            className="text-ellipsis"
          >
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
  active: PropTypes.bool,
  isEditMode: PropTypes.bool,
  onEdit: PropTypes.func
};

export default PRSchedule;
