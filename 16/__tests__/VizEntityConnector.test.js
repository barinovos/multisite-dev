import React from 'react';
import { render } from '@testing-library/react';
import VizEntityConnector from '../VizEntityConnector';
import { Link, PlusIcon, Select, Title } from 'prism-reactjs';

const sampleText = 'Primary location';

describe('VizEntityConnector', () => {
  it('should has no children if no levels provided ', () => {
    const { container, queryByText } = render(
      <VizEntityConnector levels={[]} connectors={[]} />
    );
    expect(container.firstChild).toBe(null);
    expect(queryByText(sampleText)).not.toBeInTheDocument();
  });

  it('should has minimum width and height set up', () => {
    const { container } = render(
      <VizEntityConnector levels={Levels} connectors={Connectors} />
    );
    expect(container.firstChild).toHaveStyle(
      `height: 100%; min-width: 1050px; min-height: 650px`
    );
  });

  it('should render children', () => {
    const { getByText } = render(
      <VizEntityConnector levels={Levels} connectors={Connectors} />
    );
    expect(getByText(sampleText)).toBeVisible();
  });

  it('should render path elements according to the amount of levels', () => {
    render(<VizEntityConnector levels={Levels} connectors={Connectors} />);
    expect(document.querySelectorAll('path').length).toBe(16);
  });

  it('should render path elements according to the amount of levels', () => {
    render(
      <VizEntityConnector
        levels={Levels.slice(0, -2)}
        connectors={Connectors}
      />
    );
    expect(document.querySelectorAll('path').length).toBe(5);
  });

  it('should render path elements according to the amount of levels', () => {
    render(
      <VizEntityConnector
        levels={Levels.slice(0, -1)}
        connectors={Connectors}
      />
    );
    expect(document.querySelectorAll('path').length).toBe(10);
  });
});

const SampleConnector = ({ text }) => <Link>{text}</Link>;

const SampleSubLevel = ({ text }) => (
  <Link type="with-icon" icon={<PlusIcon size="small" />}>
    {text}
  </Link>
);

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
];

const Levels = [
  <div>
    <Title>{sampleText}</Title>
    <Select rowsData={data} />
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
];

const Connectors = [
  <SampleConnector text="Primary to 2" id={0} />,
  <SampleConnector text="Primary to 3" id={1} />,
  <SampleConnector text="2 to 3" id={2} />,
  <SampleConnector text="Primary to 4" id={3} />,
  <SampleConnector text="4 to 2" id={4} />,
  <SampleConnector text="4 to 3" id={5} />
];
