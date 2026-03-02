import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../styles/colors';
import {typography} from '../../styles/typography';
import {spacing, borderRadius} from '../../styles/spacing';
import StatusBadge, {PatientStatus} from './StatusBadge';

interface PatientCardProps {
  firstName: string;
  lastName: string;
  mrn: string;
  status: PatientStatus;
  lastUpdated: Date;
  onPress: () => void;
  testID?: string;
}

const PatientCard: React.FC<PatientCardProps> = ({
  firstName,
  lastName,
  mrn,
  status,
  lastUpdated,
  onPress,
  testID,
}) => {
  const formatTimestamp = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) {
      return 'Just now';
    } else if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`Patient ${firstName} ${lastName}, MRN ${mrn}`}
      testID={testID}>
      <View style={styles.header}>
        <Text style={styles.name} numberOfLines={1}>
          {firstName} {lastName}
        </Text>
        <Text style={styles.timestamp}>{formatTimestamp(lastUpdated)}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.mrn}>MRN: {mrn}</Text>
        <StatusBadge status={status} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.sm,
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.neutral300,
    minHeight: 44,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  name: {
    ...typography.headingMd,
    color: colors.neutral900,
    flex: 1,
    marginRight: spacing.md,
  },
  timestamp: {
    ...typography.bodySm,
    color: colors.neutral500,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mrn: {
    ...typography.bodyMd,
    color: colors.neutral700,
  },
});

export default PatientCard;
