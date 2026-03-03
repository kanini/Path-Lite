import React, {useEffect, useRef} from 'react';
import {View, Text, Animated, StyleSheet} from 'react-native';
import {colors} from '../../styles/colors';
import {typography} from '../../styles/typography';
import {spacing} from '../../styles/spacing';

interface ListeningIndicatorProps {
  isActive: boolean;
}

const ListeningIndicator: React.FC<ListeningIndicatorProps> = ({isActive}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    if (isActive) {
      const pulse = Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(pulseAnim, {
              toValue: 1.2,
              duration: 600,
              useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
              toValue: 1,
              duration: 600,
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(opacityAnim, {
              toValue: 1,
              duration: 600,
              useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
              toValue: 0.6,
              duration: 600,
              useNativeDriver: true,
            }),
          ]),
        ]),
      );

      pulse.start();
      return () => pulse.stop();
    } else {
      pulseAnim.setValue(1);
      opacityAnim.setValue(0.6);
    }
  }, [isActive, pulseAnim, opacityAnim]);

  if (!isActive) {
    return null;
  }

  return (
    <View
      style={styles.container}
      accessibilityLabel="Listening for voice input"
      accessibilityLiveRegion="polite">
      <Animated.View
        style={[
          styles.dot,
          {
            transform: [{scale: pulseAnim}],
            opacity: opacityAnim,
          },
        ]}
      />
      <Text style={styles.text}>Listening...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  text: {
    ...typography.bodySm,
    color: colors.primary,
  },
});

export default ListeningIndicator;
