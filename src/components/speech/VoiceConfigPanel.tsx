import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  ActivityIndicator,
} from 'react-native';
import {colors} from '../../styles/colors';
import {typography} from '../../styles/typography';
import {spacing, borderRadius} from '../../styles/spacing';
import SpeechRateSlider from './SpeechRateSlider';
import VoiceTypeSelector from './VoiceTypeSelector';
import {useVoiceConfig} from '../../hooks/useVoiceConfig';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const VoiceConfigPanel: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    config,
    isPreviewPlaying,
    updateSpeechRate,
    updateVoiceType,
    resetToDefaults,
    previewVoice,
    cancelPreview,
  } = useVoiceConfig();

  const togglePanel = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={togglePanel}
        accessibilityLabel="Voice settings"
        accessibilityHint={
          isExpanded ? 'Tap to collapse settings' : 'Tap to expand settings'
        }
        accessibilityRole="button"
        accessibilityState={{expanded: isExpanded}}>
        <Text style={styles.headerIcon}>
          {isExpanded ? '\u25BC' : '\u25B6'}
        </Text>
        <Text style={styles.headerText}>Voice Settings</Text>
        <Text style={styles.configSummary}>
          {config.rate.toFixed(1)}x / {config.voice === 'female' ? 'F' : 'M'}
        </Text>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.content}>
          <SpeechRateSlider
            value={config.rate}
            onValueChange={updateSpeechRate}
            disabled={isPreviewPlaying}
          />

          <VoiceTypeSelector
            value={config.voice}
            onValueChange={updateVoiceType}
            onPreview={isPreviewPlaying ? cancelPreview : previewVoice}
            disabled={isPreviewPlaying}
          />

          {isPreviewPlaying && (
            <View style={styles.previewIndicator}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={styles.previewText}>Playing preview...</Text>
              <TouchableOpacity
                onPress={cancelPreview}
                accessibilityLabel="Cancel preview"
                accessibilityRole="button">
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={styles.resetButton}
            onPress={resetToDefaults}
            disabled={isPreviewPlaying}
            accessibilityLabel="Reset to defaults"
            accessibilityHint="Resets speech rate to 1.0x and voice to female"
            accessibilityRole="button">
            <Text style={styles.resetText}>Reset to Defaults</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.neutral300,
    marginBottom: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    minHeight: 44,
  },
  headerIcon: {
    ...typography.bodyMd,
    color: colors.neutral700,
    marginRight: spacing.sm,
  },
  headerText: {
    ...typography.labelMd,
    color: colors.neutral900,
    flex: 1,
  },
  configSummary: {
    ...typography.bodySm,
    color: colors.neutral500,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  previewIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
    padding: spacing.sm,
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.xs,
  },
  previewText: {
    ...typography.bodySm,
    color: colors.primary,
    flex: 1,
  },
  cancelText: {
    ...typography.bodySm,
    color: colors.error,
  },
  resetButton: {
    alignSelf: 'flex-start',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    minHeight: 44,
    justifyContent: 'center',
  },
  resetText: {
    ...typography.bodySm,
    color: colors.neutral500,
    textDecorationLine: 'underline',
  },
});

export default VoiceConfigPanel;
