import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../styles/colors';
import {typography} from '../../styles/typography';
import {spacing, borderRadius} from '../../styles/spacing';

export type PatientStatus =
  | 'Not Started'
  | 'Tx In Progress'
  | 'Received'
  | 'Submitted'
  | 'Submitted (Amended)';

interface StatusBadgeProps {
  status: PatientStatus;
  testID?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({status, testID}) => {
  const getStatusStyle = () => {
    switch (status) {
      case 'Not Started':
        return {
          backgroundColor: colors.statusNotStartedBg,
          textColor: colors.statusNotStarted,
        };
      case 'Tx In Progress':
        return {
          backgroundColor: colors.statusInProgressBg,
          textColor: colors.statusInProgress,
        };
      case 'Received':
        return {
          backgroundColor: colors.statusInProgressBg,
          textColor: colors.statusInProgress,
        };
      case 'Submitted':
        return {
          backgroundColor: colors.statusSubmittedBg,
          textColor: colors.statusSubmitted,
        };
      case 'Submitted (Amended)':
        return {
          backgroundColor: colors.statusAmendedBg,
          textColor: colors.statusAmended,
        };
      default:
        return {
          backgroundColor: colors.statusNotStartedBg,
          textColor: colors.statusNotStarted,
        };
    }
  };

  const statusStyle = getStatusStyle();

  return (
    <View
      style={[styles.badge, {backgroundColor: statusStyle.backgroundColor}]}
      testID={testID}>
      <Text style={[styles.text, {color: statusStyle.textColor}]}>
        {status}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.xs,
    alignSelf: 'flex-start',
  },
  text: {
    ...typography.labelSm,
  },
});

export default StatusBadge;
