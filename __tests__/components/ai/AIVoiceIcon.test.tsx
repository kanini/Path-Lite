import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import AIVoiceIcon from '../../../src/components/voice/AIVoiceIcon';
import {VoiceState} from '../../../src/types/voice';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

describe('AIVoiceIcon', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render correctly in inactive state', () => {
      const {getByLabelText} = render(
        <AIVoiceIcon state={VoiceState.INACTIVE} onPress={mockOnPress} />,
      );

      const button = getByLabelText('AI Voice Input');
      expect(button).toBeTruthy();
    });

    it('should render correctly in active state', () => {
      const {getByLabelText} = render(
        <AIVoiceIcon state={VoiceState.ACTIVE} onPress={mockOnPress} />,
      );

      const button = getByLabelText('AI Voice Input');
      expect(button).toBeTruthy();
    });

    it('should render correctly in listening state', () => {
      const {getByLabelText} = render(
        <AIVoiceIcon state={VoiceState.LISTENING} onPress={mockOnPress} />,
      );

      const button = getByLabelText('AI Voice Input');
      expect(button).toBeTruthy();
    });

    it('should render with custom size', () => {
      const {getByLabelText} = render(
        <AIVoiceIcon state={VoiceState.INACTIVE} onPress={mockOnPress} size={60} />,
      );

      const button = getByLabelText('AI Voice Input');
      expect(button).toBeTruthy();
    });
  });

  describe('Interactions', () => {
    it('should call onPress when tapped', () => {
      const {getByLabelText} = render(
        <AIVoiceIcon state={VoiceState.INACTIVE} onPress={mockOnPress} />,
      );

      const button = getByLabelText('AI Voice Input');
      fireEvent.press(button);

      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });

    it('should not call onPress when disabled', () => {
      const {getByLabelText} = render(
        <AIVoiceIcon state={VoiceState.INACTIVE} onPress={mockOnPress} disabled />,
      );

      const button = getByLabelText('AI Voice Input');
      fireEvent.press(button);

      expect(mockOnPress).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have correct accessibility label', () => {
      const {getByLabelText} = render(
        <AIVoiceIcon state={VoiceState.INACTIVE} onPress={mockOnPress} />,
      );

      expect(getByLabelText('AI Voice Input')).toBeTruthy();
    });

    it('should have correct accessibility hint for inactive state', () => {
      const {getByA11yHint} = render(
        <AIVoiceIcon state={VoiceState.INACTIVE} onPress={mockOnPress} />,
      );

      expect(getByA11yHint('Tap to start voice input')).toBeTruthy();
    });

    it('should have correct accessibility hint for active state', () => {
      const {getByA11yHint} = render(
        <AIVoiceIcon state={VoiceState.ACTIVE} onPress={mockOnPress} />,
      );

      expect(getByA11yHint('Tap to stop voice input')).toBeTruthy();
    });

    it('should have correct accessibility role', () => {
      const {getByRole} = render(
        <AIVoiceIcon state={VoiceState.INACTIVE} onPress={mockOnPress} />,
      );

      expect(getByRole('button')).toBeTruthy();
    });

    it('should indicate disabled state in accessibility', () => {
      const {getByLabelText} = render(
        <AIVoiceIcon state={VoiceState.INACTIVE} onPress={mockOnPress} disabled />,
      );

      const button = getByLabelText('AI Voice Input');
      expect(button.props.accessibilityState.disabled).toBe(true);
    });

    it('should indicate selected state when not inactive', () => {
      const {getByLabelText} = render(
        <AIVoiceIcon state={VoiceState.ACTIVE} onPress={mockOnPress} />,
      );

      const button = getByLabelText('AI Voice Input');
      expect(button.props.accessibilityState.selected).toBe(true);
    });
  });

  describe('Tooltip', () => {
    it('should display tooltip when tooltipMessage is provided', () => {
      const {getByText} = render(
        <AIVoiceIcon
          state={VoiceState.INACTIVE}
          onPress={mockOnPress}
          tooltipMessage="Please wait for question to complete"
        />,
      );

      expect(getByText('Please wait for question to complete')).toBeTruthy();
    });

    it('should not display tooltip when tooltipMessage is null', () => {
      const {queryByText} = render(
        <AIVoiceIcon
          state={VoiceState.INACTIVE}
          onPress={mockOnPress}
          tooltipMessage={null}
        />,
      );

      expect(queryByText('Please wait for question to complete')).toBeNull();
    });
  });

  describe('State Transitions', () => {
    it('should handle transition from inactive to active', () => {
      const {rerender, getByLabelText} = render(
        <AIVoiceIcon state={VoiceState.INACTIVE} onPress={mockOnPress} />,
      );

      rerender(<AIVoiceIcon state={VoiceState.ACTIVE} onPress={mockOnPress} />);

      const button = getByLabelText('AI Voice Input');
      expect(button.props.accessibilityState.selected).toBe(true);
    });

    it('should handle transition from active to listening', () => {
      const {rerender, getByLabelText} = render(
        <AIVoiceIcon state={VoiceState.ACTIVE} onPress={mockOnPress} />,
      );

      rerender(<AIVoiceIcon state={VoiceState.LISTENING} onPress={mockOnPress} />);

      const button = getByLabelText('AI Voice Input');
      expect(button).toBeTruthy();
    });

    it('should handle transition from listening to inactive', () => {
      const {rerender, getByLabelText} = render(
        <AIVoiceIcon state={VoiceState.LISTENING} onPress={mockOnPress} />,
      );

      rerender(<AIVoiceIcon state={VoiceState.INACTIVE} onPress={mockOnPress} />);

      const button = getByLabelText('AI Voice Input');
      expect(button.props.accessibilityState.selected).toBe(false);
    });
  });
});
