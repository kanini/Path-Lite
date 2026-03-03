import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import VoiceTypeSelector from '../../../src/components/speech/VoiceTypeSelector';
import {VoiceType} from '../../../src/types/speech';

describe('VoiceTypeSelector', () => {
  const defaultProps = {
    value: VoiceType.FEMALE,
    onValueChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with current voice type', () => {
    const {getByText} = render(<VoiceTypeSelector {...defaultProps} />);
    expect(getByText('Male')).toBeTruthy();
    expect(getByText('Female')).toBeTruthy();
    expect(getByText('Voice Type')).toBeTruthy();
  });

  it('should call onValueChange when Male is selected', () => {
    const onValueChange = jest.fn();
    const {getByText} = render(
      <VoiceTypeSelector {...defaultProps} onValueChange={onValueChange} />,
    );
    fireEvent.press(getByText('Male'));
    expect(onValueChange).toHaveBeenCalledWith(VoiceType.MALE);
  });

  it('should not call onValueChange when same voice is selected', () => {
    const onValueChange = jest.fn();
    const {getByText} = render(
      <VoiceTypeSelector {...defaultProps} onValueChange={onValueChange} />,
    );
    fireEvent.press(getByText('Female'));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('should render preview button when onPreview is provided', () => {
    const {getByText} = render(
      <VoiceTypeSelector {...defaultProps} onPreview={jest.fn()} />,
    );
    expect(getByText('Test Voice')).toBeTruthy();
  });

  it('should call onPreview when preview button is pressed', () => {
    const onPreview = jest.fn();
    const {getByText} = render(
      <VoiceTypeSelector {...defaultProps} onPreview={onPreview} />,
    );
    fireEvent.press(getByText('Test Voice'));
    expect(onPreview).toHaveBeenCalled();
  });

  it('should not render preview button when onPreview is not provided', () => {
    const {queryByText} = render(<VoiceTypeSelector {...defaultProps} />);
    expect(queryByText('Test Voice')).toBeNull();
  });

  it('should have accessibility labels', () => {
    const {getByLabelText} = render(<VoiceTypeSelector {...defaultProps} />);
    expect(getByLabelText('Male voice')).toBeTruthy();
    expect(getByLabelText('Female voice')).toBeTruthy();
  });

  it('should show selected state for current voice', () => {
    const {getByLabelText} = render(
      <VoiceTypeSelector {...defaultProps} value={VoiceType.MALE} />,
    );
    const maleButton = getByLabelText('Male voice');
    expect(maleButton.props.accessibilityState.selected).toBe(true);
  });
});
