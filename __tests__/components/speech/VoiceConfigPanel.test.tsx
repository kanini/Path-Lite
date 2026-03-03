import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import VoiceConfigPanel from '../../../src/components/speech/VoiceConfigPanel';

describe('VoiceConfigPanel', () => {
  it('should render collapsed by default', () => {
    const {getByText, queryByText} = render(<VoiceConfigPanel />);
    expect(getByText('Voice Settings')).toBeTruthy();
    expect(queryByText('Speech Rate')).toBeNull();
  });

  it('should expand when header is pressed', () => {
    const {getByText} = render(<VoiceConfigPanel />);
    fireEvent.press(getByText('Voice Settings'));
    expect(getByText('Speech Rate')).toBeTruthy();
    expect(getByText('Voice Type')).toBeTruthy();
  });

  it('should show Reset to Defaults button when expanded', () => {
    const {getByText} = render(<VoiceConfigPanel />);
    fireEvent.press(getByText('Voice Settings'));
    expect(getByText('Reset to Defaults')).toBeTruthy();
  });

  it('should display config summary in header', () => {
    const {getByText} = render(<VoiceConfigPanel />);
    expect(getByText('1.0x / F')).toBeTruthy();
  });

  it('should collapse when header is pressed again', () => {
    const {getByText, queryByText} = render(<VoiceConfigPanel />);
    fireEvent.press(getByText('Voice Settings'));
    expect(getByText('Speech Rate')).toBeTruthy();
    fireEvent.press(getByText('Voice Settings'));
    expect(queryByText('Speech Rate')).toBeNull();
  });

  it('should have correct accessibility label', () => {
    const {getByLabelText} = render(<VoiceConfigPanel />);
    expect(getByLabelText('Voice settings')).toBeTruthy();
  });
});
