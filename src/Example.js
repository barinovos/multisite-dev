import React from 'react';
import {
  FlexLayout,
  MagGlassIcon,
  QuestionIcon,
  SettingsIcon,
  Link,
  NavBarLayout,
  NutanixLogoIcon
} from 'prism-reactjs';
import uuid from 'uuid/v4';
import PRVizContainer from './PRVizContainer';

const accountActions = (
  <FlexLayout itemSpacing="15px">
    <MagGlassIcon color="dark" />
    <QuestionIcon color="dark" />
    <SettingsIcon color="dark" />
  </FlexLayout>
);

const account = <Link type="info">oleg.barinov@nutanix.com</Link>;

const sampleSchedule = {
  frequency: '4 hours',
  rpThreshold: 10,
  type: 'App consistent'
};

const locationsList = [
  {
    key: 1,
    value: 'local',
    title: 'Local AZ'
  },
  {
    key: 2,
    value: 'pc',
    title: 'PC 10.11.12.13'
  },
  {
    key: 3,
    value: 'pc3',
    title: 'PC 10.211.212.213'
  }
];

const clustersList = [
  {
    key: 1,
    value: 'ps',
    title: 'Peach Seeds'
  },
  {
    key: 2,
    value: 'ab',
    title: 'almond_beast'
  }
];

const ids = {
  primeLocation: uuid(),
  secondaryLocation: uuid(),
  // for View Mode
  thirdLocation: uuid(),
  _prime_to_2nd_schedule: uuid(),
  _2nd_to_3rd_schedule: uuid(),
  _prime_to_3rd_schedule: uuid()
};

const mockEditData = {
  locations: [
    {
      id: ids.primeLocation,
      locationName: locationsList[0].title,
      clusterName: clustersList[1].title,
      localSchedule: sampleSchedule
    }
  ],
  schedules: []
};

const mockViewData = {
  locations: [
    {
      id: ids.primeLocation,
      locationName: locationsList[0].title,
      clusterName: clustersList[0].title,
      localSchedule: sampleSchedule
    },
    {
      id: ids.secondaryLocation,
      locationName: locationsList[1].title,
      clusterName: clustersList[1].title,
      localSchedule: sampleSchedule
    }
  ],
  schedules: [
    {
      id: ids._prime_to_2nd_schedule,
      recoveredFromId: ids.primeLocation,
      recoveredToId: ids.secondaryLocation,
      data: sampleSchedule
    }
  ]
};

const mockViewExtendedData = {
  locations: [
    {
      id: ids.primeLocation,
      locationName: locationsList[0].title,
      clusterName: clustersList[0].title,
      localSchedule: sampleSchedule
    },
    {
      id: ids.secondaryLocation,
      locationName: locationsList[1].title,
      clusterName: clustersList[1].title,
      localSchedule: sampleSchedule
    },
    {
      id: ids.thirdLocation,
      locationName: locationsList[2].title,
      clusterName: clustersList[1].title,
      localSchedule: sampleSchedule
    }
  ],
  schedules: [
    {
      id: ids._prime_to_2nd_schedule,
      recoveredFromId: ids.primeLocation,
      recoveredToId: ids.secondaryLocation,
      data: sampleSchedule
    },
    {
      id: ids._2nd_to_3rd_schedule,
      recoveredFromId: ids.secondaryLocation,
      recoveredToId: ids.thirdLocation,
      data: sampleSchedule
    },
    {
      id: ids._prime_to_3rd_schedule,
      recoveredFromId: ids.primeLocation,
      recoveredToId: ids.thirdLocation,
      data: sampleSchedule
    }
  ]
};

export default class Example extends React.PureComponent {
  state = {
    isEditMode: true,
    data: null,
    key: 'create'
  };

  render() {
    const { isEditMode, data, key } = this.state;
    /* eslint-disable */
    const menuItems = [
      {
        key: 'create',
        label: (
          <a
            href="#"
            onClick={() =>
              this.setState({
                isEditMode: true,
                data: null,
                key: 'create'
              })
            }
          >
            Create Mode
          </a>
        )
      },
      {
        key: 'edit',
        label: (
          <a
            href="#"
            onClick={() =>
              this.setState({
                isEditMode: true,
                data: mockEditData,
                key: 'edit'
              })
            }
          >
            Edit Mode
          </a>
        )
      },
      {
        key: 'view',
        label: (
          <a
            href="#"
            onClick={() =>
              this.setState({
                isEditMode: false,
                data: mockViewData,
                key: 'view'
              })
            }
          >
            View Mode
          </a>
        )
      },
      {
        key: 'view1',
        label: (
          <a
            href="#"
            onClick={() =>
              this.setState({
                isEditMode: false,
                data: mockViewExtendedData,
                key: 'view1'
              })
            }
          >
            View Extended
          </a>
        )
      }
    ];
    /* eslint-enable */

    return (
      <div className="all-height">
        <NavBarLayout
          accountActions={accountActions}
          accountInfo={account}
          eventsTasksInfo={[]}
          layout={NavBarLayout.LAYOUTS.LEFT}
          logoIcon={
            <a href="/">
              <NutanixLogoIcon color="gray-1" />
            </a>
          }
          menuItems={menuItems}
          title="Protection Rule"
        />
        <div style={{ height: 'calc(100% - 60px)' }}>
          <PRVizContainer
            key={key}
            isEditMode={isEditMode}
            data={data}
            clustersList={clustersList}
            locationsList={locationsList}
            localAZ="Local AZ"
          />
        </div>
      </div>
    );
  }
}
