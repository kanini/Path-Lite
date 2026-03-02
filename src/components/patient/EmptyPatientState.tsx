import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../styles/colors';
import {typography} from '../../styles/typography';
import {spacing} from '../../styles/spacing';
import Button from '../common/Button';

interface EmptyPatientStateProps {
  onAddNew?: () => void;
  testID?: string;
}

const EmptyPatientState: React.FC<EmptyPatientStateProps> = ({
  onAddNew,
  testID,
}) => {
  return (
    <View style={styles.container} testID={testID}>
      <Text style={styles.message}>
        No patients found. Tap 'Add New' to create a patient.
      </Text>
      {onAddNew && (
        <Button
          title="Add New"
          onPress={onAddNew}
          variant="primary"
          style={styles.button}
          testID="empty-state-add-button"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xxxl,
  },
  message: {
    ...typography.bodyLg,
    color: colors.neutral500,
    textAlign: 'center',
    marginBottom: spacing.xxl,
  },
  button: {
    minWidth: 120,
  },
});

export default EmptyPatientState;
