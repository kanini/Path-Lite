import React from 'react';
import {render} from '@testing-library/react-native';
import ListeningIndicator from '../../../src/components/voice/ListeningIndicator';

describe('ListeningIndicator', () => {
  it('should render nothing when not active', () => {
    const {queryByText} = render(<ListeningIndicator isActive={false} />);
    expect(queryByText('Listening...')).toBeNull();
  });

  it('should render "Listening..." text when active', () => {
    const {getByText} = render(<ListeningIndicator isActive />);
    expect(getByText('Listening...')).toBeTruthy();
  });

  it('should have accessibility label when active', () => {
    const {getByLabelText} = render(<ListeningIndicator isActive />);
    expect(getByLabelText('Listening for voice input')).toBeTruthy();
  });

  it('should render pulsing dot when active', () => {
    const {toJSON} = render(<ListeningIndicator isActive />);
    expect(toJSON()).toBeTruthy();
  });

  it('should not render pulsing dot when inactive', () => {
    const {toJSON} = render(<ListeningIndicator isActive={false} />);
    expect(toJSON()).toBeNull();
  });
});
