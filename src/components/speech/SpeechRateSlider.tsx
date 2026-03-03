import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import Slider from '@react-native-community/slider';
import {colors} from '../../styles/colors';
import {typography} from '../../styles/typography';
import {spacing} from '../../styles/spacing';

interface SpeechRateSliderProps {
  value: number;
  onValueChange: (rate: number) => void;
  disabled?: boolean;
}

const MARKERS = [0.5, 1.0, 1.5, 2.0];
const STEP = 0.1;

const SpeechRateSlider: React.FC<SpeechRateSliderProps> = ({
  value,
  onValueChange,
  disabled = false,
}) => {
  const handleChange = (newValue: number) => {
    const rounded = Math.round(newValue * 10) / 10;
    onValueChange(rounded);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Speech Rate</Text>
        <Text style={styles.valueText}>{value.toFixed(1)}x</Text>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={0.5}
        maximumValue={2.0}
        step={STEP}
        value={value}
        onValueChange={handleChange}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.neutral300}
        thumbTintColor={colors.primary}
        disabled={disabled}
        accessibilityLabel="Speech rate slider"
        accessibilityHint={`Current rate ${value.toFixed(1)}x. Adjust between 0.5x and 2.0x`}
        accessibilityRole="adjustable"
      />
      <View style={styles.markerContainer}>
        {MARKERS.map(marker => (
          <Text
            key={marker}
            style={[
              styles.marker,
              marker === 1.0 && styles.markerDefault,
            ]}>
            {marker.toFixed(1)}x
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    ...typography.labelMd,
    color: colors.neutral900,
  },
  valueText: {
    ...typography.bodyMd,
    color: colors.primary,
    fontWeight: '600',
  },
  slider: {
    width: '100%',
    height: Platform.OS === 'ios' ? 40 : 48,
  },
  markerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xs,
  },
  marker: {
    ...typography.caption,
    color: colors.neutral500,
  },
  markerDefault: {
    color: colors.primary,
    fontWeight: '600',
  },
});

export default SpeechRateSlider;
