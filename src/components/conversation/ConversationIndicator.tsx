import React, {useEffect, useRef} from 'react';
import {View, Text, Animated, StyleSheet, ActivityIndicator} from 'react-native';
import {ConversationState} from '../../types/conversation';
import {colors} from '../../styles/colors';
import {typography} from '../../styles/typography';
import {spacing} from '../../styles/spacing';

interface ConversationIndicatorProps {
  state: ConversationState;
}

const STATE_LABELS: Record<ConversationState, string> = {
  [ConversationState.IDLE]: '',
  [ConversationState.SPEAKING]: 'Speaking...',
  [ConversationState.LISTENING]: 'Listening...',
  [ConversationState.PROCESSING]: 'Processing...',
};

const ConversationIndicator: React.FC<ConversationIndicatorProps> = ({
  state,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (state === ConversationState.IDLE) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [state, fadeAnim]);

  useEffect(() => {
    if (
      state === ConversationState.SPEAKING ||
      state === ConversationState.LISTENING
    ) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      );
      pulse.start();
      return () => pulse.stop();
    } else {
      pulseAnim.setValue(1);
    }
  }, [state, pulseAnim]);

  if (state === ConversationState.IDLE) {
    return null;
  }

  return (
    <Animated.View
      style={[styles.container, {opacity: fadeAnim}]}
      accessibilityLabel={STATE_LABELS[state]}
      accessibilityLiveRegion="assertive">
      <View style={styles.iconContainer}>
        {state === ConversationState.SPEAKING && (
          <Animated.View
            style={[
              styles.speakerIcon,
              {transform: [{scale: pulseAnim}]},
            ]}>
            <View style={styles.speakerBody} />
            <View style={styles.soundWave1} />
            <View style={styles.soundWave2} />
          </Animated.View>
        )}

        {state === ConversationState.LISTENING && (
          <Animated.View
            style={[
              styles.micIcon,
              {transform: [{scale: pulseAnim}]},
            ]}>
            <View style={styles.micBody} />
            <View style={styles.micStand} />
          </Animated.View>
        )}

        {state === ConversationState.PROCESSING && (
          <ActivityIndicator size="small" color={colors.primary} />
        )}
      </View>
      <Text style={styles.label}>{STATE_LABELS[state]}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    ...typography.bodySm,
    color: colors.primary,
  },
  speakerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  speakerBody: {
    width: 8,
    height: 10,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
  soundWave1: {
    width: 3,
    height: 14,
    borderRightWidth: 2,
    borderRightColor: colors.primary,
    borderRadius: 4,
    marginLeft: 2,
  },
  soundWave2: {
    width: 3,
    height: 18,
    borderRightWidth: 2,
    borderRightColor: colors.primary,
    borderRadius: 4,
    marginLeft: 1,
    opacity: 0.6,
  },
  micIcon: {
    alignItems: 'center',
  },
  micBody: {
    width: 10,
    height: 14,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  micStand: {
    width: 2,
    height: 6,
    backgroundColor: colors.primary,
    marginTop: 1,
  },
});

export default ConversationIndicator;
