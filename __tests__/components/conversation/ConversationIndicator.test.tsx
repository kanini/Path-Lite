import React from 'react';
import {render, act} from '@testing-library/react-native';
import {Animated} from 'react-native';
import ConversationIndicator from '../../../src/components/conversation/ConversationIndicator';
import {ConversationState} from '../../../src/types/conversation';

describe('ConversationIndicator', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });
  it('should render nothing for IDLE state', () => {
    const {toJSON} = render(
      <ConversationIndicator state={ConversationState.IDLE} />,
    );
    expect(toJSON()).toBeNull();
  });

  it('should display "Speaking..." for SPEAKING state', () => {
    const {getByText} = render(
      <ConversationIndicator state={ConversationState.SPEAKING} />,
    );
    expect(getByText('Speaking...')).toBeTruthy();
  });

  it('should display "Listening..." for LISTENING state', () => {
    const {getByText} = render(
      <ConversationIndicator state={ConversationState.LISTENING} />,
    );
    expect(getByText('Listening...')).toBeTruthy();
  });

  it('should display "Processing..." for PROCESSING state', () => {
    const {getByText} = render(
      <ConversationIndicator state={ConversationState.PROCESSING} />,
    );
    expect(getByText('Processing...')).toBeTruthy();
  });

  it('should have accessibility label for SPEAKING state', () => {
    const {getByLabelText} = render(
      <ConversationIndicator state={ConversationState.SPEAKING} />,
    );
    expect(getByLabelText('Speaking...')).toBeTruthy();
  });

  it('should have accessibility label for LISTENING state', () => {
    const {getByLabelText} = render(
      <ConversationIndicator state={ConversationState.LISTENING} />,
    );
    expect(getByLabelText('Listening...')).toBeTruthy();
  });

  it('should transition between states', () => {
    const {rerender, getByText, toJSON} = render(
      <ConversationIndicator state={ConversationState.SPEAKING} />,
    );
    expect(getByText('Speaking...')).toBeTruthy();

    rerender(<ConversationIndicator state={ConversationState.LISTENING} />);
    expect(getByText('Listening...')).toBeTruthy();

    rerender(<ConversationIndicator state={ConversationState.IDLE} />);
    expect(toJSON()).toBeNull();
  });
});
