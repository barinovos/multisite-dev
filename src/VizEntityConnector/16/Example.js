import React, { useState, Fragment } from 'react'
import { Link, PlusIcon, Title, Select, OrderedList } from 'prism-reactjs'
import VizEntityConnector from './VizEntityConnector'

const styles = {
  textCenter: {
    lineHeight: '1.5em',
    textAlign: 'center',
    padding: '.5em 1em'
  },
  topContainer: {
    margin: '1em 2em 0'
  },
  mainContainer: {
    height: 'calc(100% - 6em)',
    margin: '2em'
  }
}

const SampleConnector = ({
  text,
  disabledConnection,
  activeConnector,
  id,
  onCollapse,
  onExpand
}) =>
  activeConnector === id ? (
    <OrderedList
      data={[
        'Some elements goes here',
        'One more element and maybe a link:',
        <Link onClick={onCollapse}>Collapse me back</Link>
      ]}
    />
  ) : (
    <div style={{ textAlign: 'center' }}>
      <Link onClick={() => onExpand(id)} disabled={disabledConnection === id}>
        {text}
      </Link>
    </div>
  )

const SampleSubLevel = ({ text }) => {
  const [collapsed, changeState] = useState(true)

  return (
    <div style={styles.textCenter}>
      {collapsed ? (
        <Link
          type="with-icon"
          icon={<PlusIcon size="small" />}
          onClick={() => changeState(false)}
        >
          {text}
        </Link>
      ) : (
        <OrderedList
          data={[
            'Some elements goes here',
            'One more element and maybe a link:',
            <Link onClick={() => changeState(true)}>Collapse me back</Link>
          ]}
        />
      )}
    </div>
  )
}

const data = [
  {
    key: 1,
    label: 'puppyfood'
  },
  {
    key: 2,
    label: 'Peach'
  },
  {
    key: 3,
    label: 'galesbure'
  }
]

const Example = () => {
  const [activeConnector, updateActiveConnector] = useState(null)
  const [disabledConnection] = useState(3)
  const [locationsAmount, updateLocations] = useState(2)

  const Levels = [
    <div>
      <Title size="h2" style={{ marginBottom: 15 }}>
        Primary location
      </Title>
      <Select rowsData={data}
      />
      <SampleSubLevel text="I am primary" />
    </div>,
    <div>
      <Select rowsData={data} />
      <SampleSubLevel text="I am Secondary" />
    </div>,
    <div>
      <Select rowsData={data} />
      <SampleSubLevel text="I am Thrird" />
    </div>,
    <div>
      <Select rowsData={data} />
      <SampleSubLevel text="I am Fourth" />
    </div>
  ]

  const onCollapse = () => updateActiveConnector(null)

  const Connectors = [
    <SampleConnector
      text="Primary to 2"
      id={0}
      disabledConnection={disabledConnection}
      activeConnector={activeConnector}
      onExpand={updateActiveConnector}
      onCollapse={onCollapse}
    />,
    <SampleConnector
      text="Primary to 3"
      id={1}
      disabledConnection={disabledConnection}
      activeConnector={activeConnector}
      onExpand={updateActiveConnector}
      onCollapse={onCollapse}
    />,
    <SampleConnector
      text="2 to 3"
      id={2}
      disabledConnection={disabledConnection}
      activeConnector={activeConnector}
      onExpand={updateActiveConnector}
      onCollapse={onCollapse}
    />,
    <SampleConnector
      text="Primary to 4"
      id={3}
      disabledConnection={disabledConnection}
      activeConnector={activeConnector}
      onExpand={updateActiveConnector}
      onCollapse={onCollapse}
    />,
    <SampleConnector
      text="4 to 2"
      id={4}
      disabledConnection={disabledConnection}
      activeConnector={activeConnector}
      onExpand={updateActiveConnector}
      onCollapse={onCollapse}
    />,
    <SampleConnector
      text="4 to 3"
      id={5}
      disabledConnection={disabledConnection}
      activeConnector={activeConnector}
      onExpand={updateActiveConnector}
      onCollapse={onCollapse}
    />
  ]

  const addLocations = () =>
    locationsAmount < Levels.length && updateLocations(locationsAmount + 1)

  const deleteLocation = () =>
    locationsAmount > 2 && updateLocations(locationsAmount - 1)

  return (
    <Fragment>
      <div style={styles.topContainer}>
        <Link onClick={addLocations} className="viz-link">
          Add location
        </Link>
        <Link type="delete" onClick={deleteLocation}>
          Remove location
        </Link>
      </div>
      <div style={styles.mainContainer}>
        <VizEntityConnector
          levels={Levels.slice(0, locationsAmount)}
          connectors={Connectors}
          activeConnection={activeConnector}
          disabledConnection={disabledConnection}
        />
      </div>
    </Fragment>
  )
}

export default Example
