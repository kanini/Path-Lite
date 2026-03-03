import React, {useEffect, useRef} from 'react';
import {TouchableOpacity, StyleSheet, View, Text, Animated, Easing} from 'react-native';
import {VoiceState, VoiceIconProps} from '../../types/voice';
import {colors} from '../../styles/colors';
import WaveformAnimation from './WaveformAnimation';

const ICON_SIZE = 48;
const TRANSITION_DURATION = 200;

const AIVoiceIcon: React.FC<VoiceIconProps> = ({
  state,
  onPress,
  disabled = false,
  size = ICON_SIZE,
  tooltipMessage,
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const colorProgress = useRef(new Animated.Value(0)).current;
  const tooltipOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (state === VoiceState.ACTIVE) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.15,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      Animated.timing(scale, {
        toValue: 1,
        duration: TRANSITION_DURATION,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [state, scale]);

  useEffect(() => {
    Animated.timing(colorProgress, {
      toValue: state === VoiceState.INACTIVE ? 0 : 1,
      duration: TRANSITION_DURATION,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [state, colorProgress]);

  useEffect(() => {
    Animated.timing(tooltipOpacity, {
      toValue: tooltipMessage ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [tooltipMessage, tooltipOpacity]);

  const backgroundColor = colorProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.neutral300, colors.primary],
  });

  const iconColor =
    state === VoiceState.INACTIVE ? colors.neutral700 : colors.white;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
        accessibilityLabel="AI Voice Input"
        accessibilityHint={
          state === VoiceState.INACTIVE
            ? 'Tap to start voice input'
            : 'Tap to stop voice input'
        }
        accessibilityRole="button"
        accessibilityState={{disabled, selected: state !== VoiceState.INACTIVE}}>
        <Animated.View
          style={[
            styles.iconContainer,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor,
              opacity: disabled ? 0.4 : 1,
            },
          ]}>
          <Animated.View style={{transform: [{scale}]}}>
            {state === VoiceState.LISTENING ? (
              <WaveformAnimation isActive barCount={5} barColor={colors.white} height={16} />
            ) : (
              <View style={styles.micIcon}>
                <View style={[styles.micBody, {backgroundColor: iconColor}]} />
                <View style={[styles.micStand, {backgroundColor: iconColor}]} />
              </View>
            )}
          </Animated.View>
        </Animated.View>
      </TouchableOpacity>
      {tooltipMessage && (
        <Animated.View style={[styles.tooltip, {opacity: tooltipOpacity}]}>
          <Text style={styles.tooltipText}>{tooltipMessage}</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  micIcon: {
    alignItems: 'center',
  },
  micBody: {
    width: 10,
    height: 14,
    borderRadius: 5,
  },
  micStand: {
    width: 2,
    height: 6,
    marginTop: 1,
  },
  tooltip: {
    position: 'absolute',
    top: -40,
    backgroundColor: colors.neutral900,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  tooltipText: {
    color: colors.white,
    fontSize: 12,
    textAlign: 'center',
  },
});

export default AIVoiceIcon;
