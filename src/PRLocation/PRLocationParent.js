import React from 'react';
import PropTypes from 'prop-types';
import { TextLabel, Link, PlusIcon, Title } from 'prism-reactjs';
import PRLocation from './PRLocation';
import PRLocalSchedule from '../PRLocalSchedule';

class PRLocationParent extends React.Component {

  constructor(props) {
    super(props);
    const { azName = '', clusterName = '', localSchedule = null, id } =
      props.data || {};
    this.state = {
      id,
      isOpenForEdit: props.isOpenForEdit,
      azName,
      clusterName,
      localSchedule
    };
  }

  renderAddLocalSchedule(onAddLocalSchedule) {
    return (
      <div className="text-center">
        <Link
          type="with-icon"
          onClick={ onAddLocalSchedule }
          icon={ <PlusIcon size="small" /> }
        >
          Add Local Schedule
        </Link>
      </div>
    );
  }

  render() {
    const {
      isPrimary,
      azList,
      clustersList,
      onAddLocalSchedule,
      isEditMode
    } = this.props;
    const {
      azName,
      clusterName,
      localSchedule,
      id,
      isOpenForEdit
    } = this.state;

    const onLocationChange = value =>
      this.setState({
        azName: azList.find(l => l.value === value).title
      });

    const onClusterChange = value =>
      this.setState({
        clusterName: clustersList.find(l => l.value === value).title
      });

    return (
      <div className="pr-location">
        {isPrimary && (
          <Title size="h2" className="pr-margin-bottom">
            Primary location
          </Title>
        )}
        {isOpenForEdit && isEditMode ? (
          <PRLocation
            azName={ azName }
            clusterName={ clusterName }
            azList={ azList }
            clustersList={ clustersList }
            isPrimary={ isPrimary }
            onChangeAZ={ onLocationChange }
            onChangeCluster={ onClusterChange }
            onCancel={ () =>
              this.setState({
                isOpenForEdit: false
              })
            }
            onSave={ () =>
              this.setState({
                isOpenForEdit: false
              })
            }
          />
        ) : (
          <div
            className="pr-button pr-margin-bottom"
            onClick={ () =>
              isEditMode &&
              this.setState({
                isOpenForEdit: true
              })
            }
          >
            <TextLabel type={ TextLabel.TEXT_LABEL_TYPE.PRIMARY }>
              {azName}: {clusterName}
            </TextLabel>
          </div>
        )}
        {localSchedule ? (
          <PRLocalSchedule
            frequency={ localSchedule.frequency }
            rpThreshold={ localSchedule.rpThreshold }
            type={ localSchedule.type }
          />
        ) : (
          isEditMode &&
          this.renderAddLocalSchedule(() => onAddLocalSchedule(id))
        )}
      </div>
    );
  }

}

PRLocationParent.defaultProps = {
  data: null,
  azList: [],
  clustersList: [],
  isPrimary: false,
  isOpenForEdit: false,
  isEditMode: false
};

PRLocationParent.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    azName: PropTypes.string,
    clusterName: PropTypes.string,
    localSchedule: PropTypes.shape({
      frequency: PropTypes.string,
      rpThreshold: PropTypes.number,
      type: PropTypes.string
    })
  }),
  azList: PropTypes.array,
  clustersList: PropTypes.array,
  isPrimary: PropTypes.bool,
  isOpenForEdit: PropTypes.bool,
  isEditMode: PropTypes.bool,
  onUpdate: PropTypes.func,
  onAddLocalSchedule: PropTypes.func
};

export default PRLocationParent;
