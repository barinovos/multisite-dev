import React from 'react';
import { render } from '@testing-library/react';
import VizConnector from '../VizConnector';
import styles from '../../Styles';

describe('VizConnector', () => {
  it('renders children', () => {
    const testText = 'Test text';

    const { getByText } = render(<VizConnector>{testText}</VizConnector>);
    expect(getByText(testText)).toBeInTheDocument();
    expect(getByText(testText)).toBeVisible();
  });

  it('should change the styles if it is active', () => {
    const { getByTestId } = render(<VizConnector isActive={true} />);
    expect(getByTestId(VizConnector.testId)).toHaveStyle(
      JSON.stringify(styles.vizConnectorActive).replace(/[{}"]/gi, '')
    );
  });
});
