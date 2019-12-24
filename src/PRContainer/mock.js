import uuid from 'uuid/v4';

export const sampleSchedule = {
  frequency: '4 hours',
  rpThreshold: 10,
  type: 'App consistent'
};

export const azList = [
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

export const clustersList = [
  {
    key: 1,
    value: 'value1',
    az: 'local',
    title: 'Peach Seeds'
  },
  {
    key: 2,
    value: 'value2',
    az: 'local',
    title: 'almond_beast'
  },
  {
    key: 3,
    value: 'value3',
    az: 'pc',
    title: 'mind_games'
  },
  {
    key: 4,
    value: 'value4',
    az: 'pc',
    title: 'static_pressure'
  },
  {
    key: 5,
    value: 'value5',
    az: 'pc3',
    title: 'barby_ken'
  },
  {
    key: 6,
    value: 'value6',
    az: 'pc3',
    title: 'my_best_one'
  }
];

export const fetchClustersList = (az, cb) => {
  setTimeout(() =>
    cb(clustersList.filter(cl => cl.az === az)), 2000);
};

export const ids = {
  primeLocation: uuid(),
  secondaryLocation: uuid(),
  // for View Mode
  thirdLocation: uuid(),
  _prime_to_2nd_schedule: uuid(),
  _2nd_to_3rd_schedule: uuid(),
  _prime_to_3rd_schedule: uuid()
};

export const mockCreateData = {
  locations: [
    {
      id: ids.primeLocation,
      azName: azList[0].title,
      clusterName: clustersList[1].title,
      localSchedule: sampleSchedule
    }
  ],
  schedules: []
};

export const mockViewData = {
  locations: [
    {
      id: ids.primeLocation,
      azName: azList[0].title,
      clusterName: clustersList[0].title,
      localSchedule: sampleSchedule
    },
    {
      id: ids.secondaryLocation,
      azName: azList[1].title,
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

export const mockViewExtendedData = {
  locations: [
    {
      id: ids.primeLocation,
      azName: azList[0].title,
      clusterName: clustersList[0].title,
      localSchedule: sampleSchedule
    },
    {
      id: ids.secondaryLocation,
      azName: azList[1].title,
      clusterName: clustersList[1].title,
      localSchedule: sampleSchedule
    },
    {
      id: ids.thirdLocation,
      azName: azList[2].title,
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
