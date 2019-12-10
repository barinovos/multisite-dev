import React from 'react';
import PropTypes from 'prop-types';
import { Link, PlusIcon } from 'prism-reactjs';

const testId = 'pr-entity-placeholder';

const PREntityPlaceholder = ({ text, isLocation, disabled, onClick }) => (
  <div className={ isLocation ? 'pr-location' : '' }>
    <div className="pr-button text-center">
      <Link
        type="with-icon"
        data-testid={ testId }
        icon={ <PlusIcon size="small" /> }
        disabled={ disabled }
        onClick={ onClick }
      >
        {text}
      </Link>
    </div>
  </div>
);

PREntityPlaceholder.testId = testId;

PREntityPlaceholder.propTypes = {
  text: PropTypes.string,
  isLocation: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

export default PREntityPlaceholder;
