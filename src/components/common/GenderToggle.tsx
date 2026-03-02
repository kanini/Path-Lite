import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../styles/colors';
import {typography} from '../../styles/typography';
import {spacing, borderRadius} from '../../styles/spacing';

export type Gender = 'Male' | 'Female';

interface GenderToggleProps {
  value: Gender | '';
  onChange: (gender: Gender) => void;
  mandatory?: boolean;
  testID?: string;
}

const GenderToggle: React.FC<GenderToggleProps> = ({
  value,
  onChange,
  mandatory = false,
  testID,
}) => {
  return (
    <View style={styles.container} testID={testID}>
      <Text style={styles.label}>
        Gender{mandatory && <Text style={styles.required}> *</Text>}
      </Text>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleOption,
            styles.toggleOptionLeft,
            value === 'Male' && styles.toggleOptionSelected,
          ]}
          onPress={() => onChange('Male')}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Male"
          accessibilityState={{selected: value === 'Male'}}
          testID={`${testID}-male`}>
          <Text
            style={[
              styles.toggleText,
              value === 'Male' && styles.toggleTextSelected,
            ]}>
            Male
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleOption,
            styles.toggleOptionRight,
            value === 'Female' && styles.toggleOptionSelected,
          ]}
          onPress={() => onChange('Female')}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Female"
          accessibilityState={{selected: value === 'Female'}}
          testID={`${testID}-female`}>
          <Text
            style={[
              styles.toggleText,
              value === 'Female' && styles.toggleTextSelected,
            ]}>
            Female
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.labelSm,
    color: colors.neutral500,
    marginBottom: spacing.xs,
    marginLeft: 1,
  },
  required: {
    color: colors.error,
  },
  toggleContainer: {
    flexDirection: 'row',
    height: 36,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: 999,
    overflow: 'hidden',
    width: 180,
  },
  toggleOption: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  toggleOptionLeft: {
    borderTopLeftRadius: 999,
    borderBottomLeftRadius: 999,
  },
  toggleOptionRight: {
    borderTopRightRadius: 999,
    borderBottomRightRadius: 999,
  },
  toggleOptionSelected: {
    backgroundColor: colors.primary,
  },
  toggleText: {
    ...typography.labelMd,
    color: colors.primary,
    fontWeight: '500',
  },
  toggleTextSelected: {
    color: colors.white,
  },
});

export default GenderToggle;
