import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {colors} from '../../styles/colors';
import {typography} from '../../styles/typography';
import {spacing} from '../../styles/spacing';

interface AddNewPatientButtonProps {
  onPress: () => void;
  testID?: string;
}

const AddNewPatientButton: React.FC<AddNewPatientButtonProps> = ({
  onPress,
  testID,
}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel="Add New Patient"
      testID={testID}>
      <Text style={styles.text}>Add New</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    minHeight: 44,
    minWidth: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...typography.labelMd,
    color: colors.primary,
    fontWeight: '600',
  },
});

export default AddNewPatientButton;
