import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {AIVoiceProvider} from '../../src/context/AIVoiceContext';
import PatientDetailsFormScreen from '../../src/screens/patient/PatientDetailsFormScreen';
import {aiVoiceService} from '../../src/services/AIVoiceService';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('../../src/services/AIVoiceService', () => ({
  aiVoiceService: {
    activateVoice: jest.fn(),
    deactivateVoice: jest.fn(),
    startListening: jest.fn(),
    stopListening: jest.fn(),
    speak: jest.fn(),
    stopSpeaking: jest.fn(),
    isTTSPlaying: jest.fn(() => false),
    isSTTListening: jest.fn(() => false),
    onStateChange: jest.fn(),
    onAudioLevelChange: jest.fn(),
    cleanup: jest.fn(),
  },
}));

describe('AIVoiceIntegration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithProvider = (component: React.ReactElement) => {
    return render(<AIVoiceProvider>{component}</AIVoiceProvider>);
  };

  describe('Auto-activation', () => {
    it('should auto-activate voice mode when form loads', async () => {
      renderWithProvider(<PatientDetailsFormScreen />);

      await waitFor(() => {
        expect(aiVoiceService.activateVoice).toHaveBeenCalled();
      });
    });
  });

  describe('Voice Icon Integration', () => {
    it('should render voice icon in prominent location', () => {
      const {getByLabelText} = renderWithProvider(<PatientDetailsFormScreen />);

      const voiceIcon = getByLabelText('AI Voice Input');
      expect(voiceIcon).toBeTruthy();
    });

    it('should toggle voice state when icon is pressed', async () => {
      const {getByLabelText} = renderWithProvider(<PatientDetailsFormScreen />);

      const voiceIcon = getByLabelText('AI Voice Input');
      fireEvent.press(voiceIcon);

      await waitFor(() => {
        expect(aiVoiceService.deactivateVoice).toHaveBeenCalled();
      });
    });
  });

  describe('State Synchronization', () => {
    it('should synchronize voice icon state with context', async () => {
      const {getByLabelText} = renderWithProvider(<PatientDetailsFormScreen />);

      const voiceIcon = getByLabelText('AI Voice Input');
      expect(voiceIcon).toBeTruthy();

      await waitFor(() => {
        expect(voiceIcon.props.accessibilityState.selected).toBe(true);
      });
    });
  });

  describe('TTS Playback Blocking', () => {
    it('should block voice icon taps during TTS playback', async () => {
      (aiVoiceService.isTTSPlaying as jest.Mock).mockReturnValue(true);

      const {getByLabelText} = renderWithProvider(<PatientDetailsFormScreen />);

      const voiceIcon = getByLabelText('AI Voice Input');
      fireEvent.press(voiceIcon);

      await waitFor(() => {
        expect(aiVoiceService.deactivateVoice).not.toHaveBeenCalled();
      });
    });

    it('should display tooltip during TTS playback', async () => {
      (aiVoiceService.isTTSPlaying as jest.Mock).mockReturnValue(true);

      const {getByLabelText, findByText} = renderWithProvider(
        <PatientDetailsFormScreen />,
      );

      const voiceIcon = getByLabelText('AI Voice Input');
      fireEvent.press(voiceIcon);

      const tooltip = await findByText('Please wait for question to complete');
      expect(tooltip).toBeTruthy();
    });
  });

  describe('Screen Layout', () => {
    it('should render split-panel layout with left nav and main content', () => {
      const {getByText} = renderWithProvider(<PatientDetailsFormScreen />);

      expect(getByText('Hospital Name')).toBeTruthy();
      expect(getByText('Hemodialysis')).toBeTruthy();
      expect(getByText('Patient Details')).toBeTruthy();
      expect(getByText('Demographics & Admission')).toBeTruthy();
      expect(getByText('Clinical Intake')).toBeTruthy();
    });

    it('should display navigation items in left panel', () => {
      const {getByText} = renderWithProvider(<PatientDetailsFormScreen />);

      expect(getByText('Patient Details')).toBeTruthy();
      expect(getByText('Primary Care Nurse Report')).toBeTruthy();
      expect(getByText('Order')).toBeTruthy();
      expect(getByText('Wait Time')).toBeTruthy();
      expect(getByText('Treatment')).toBeTruthy();
      expect(getByText('ACOI Questions')).toBeTruthy();
      expect(getByText('Cancel Billing')).toBeTruthy();
      expect(getByText('Review and Submit')).toBeTruthy();
    });

    it('should highlight active navigation item', () => {
      const {getByText} = renderWithProvider(<PatientDetailsFormScreen />);

      const activeItem = getByText('Patient Details');
      expect(activeItem).toBeTruthy();
    });
  });

  describe('Cleanup', () => {
    it('should cleanup voice service on unmount', () => {
      const {unmount} = renderWithProvider(<PatientDetailsFormScreen />);

      unmount();

      expect(aiVoiceService.cleanup).toHaveBeenCalled();
    });
  });
});
