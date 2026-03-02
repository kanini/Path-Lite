import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import {colors} from '../../styles/colors';
import {typography} from '../../styles/typography';
import {spacing, borderRadius} from '../../styles/spacing';

export type TreatmentType = 'Hemodialysis';

interface TreatmentTypeSelectorProps {
  visible: boolean;
  onSelect: (type: TreatmentType) => void;
  onCancel: () => void;
  testID?: string;
}

const TreatmentTypeSelector: React.FC<TreatmentTypeSelectorProps> = ({
  visible,
  onSelect,
  onCancel,
  testID,
}) => {
  const treatmentTypes: TreatmentType[] = ['Hemodialysis'];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
      testID={testID}>
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.title}>Select Treatment Type</Text>
              </View>
              <View style={styles.content}>
                {treatmentTypes.map(type => (
                  <TouchableOpacity
                    key={type}
                    style={styles.option}
                    onPress={() => onSelect(type)}
                    activeOpacity={0.7}
                    accessibilityRole="button"
                    accessibilityLabel={`Select ${type}`}
                    testID={`treatment-type-${type.toLowerCase()}`}>
                    <Text style={styles.optionText}>{type}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.footer}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={onCancel}
                  activeOpacity={0.7}
                  accessibilityRole="button"
                  accessibilityLabel="Cancel"
                  testID="treatment-type-cancel">
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
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
  container: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    width: '100%',
    maxWidth: 400,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  header: {
    padding: spacing.xxl,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral300,
  },
  title: {
    ...typography.headingMd,
    color: colors.neutral900,
  },
  content: {
    paddingVertical: spacing.md,
  },
  option: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xxl,
    minHeight: 44,
    justifyContent: 'center',
  },
  optionText: {
    ...typography.bodyLg,
    color: colors.neutral900,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.neutral300,
  },
  cancelButton: {
    paddingVertical: spacing.md,
    alignItems: 'center',
    minHeight: 44,
  },
  cancelText: {
    ...typography.labelMd,
    color: colors.neutral700,
  },
});

export default TreatmentTypeSelector;
