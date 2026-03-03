import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform, Vibration} from 'react-native';
import {VoiceType} from '../../types/speech';
import {colors} from '../../styles/colors';
import {typography} from '../../styles/typography';
import {spacing, borderRadius} from '../../styles/spacing';

interface VoiceTypeSelectorProps {
  value: VoiceType;
  onValueChange: (voice: VoiceType) => void;
  onPreview?: () => void;
  disabled?: boolean;
}

const VoiceTypeSelector: React.FC<VoiceTypeSelectorProps> = ({
  value,
  onValueChange,
  onPreview,
  disabled = false,
}) => {
  const handleSelect = (voice: VoiceType) => {
    if (disabled || voice === value) {
      return;
    }
    onValueChange(voice);
    if (Platform.OS !== 'web') {
      Vibration.vibrate(10);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Voice Type</Text>
      </View>
      <View style={styles.segmentedControl}>
        <TouchableOpacity
          style={[
            styles.segment,
            value === VoiceType.MALE && styles.segmentActive,
          ]}
          onPress={() => handleSelect(VoiceType.MALE)}
          disabled={disabled}
          accessibilityLabel="Male voice"
          accessibilityHint="Select male voice for speech"
          accessibilityRole="radio"
          accessibilityState={{selected: value === VoiceType.MALE}}>
          <Text
            style={[
              styles.segmentText,
              value === VoiceType.MALE && styles.segmentTextActive,
            ]}>
            Male
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.segment,
            value === VoiceType.FEMALE && styles.segmentActive,
          ]}
          onPress={() => handleSelect(VoiceType.FEMALE)}
          disabled={disabled}
          accessibilityLabel="Female voice"
          accessibilityHint="Select female voice for speech"
          accessibilityRole="radio"
          accessibilityState={{selected: value === VoiceType.FEMALE}}>
          <Text
            style={[
              styles.segmentText,
              value === VoiceType.FEMALE && styles.segmentTextActive,
            ]}>
            Female
          </Text>
        </TouchableOpacity>
      </View>
      {onPreview && (
        <TouchableOpacity
          style={styles.previewButton}
          onPress={onPreview}
          disabled={disabled}
          accessibilityLabel="Test voice"
          accessibilityHint="Plays a sample phrase with the selected voice"
          accessibilityRole="button">
          <Text style={styles.previewText}>Test Voice</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  header: {
    marginBottom: spacing.sm,
  },
  label: {
    ...typography.labelMd,
    color: colors.neutral900,
  },
  segmentedControl: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  segment: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: Platform.OS === 'ios' ? 44 : 48,
    backgroundColor: colors.white,
  },
  segmentActive: {
    backgroundColor: colors.primary,
  },
  segmentText: {
    ...typography.buttonLabel,
    color: colors.primary,
  },
  segmentTextActive: {
    color: colors.white,
  },
  previewButton: {
    marginTop: spacing.sm,
    alignSelf: 'flex-start',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    minHeight: 44,
    justifyContent: 'center',
  },
  previewText: {
    ...typography.bodySm,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});

export default VoiceTypeSelector;
