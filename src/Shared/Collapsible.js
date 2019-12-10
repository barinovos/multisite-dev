import React from 'react';
import PropTypes from 'prop-types';
import { Link, FlexLayout } from 'prism-reactjs';

export default class Collapsible extends React.Component {

  static propTypes = {
    header: PropTypes.element,
    disabled: PropTypes.bool
  };

  state = {
    expanded: false
  };

  render() {
    const { expanded } = this.state;
    const { header, children, disabled } = this.props;
    return (
      <div>
        <FlexLayout
          data-testid="pr-collapsible"
          onClick={ () => this.setState({ expanded: !expanded }) }
        >
          <Link type="expandable" expanded={ expanded } disabled={ disabled } />
          {header}
        </FlexLayout>
        {expanded && <div className="pr-margin-top">{children}</div>}
      </div>
    );
  }

}
