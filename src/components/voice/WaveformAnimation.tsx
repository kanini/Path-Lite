import React, {useEffect, useRef} from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import {colors} from '../../styles/colors';

interface WaveformAnimationProps {
  isActive: boolean;
  barCount?: number;
  barColor?: string;
  height?: number;
}

const WaveformAnimation: React.FC<WaveformAnimationProps> = ({
  isActive,
  barCount = 5,
  barColor = colors.primary,
  height = 24,
}) => {
  const animations = useRef<Animated.Value[]>(
    Array.from({length: barCount}, () => new Animated.Value(0.3)),
  ).current;

  useEffect(() => {
    if (isActive) {
      const barAnimations = animations.map((anim, index) =>
        Animated.loop(
          Animated.sequence([
            Animated.timing(anim, {
              toValue: 1,
              duration: 300 + index * 100,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0.3,
              duration: 300 + index * 100,
              useNativeDriver: true,
            }),
          ]),
        ),
      );

      barAnimations.forEach(a => a.start());

      return () => {
        barAnimations.forEach(a => a.stop());
      };
    } else {
      animations.forEach(anim => {
        Animated.timing(anim, {
          toValue: 0.3,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [isActive, animations]);

  return (
    <View style={[styles.container, {height}]} accessibilityLabel="Audio waveform">
      {animations.map((anim, index) => (
        <Animated.View
          key={index}
          style={[
            styles.bar,
            {
              backgroundColor: barColor,
              height,
              transform: [{scaleY: anim}],
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  bar: {
    width: 3,
    borderRadius: 1.5,
  },
});

export default WaveformAnimation;
