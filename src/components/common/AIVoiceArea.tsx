import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../styles/colors';
import {typography} from '../../styles/typography';
import {spacing, borderRadius} from '../../styles/spacing';

interface AIVoiceAreaProps {
  isActive?: boolean;
  isListening?: boolean;
  onPress?: () => void;
  statusLabel?: string;
  statusSub?: string;
  testID?: string;
}

const AIVoiceArea: React.FC<AIVoiceAreaProps> = ({
  isActive = false,
  isListening = false,
  onPress,
  statusLabel = 'AI Voice — Inactive',
  statusSub = 'Tap to activate conversational mode',
  testID,
}) => {
  return (
    <View
      style={[
        styles.container,
        isListening && styles.containerListening,
      ]}
      testID={testID}>
      <TouchableOpacity
        style={[
          styles.icon,
          isActive ? styles.iconActive : styles.iconInactive,
          isListening && styles.iconListening,
        ]}
        onPress={onPress}
        disabled={!onPress}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel="AI Voice"
        accessibilityHint={statusSub}>
        <Text style={styles.iconText}>🎤</Text>
      </TouchableOpacity>
      <View style={styles.status}>
        <Text
          style={[
            styles.statusLabel,
            isListening && styles.statusLabelListening,
          ]}>
          {statusLabel}
        </Text>
        <Text
          style={[
            styles.statusSub,
            isListening && styles.statusSubListening,
          ]}>
          {statusSub}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    paddingHorizontal: 14,
    backgroundColor: colors.white,
    borderRadius: borderRadius.sm,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: spacing.lg,
  },
  containerListening: {
    backgroundColor: colors.primaryLight,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  iconInactive: {
    backgroundColor: colors.neutral100,
    borderColor: colors.neutral300,
  },
  iconActive: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  iconListening: {
    backgroundColor: colors.primaryLight,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  iconText: {
    fontSize: 22,
  },
  status: {
    flex: 1,
    gap: 2,
  },
  statusLabel: {
    ...typography.labelMd,
    color: colors.neutral900,
    fontWeight: '600',
  },
  statusLabelListening: {
    color: colors.primary,
  },
  statusSub: {
    ...typography.bodySm,
    color: colors.neutral500,
    fontSize: 11,
  },
  statusSubListening: {
    color: colors.primary,
  },
});

export default AIVoiceArea;
