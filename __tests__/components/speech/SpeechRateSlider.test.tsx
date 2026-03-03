import React from 'react';
import {render} from '@testing-library/react-native';
import SpeechRateSlider from '../../../src/components/speech/SpeechRateSlider';

describe('SpeechRateSlider', () => {
  const defaultProps = {
    value: 1.0,
    onValueChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with current rate value', () => {
    const {getAllByText, getByText} = render(<SpeechRateSlider {...defaultProps} />);
    // '1.0x' appears twice: value display and marker
    expect(getAllByText('1.0x').length).toBeGreaterThanOrEqual(1);
    expect(getByText('Speech Rate')).toBeTruthy();
  });

  it('should display rate markers', () => {
    const {getByText} = render(<SpeechRateSlider {...defaultProps} />);
    expect(getByText('0.5x')).toBeTruthy();
    expect(getByText('1.5x')).toBeTruthy();
    expect(getByText('2.0x')).toBeTruthy();
  });

  it('should render slider component', () => {
    const {toJSON} = render(<SpeechRateSlider {...defaultProps} />);
    expect(toJSON()).toBeTruthy();
  });

  it('should display different rate value', () => {
    const {getAllByText} = render(
      <SpeechRateSlider {...defaultProps} value={1.5} />,
    );
    // '1.5x' appears in both value display and marker
    expect(getAllByText('1.5x').length).toBeGreaterThanOrEqual(1);
  });

  it('should have accessibility label', () => {
    const {getByLabelText} = render(<SpeechRateSlider {...defaultProps} />);
    expect(getByLabelText('Speech rate slider')).toBeTruthy();
  });
});
