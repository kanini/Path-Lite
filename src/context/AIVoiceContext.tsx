import React, {createContext, useContext, useState, useCallback, ReactNode} from 'react';
import {AIVoiceContextValue, AIVoiceContextState} from '../types/ai';

const initialState: AIVoiceContextState = {
  isActive: false,
  isListening: false,
  isTTSPlaying: false,
  currentQuestion: null,
  audioLevel: 0,
};

const AIVoiceContext = createContext<AIVoiceContextValue | undefined>(undefined);

interface AIVoiceProviderProps {
  children: ReactNode;
}

export const AIVoiceProvider: React.FC<AIVoiceProviderProps> = ({children}) => {
  const [state, setState] = useState<AIVoiceContextState>(initialState);

  const activateVoice = useCallback(() => {
    setState(prev => ({...prev, isActive: true}));
  }, []);

  const deactivateVoice = useCallback(() => {
    setState(prev => ({
      ...prev,
      isActive: false,
      isListening: false,
      currentQuestion: null,
      audioLevel: 0,
    }));
  }, []);

  const startListening = useCallback(() => {
    setState(prev => ({...prev, isListening: true}));
  }, []);

  const stopListening = useCallback(() => {
    setState(prev => ({...prev, isListening: false, audioLevel: 0}));
  }, []);

  const setTTSPlaying = useCallback((playing: boolean) => {
    setState(prev => ({...prev, isTTSPlaying: playing}));
  }, []);

  const setCurrentQuestion = useCallback((question: string | null) => {
    setState(prev => ({...prev, currentQuestion: question}));
  }, []);

  const setAudioLevel = useCallback((level: number) => {
    setState(prev => ({...prev, audioLevel: level}));
  }, []);

  const value: AIVoiceContextValue = {
    ...state,
    activateVoice,
    deactivateVoice,
    startListening,
    stopListening,
    setTTSPlaying,
    setCurrentQuestion,
    setAudioLevel,
  };

  return <AIVoiceContext.Provider value={value}>{children}</AIVoiceContext.Provider>;
};

export const useAIVoice = (): AIVoiceContextValue => {
  const context = useContext(AIVoiceContext);
  if (!context) {
    throw new Error('useAIVoice must be used within AIVoiceProvider');
  }
  return context;
};
