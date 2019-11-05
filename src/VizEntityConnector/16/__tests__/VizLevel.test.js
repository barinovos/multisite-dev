import React from 'react';
import { render } from '@testing-library/react';
import VizLevel from '../VizLevel';

describe('VizLevel', () => {
  it('renders children', () => {
    const testText = 'Test text';

    const { getByText } = render(<VizLevel>{testText}</VizLevel>);
    expect(getByText(testText)).toBeInTheDocument();
    expect(getByText(testText)).toBeVisible();
  });

  it('renders style', () => {
    const style = { background: 'red' };

    const { getByTestId } = render(<VizLevel style={style} />);
    expect(getByTestId(VizLevel.testId)).toHaveStyle(
      JSON.stringify(style).replace(/[{}"]/gi, '')
    );
  });
});
