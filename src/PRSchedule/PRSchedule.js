import React from 'react';
import PropTypes from 'prop-types';
import { TextLabel, FlexLayout, Button, Link } from 'prism-reactjs';
import Collapsible from '../Shared/Collapsible';

const PRSchedule = ({ id, data, onEdit, onDelete, active, isEditMode, onToggle }) => {
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
    <div className={ `pr-schedule${active ? ' active' : ''}` }>
      <Collapsible isExpanded={ active } header={ Header } onToggle={ onToggle }>
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
        {isEditMode && active && (
          <div className="schedule-actions">
            <Button type="secondary">
              <Link type="delete" onClick={ onDelete }>Delete</Link>
              <Link onClick={ onEdit }>Edit</Link>
            </Button>
          </div>
        )}
      </Collapsible>
    </div>
  );
};

PRSchedule.propTypes = {
  id: PropTypes.string,
  data: PropTypes.shape({
    frequency: PropTypes.string,
    rpThreshold: PropTypes.number,
    type: PropTypes.string
  }),
  active: PropTypes.bool,
  isEditMode: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onToggle: PropTypes.func
};

export default PRSchedule;
