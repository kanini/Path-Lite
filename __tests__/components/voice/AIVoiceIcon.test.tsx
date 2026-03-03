import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import AIVoiceIcon from '../../../src/components/voice/AIVoiceIcon';
import {VoiceState} from '../../../src/types/voice';

describe('AIVoiceIcon', () => {
  const defaultProps = {
    state: VoiceState.INACTIVE,
    onPress: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render in INACTIVE state', () => {
    const {getByLabelText} = render(<AIVoiceIcon {...defaultProps} />);
    expect(getByLabelText('AI Voice Input')).toBeTruthy();
  });

  it('should render in ACTIVE state', () => {
    const {getByLabelText} = render(
      <AIVoiceIcon {...defaultProps} state={VoiceState.ACTIVE} />,
    );
    expect(getByLabelText('AI Voice Input')).toBeTruthy();
  });

  it('should render in LISTENING state with waveform', () => {
    const {getByLabelText} = render(
      <AIVoiceIcon {...defaultProps} state={VoiceState.LISTENING} />,
    );
    expect(getByLabelText('AI Voice Input')).toBeTruthy();
    expect(getByLabelText('Audio waveform')).toBeTruthy();
  });

  it('should call onPress when tapped', () => {
    const onPress = jest.fn();
    const {getByLabelText} = render(
      <AIVoiceIcon {...defaultProps} onPress={onPress} />,
    );
    fireEvent.press(getByLabelText('AI Voice Input'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('should not call onPress when disabled', () => {
    const onPress = jest.fn();
    const {getByLabelText} = render(
      <AIVoiceIcon {...defaultProps} onPress={onPress} disabled />,
    );
    fireEvent.press(getByLabelText('AI Voice Input'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('should have correct accessibility hint for INACTIVE state', () => {
    const {getByLabelText} = render(<AIVoiceIcon {...defaultProps} />);
    const element = getByLabelText('AI Voice Input');
    expect(element.props.accessibilityHint).toBe('Tap to start voice input');
  });

  it('should have correct accessibility hint for ACTIVE state', () => {
    const {getByLabelText} = render(
      <AIVoiceIcon {...defaultProps} state={VoiceState.ACTIVE} />,
    );
    const element = getByLabelText('AI Voice Input');
    expect(element.props.accessibilityHint).toBe('Tap to stop voice input');
  });

  it('should render with custom size', () => {
    const {getByLabelText} = render(
      <AIVoiceIcon {...defaultProps} size={60} />,
    );
    expect(getByLabelText('AI Voice Input')).toBeTruthy();
  });
});
