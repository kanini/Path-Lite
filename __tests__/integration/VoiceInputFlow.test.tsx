import React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import AIVoiceIcon from '../../src/components/voice/AIVoiceIcon';
import {VoiceState} from '../../src/types/voice';
import Voice from '@react-native-voice/voice';
import {check, request, RESULTS} from 'react-native-permissions';

describe('VoiceInputFlow Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (check as jest.Mock).mockResolvedValue(RESULTS.GRANTED);
    (request as jest.Mock).mockResolvedValue(RESULTS.GRANTED);
  });

  it('should render voice icon in inactive state and respond to press', () => {
    const onPress = jest.fn();
    const {getByLabelText} = render(
      <AIVoiceIcon
        state={VoiceState.INACTIVE}
        onPress={onPress}
      />,
    );
    fireEvent.press(getByLabelText('AI Voice Input'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('should display waveform when in listening state', () => {
    const {getByLabelText} = render(
      <AIVoiceIcon
        state={VoiceState.LISTENING}
        onPress={jest.fn()}
      />,
    );
    expect(getByLabelText('Audio waveform')).toBeTruthy();
  });

  it('should disable icon when disabled prop is true', () => {
    const onPress = jest.fn();
    const {getByLabelText} = render(
      <AIVoiceIcon
        state={VoiceState.INACTIVE}
        onPress={onPress}
        disabled
      />,
    );
    fireEvent.press(getByLabelText('AI Voice Input'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('should transition visual state from inactive to active', () => {
    const onPress = jest.fn();
    const {rerender, getByLabelText} = render(
      <AIVoiceIcon state={VoiceState.INACTIVE} onPress={onPress} />,
    );
    expect(getByLabelText('AI Voice Input')).toBeTruthy();

    rerender(<AIVoiceIcon state={VoiceState.ACTIVE} onPress={onPress} />);
    expect(getByLabelText('AI Voice Input')).toBeTruthy();
  });

  it('should show correct accessibility state for active icon', () => {
    const {getByLabelText} = render(
      <AIVoiceIcon state={VoiceState.ACTIVE} onPress={jest.fn()} />,
    );
    const icon = getByLabelText('AI Voice Input');
    expect(icon.props.accessibilityState.selected).toBe(true);
  });
});
