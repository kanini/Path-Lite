import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import type {Hospital} from '../../models';
import {colors} from '../../styles/colors';
import {spacing} from '../../styles/spacing';
import {typography} from '../../styles/typography';

interface HospitalListItemProps {
  hospital: Hospital;
  onPress: (hospital: Hospital) => void;
}

const HospitalListItem: React.FC<HospitalListItemProps> = ({
  hospital,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(hospital)}
      activeOpacity={0.7}>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {hospital.name}
        </Text>
        <Text style={styles.address} numberOfLines={1}>
          {hospital.address}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 52,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md + 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral100,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
  },
  name: {
    ...typography.bodyLg,
    fontWeight: '600',
    color: colors.neutral900,
    marginBottom: spacing.xs,
  },
  address: {
    ...typography.bodyMd,
    color: colors.neutral500,
  },
});

export default HospitalListItem;
