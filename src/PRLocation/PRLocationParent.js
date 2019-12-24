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
      clustersList: [],
      isLoadingClusters: false,
      localSchedule
    };
    if (azName && props.isEditMode) {
      this.state.isLoadingClusters = true;
      const AZ = props.azList.find(l => l.title === azName);
      props.fetchClustersList(AZ.value,
        clustersList => this.setState({
          clustersList,
          isLoadingClusters: false
        }));
    }
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

  onLocationChange = value => {
    const { azList, fetchClustersList } = this.props;
    const AZ = azList.find(l => l.value === value);
    if (!AZ) {
      return;
    }
    this.setState({
      azName: AZ.title,
      clusterName: '',
      isLoadingClusters: true
    });
    fetchClustersList(AZ.value,
      clustersList => this.setState({
        clustersList,
        isLoadingClusters: false
      }));
  };

  onClusterChange = value => {
    const { clustersList } = this.state;
    const cluster = clustersList.find(l => l.value === value);
    if (!cluster) {
      return;
    }
    this.setState({
      clusterName: cluster.title
    });
  };

  onCancel = () => {
    const { data, onDelete } = this.props;
    const { azName, clusterName } = data || {};
    if (!azName) {
      return onDelete(data.id);
    }
    this.setState({
      azName,
      clusterName,
      isOpenForEdit: false,
      clustersList: []
    });
  };

  onSave = () => {
    this.setState({
      isOpenForEdit: false
    });
    if (this.props.onUpdate) {
      this.props.onUpdate(this.state.azName, this.state.clusterName);
    }
  };

  render() {
    const {
      isPrimary,
      azList,
      onAddLocalSchedule,
      isEditMode
    } = this.props;
    const {
      azName,
      clusterName,
      localSchedule,
      clustersList,
      id,
      isOpenForEdit,
      isLoadingClusters
    } = this.state;

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
            isLoading={ isLoadingClusters }
            onChangeAZ={ this.onLocationChange }
            onChangeCluster={ this.onClusterChange }
            onCancel={ this.onCancel }
            onSave={ this.onSave }
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
  fetchClustersList: PropTypes.func,
  isPrimary: PropTypes.bool,
  isOpenForEdit: PropTypes.bool,
  isEditMode: PropTypes.bool,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  onAddLocalSchedule: PropTypes.func
};

export default PRLocationParent;
