import React from 'react';
import PropTypes from 'prop-types';
import { Link, FlexLayout } from 'prism-reactjs';

export default class Collapsible extends React.Component {

  static propTypes = {
    header: PropTypes.element,
    isExpanded: PropTypes.bool,
    disabled: PropTypes.bool,
    onToggle: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      expanded: !!props.isExpanded
    };
  }

  onToggle = () => {
    this.setState({ expanded: !this.state.expanded });
    if (this.props.onToggle) {
      this.props.onToggle(!this.state.expanded);
    }
  };

  render() {
    const { expanded } = this.state;
    const { header, children, disabled } = this.props;
    return (
      <div>
        <FlexLayout
          data-testid="pr-collapsible"
          className="pr-collapsible"
          onClick={ this.onToggle }
        >
          <Link type="expandable" expanded={ expanded } disabled={ disabled } />
          {header}
        </FlexLayout>
        {expanded && <div className="pr-margin-top">{children}</div>}
      </div>
    );
  }

}
