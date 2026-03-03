import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../styles/colors';
import {typography} from '../../styles/typography';
import {spacing, borderRadius} from '../../styles/spacing';

interface SelectFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  onPress: () => void;
  mandatory?: boolean;
  error?: string;
  testID?: string;
  highlighted?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  placeholder = '[Select]',
  onPress,
  mandatory = false,
  error,
  testID,
  highlighted = false,
}) => {
  const hasValue = value && value.length > 0;

  return (
    <View style={styles.container} testID={testID}>
      <TouchableOpacity
        style={[
          styles.selectContainer,
          error ? styles.selectContainerError : null,
          highlighted ? styles.selectContainerHighlighted : null,
        ]}
        onPress={onPress}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityHint={mandatory ? 'Required field' : undefined}>
        <Text
          style={[
            styles.label,
            hasValue ? styles.labelActive : null,
            error ? styles.labelError : null,
          ]}>
          {label}
          {mandatory && <Text style={styles.required}> *</Text>}
        </Text>
        <Text
          style={[
            styles.value,
            !hasValue ? styles.placeholder : null,
          ]}>
          {hasValue ? value : placeholder}
        </Text>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  selectContainer: {
    height: spacing.formFieldHeight,
    borderWidth: 1,
    borderColor: colors.neutral300,
    borderRadius: borderRadius.xs,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingTop: 18,
    paddingBottom: 6,
    justifyContent: 'center',
    position: 'relative',
  },
  selectContainerError: {
    borderWidth: 2,
    borderColor: colors.error,
  },
  selectContainerHighlighted: {
    borderWidth: 2,
    borderColor: '#6366F1',
    backgroundColor: '#EEF2FF',
  },
  label: {
    ...typography.labelSm,
    color: colors.neutral500,
    position: 'absolute',
    top: spacing.xs,
    left: spacing.md,
    fontSize: 11,
    backgroundColor: colors.white,
    paddingHorizontal: 2,
  },
  labelActive: {
    color: colors.primary,
  },
  labelError: {
    color: colors.error,
  },
  required: {
    color: colors.error,
  },
  value: {
    ...typography.bodyLg,
    color: colors.neutral900,
  },
  placeholder: {
    color: colors.neutral500,
    fontStyle: 'italic',
    fontSize: 14,
  },
  chevron: {
    position: 'absolute',
    right: spacing.md,
    top: '50%',
    transform: [{translateY: -8}],
    fontSize: 16,
    color: colors.neutral500,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  errorText: {
    ...typography.bodySm,
    color: colors.error,
  },
});

export default SelectField;
