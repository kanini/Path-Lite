import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../styles/colors';
import {spacing} from '../../styles/spacing';
import {typography} from '../../styles/typography';

const PatientDashboardScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Patient Dashboard</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.placeholderText}>
          Patient Dashboard - Coming Soon
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    height: 56,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral300,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    ...typography.headingLg,
    color: colors.neutral900,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    ...typography.bodyLg,
    color: colors.neutral500,
  },
});

export default PatientDashboardScreen;
