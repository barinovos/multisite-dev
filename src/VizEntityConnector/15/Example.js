import React from 'react';
import { Link, PlusIcon, Title, Select, OrderedList } from 'prism-reactjs';
import VizEntityConnector from './VizEntityConnector';

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
};

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
  );

class SampleSubLevel extends React.Component {
  state = {
    collapsed: true
  };

  render() {
    return (
      <div style={styles.textCenter}>
        {this.state.collapsed ? (
          <Link
            type="with-icon"
            icon={<PlusIcon size="small" />}
            onClick={() => this.setState({ collapsed: false })}
          >
            {this.props.text}
          </Link>
        ) : (
          <OrderedList
            data={[
              'Some elements goes here',
              'One more element and maybe a link:',
              <Link onClick={() => this.setState({ collapsed: true })}>
                Collapse me back
              </Link>
            ]}
          />
        )}
      </div>
    );
  }
}

const data = [
  {
    key: 1,
    title: 'puppyfood'
  },
  {
    key: 2,
    title: 'Peach'
  },
  {
    key: 3,
    title: 'galesbure'
  }
];

const getLevels = () => [
  <div>
    <Title size="h2" style={{ marginBottom: 15 }}>
      Primary location
    </Title>
    <Select selectOptions={data} />
    <SampleSubLevel text="I am primary" />
  </div>,
  <div>
    <Select selectOptions={data} />
    <SampleSubLevel text="I am Secondary" />
  </div>,
  <div>
    <Select selectOptions={data} />
    <SampleSubLevel text="I am Third" />
  </div>,
  <div>
    <Select selectOptions={data} />
    <SampleSubLevel text="I am Fourth" />
  </div>
];

const getConnectors = (
  disabledConnection,
  activeConnector,
  updateActiveConnector,
  onCollapse
) => [
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
];

class Example extends React.Component {
  state = {
    activeConnector: null,
    disabledConnection: 3,
    locationsAmount: 2
  };

  render() {
    const { activeConnector, disabledConnection, locationsAmount } = this.state;
    const Levels = getLevels();
    const onCollapse = () => this.setState({ activeConnector: null });
    const addLocations = () =>
      locationsAmount < Levels.length &&
      this.setState({ locationsAmount: locationsAmount + 1 });
    const deleteLocation = () =>
      locationsAmount > 2 &&
      this.setState({ locationsAmount: locationsAmount - 1 });

    return (
      <div style={{ height: '100%' }}>
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
            connectors={getConnectors(
              disabledConnection,
              activeConnector,
              activeConnector => this.setState({ activeConnector }),
              onCollapse
            )}
            activeConnection={activeConnector}
            disabledConnection={disabledConnection}
          />
        </div>
      </div>
    );
  }
}

export default Example;
