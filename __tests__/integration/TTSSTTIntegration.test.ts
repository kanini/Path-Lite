import {renderHook, act} from '@testing-library/react-native';
import {useConversationalFlow} from '../../src/hooks/useConversationalFlow';
import {ConversationState} from '../../src/types/conversation';
import * as Speech from 'expo-speech';
import Voice from '@react-native-voice/voice';
import {check, RESULTS} from 'react-native-permissions';

const FIRST_QUESTION = 'Please provide the Medical Record Number';
const TEST_QUESTIONS = [
  FIRST_QUESTION,
  'What is the patient name?',
];

describe('TTS-STT Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (check as jest.Mock).mockResolvedValue(RESULTS.GRANTED);
  });

  it('should speak first question when conversation starts (AC-2)', async () => {
    const {result} = renderHook(() =>
      useConversationalFlow(TEST_QUESTIONS),
    );

    await act(async () => {
      await result.current.startConversation();
    });

    expect(Speech.speak).toHaveBeenCalledWith(
      expect.stringContaining('Medical Record Number'),
      expect.anything(),
    );
  });

  it('should initialize with IDLE state before conversation', () => {
    const {result} = renderHook(() =>
      useConversationalFlow(TEST_QUESTIONS),
    );
    expect(result.current.conversationState).toBe(ConversationState.IDLE);
  });

  it('should track question index starting at 0', () => {
    const {result} = renderHook(() =>
      useConversationalFlow(TEST_QUESTIONS),
    );
    expect(result.current.currentQuestionIndex).toBe(0);
  });

  it('should stop TTS and STT when conversation is stopped', async () => {
    const {result} = renderHook(() =>
      useConversationalFlow(TEST_QUESTIONS),
    );

    await act(async () => {
      await result.current.startConversation();
    });

    await act(async () => {
      await result.current.stopConversation();
    });

    expect(Speech.stop).toHaveBeenCalled();
    expect(result.current.conversationState).toBe(ConversationState.IDLE);
  });

  it('should skip to next question', async () => {
    const {result} = renderHook(() =>
      useConversationalFlow(TEST_QUESTIONS),
    );

    await act(async () => {
      await result.current.startConversation();
    });

    await act(async () => {
      result.current.skipQuestion();
    });

    expect(result.current.currentQuestionIndex).toBe(1);
  });

  it('should handle empty questions array gracefully', () => {
    const {result} = renderHook(() => useConversationalFlow([]));
    expect(result.current.conversationState).toBe(ConversationState.IDLE);
  });

  it('should cleanup resources on unmount', () => {
    const {unmount} = renderHook(() =>
      useConversationalFlow(TEST_QUESTIONS),
    );
    unmount();
    expect(Speech.stop).toHaveBeenCalled();
    expect(Voice.destroy).toHaveBeenCalled();
  });

  it('should have null error initially', () => {
    const {result} = renderHook(() =>
      useConversationalFlow(TEST_QUESTIONS),
    );
    expect(result.current.error).toBeNull();
  });

  it('should have null currentAnswer initially', () => {
    const {result} = renderHook(() =>
      useConversationalFlow(TEST_QUESTIONS),
    );
    expect(result.current.currentAnswer).toBeNull();
  });

  it('should provide retry function', () => {
    const {result} = renderHook(() =>
      useConversationalFlow(TEST_QUESTIONS),
    );
    expect(typeof result.current.retryCurrentQuestion).toBe('function');
  });
});
