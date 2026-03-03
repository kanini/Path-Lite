import {renderHook, act} from '@testing-library/react-native';
import {useConversationalFlow} from '../../src/hooks/useConversationalFlow';
import {ConversationState} from '../../src/types/conversation';
import * as Speech from 'expo-speech';
import Voice from '@react-native-voice/voice';

const TEST_QUESTIONS = [
  'Please provide the Medical Record Number',
  'What is the patient name?',
  'What is the diagnosis?',
];

describe('useConversationalFlow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with IDLE state', () => {
    const {result} = renderHook(() =>
      useConversationalFlow(TEST_QUESTIONS),
    );
    expect(result.current.conversationState).toBe(ConversationState.IDLE);
    expect(result.current.currentQuestionIndex).toBe(0);
    expect(result.current.currentAnswer).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('should start conversation and call TTS speak', async () => {
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

  it('should only start once per session', async () => {
    const {result} = renderHook(() =>
      useConversationalFlow(TEST_QUESTIONS),
    );

    await act(async () => {
      await result.current.startConversation();
    });
    await act(async () => {
      await result.current.startConversation();
    });

    expect(Speech.speak).toHaveBeenCalledTimes(1);
  });

  it('should stop conversation and reset state', async () => {
    const {result} = renderHook(() =>
      useConversationalFlow(TEST_QUESTIONS),
    );

    await act(async () => {
      await result.current.startConversation();
    });
    await act(async () => {
      await result.current.stopConversation();
    });

    expect(result.current.conversationState).toBe(ConversationState.IDLE);
    expect(Speech.stop).toHaveBeenCalled();
  });

  it('should skip question and move to next', async () => {
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

  it('should provide retryCurrentQuestion function', async () => {
    const {result} = renderHook(() =>
      useConversationalFlow(TEST_QUESTIONS),
    );
    expect(typeof result.current.retryCurrentQuestion).toBe('function');
  });

  it('should cleanup on unmount', () => {
    const {unmount} = renderHook(() =>
      useConversationalFlow(TEST_QUESTIONS),
    );
    unmount();
    expect(Speech.stop).toHaveBeenCalled();
    expect(Voice.destroy).toHaveBeenCalled();
  });

  it('should handle empty questions array', () => {
    const {result} = renderHook(() => useConversationalFlow([]));
    expect(result.current.conversationState).toBe(ConversationState.IDLE);
  });

  it('should accept custom config', () => {
    const {result} = renderHook(() =>
      useConversationalFlow(TEST_QUESTIONS, {
        delayBetweenTTSAndSTT: 500,
        autoActivateSTT: true,
        firstQuestion: 'Custom question',
        questions: TEST_QUESTIONS,
      }),
    );
    expect(result.current.conversationState).toBe(ConversationState.IDLE);
  });
});
