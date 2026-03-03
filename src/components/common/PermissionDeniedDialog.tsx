import React from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import {colors} from '../../styles/colors';
import {typography} from '../../styles/typography';
import {spacing, borderRadius} from '../../styles/spacing';

interface PermissionDeniedDialogProps {
  visible: boolean;
  onOpenSettings: () => void;
  onUseManualEntry: () => void;
  onDismiss: () => void;
}

const PermissionDeniedDialog: React.FC<PermissionDeniedDialogProps> = ({
  visible,
  onOpenSettings,
  onUseManualEntry,
  onDismiss,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
      accessibilityViewIsModal>
      <View style={styles.overlay}>
        <View style={styles.dialog} accessibilityRole="alert">
          <Text style={styles.title}>Microphone Access Required</Text>
          <Text style={styles.message}>
            Microphone access required for voice input. Enable in Settings.
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.settingsButton]}
              onPress={onOpenSettings}
              accessibilityLabel="Open Settings"
              accessibilityHint="Opens device settings to enable microphone access"
              accessibilityRole="button">
              <Text style={[styles.buttonText, styles.settingsButtonText]}>
                Open Settings
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.manualButton]}
              onPress={onUseManualEntry}
              accessibilityLabel="Use Manual Entry"
              accessibilityHint="Switches to manual text entry mode"
              accessibilityRole="button">
              <Text style={[styles.buttonText, styles.manualButtonText]}>
                Use Manual Entry
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlayScrim,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xxl,
  },
  dialog: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.xxl,
    width: '100%',
    maxWidth: 340,
  },
  title: {
    ...typography.headingMd,
    color: colors.neutral900,
    marginBottom: spacing.sm,
  },
  message: {
    ...typography.bodyMd,
    color: colors.neutral700,
    marginBottom: spacing.xxl,
    lineHeight: 22,
  },
  buttonContainer: {
    gap: spacing.sm,
  },
  button: {
    minHeight: 44,
    minWidth: 44,
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  settingsButton: {
    backgroundColor: colors.primary,
  },
  manualButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonText: {
    ...typography.buttonLabel,
  },
  settingsButtonText: {
    color: colors.white,
  },
  manualButtonText: {
    color: colors.primary,
  },
});

export default PermissionDeniedDialog;
