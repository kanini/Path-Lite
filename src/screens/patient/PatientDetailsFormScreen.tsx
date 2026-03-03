import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {AIVoiceIcon} from '../../components/voice';
import {useAIVoiceSync} from '../../hooks/useAIVoiceSync';
import {useAIVoiceIcon} from '../../hooks/useAIVoiceIcon';
import {colors} from '../../styles/colors';
import {spacing} from '../../styles/spacing';

const PatientDetailsFormScreen: React.FC = () => {
  const {voiceState, isTTSPlaying, handleVoiceToggle} = useAIVoiceSync({
    autoActivate: true,
  });

  const {handlePress, tooltipMessage} = useAIVoiceIcon({
    onStateChange: () => handleVoiceToggle(),
    isTTSPlaying,
    debounceDelay: 500,
  });

  return (
    <View style={styles.container}>
      <View style={styles.splitPanel}>
        <View style={styles.leftPanel}>
          <Text style={styles.hospitalName}>Hospital Name</Text>
          <Text style={styles.treatmentType}>Hemodialysis</Text>
          
          <View style={styles.patientSummary}>
            <Text style={styles.patientName}>Patient Name</Text>
            <Text style={styles.patientDetail}>Gender / Age</Text>
            <Text style={styles.patientDetail}>DOB: mm/dd/yyyy</Text>
            <Text style={styles.patientDetail}>MRN: 000000</Text>
            <Text style={styles.patientDetail}>HBsAg: Status</Text>
            <Text style={styles.patientDetail}>HBsAb: Value</Text>
          </View>

          <View style={styles.navSection}>
            <Text style={styles.navSectionHeader}>HD BILLING</Text>
            <View style={[styles.navItem, styles.navItemActive]}>
              <Text style={styles.navItemTextActive}>Patient Details</Text>
            </View>
            <View style={styles.navItem}>
              <Text style={styles.navItemText}>Primary Care Nurse Report</Text>
            </View>
            <View style={styles.navItem}>
              <Text style={styles.navItemText}>Order</Text>
            </View>
            <View style={styles.navItem}>
              <Text style={styles.navItemText}>Wait Time</Text>
            </View>
            <View style={styles.navItem}>
              <Text style={styles.navItemText}>Treatment</Text>
            </View>
            <View style={styles.navItem}>
              <Text style={styles.navItemText}>ACOI Questions</Text>
            </View>
            <View style={styles.navItem}>
              <Text style={styles.navItemText}>Cancel Billing</Text>
            </View>
            <View style={styles.navItem}>
              <Text style={styles.navItemText}>Review and Submit</Text>
            </View>
          </View>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Patient Details</Text>
            <View style={styles.voiceIconContainer}>
              <AIVoiceIcon
                state={voiceState}
                onPress={handlePress}
                disabled={isTTSPlaying}
                size={48}
                tooltipMessage={tooltipMessage}
              />
            </View>
          </View>

          <ScrollView style={styles.formContent}>
            <View style={styles.formSection}>
              <Text style={styles.sectionHeader}>Demographics & Admission</Text>
              <Text style={styles.placeholder}>Form fields will be populated here</Text>
            </View>

            <View style={styles.formSection}>
              <Text style={styles.sectionHeader}>Clinical Intake</Text>
              <Text style={styles.placeholder}>Form fields will be populated here</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral100,
  },
  splitPanel: {
    flex: 1,
    flexDirection: 'row',
  },
  leftPanel: {
    width: spacing.leftPanelWidth,
    backgroundColor: colors.neutral100,
    borderRightWidth: 1,
    borderRightColor: colors.neutral300,
    padding: spacing.lg,
  },
  hospitalName: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.neutral900,
    marginBottom: spacing.sm,
  },
  treatmentType: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.neutral700,
    marginBottom: spacing.xl,
  },
  patientSummary: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.xl,
  },
  patientName: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.neutral900,
    marginBottom: spacing.sm,
  },
  patientDetail: {
    fontSize: 12,
    color: colors.neutral700,
    marginBottom: spacing.xs,
  },
  navSection: {
    marginTop: spacing.lg,
  },
  navSectionHeader: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.neutral500,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  navItem: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    minHeight: 44,
    justifyContent: 'center',
  },
  navItemActive: {
    backgroundColor: colors.primaryLight,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  navItemText: {
    fontSize: 14,
    color: colors.neutral700,
  },
  navItemTextActive: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  mainContent: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    height: spacing.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xxl,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral300,
    backgroundColor: colors.white,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.neutral900,
  },
  voiceIconContainer: {
    padding: spacing.sm,
  },
  formContent: {
    flex: 1,
    padding: spacing.xxl,
  },
  formSection: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: 8,
    marginBottom: spacing.xl,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.neutral700,
    marginBottom: spacing.lg,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral300,
  },
  placeholder: {
    fontSize: 14,
    color: colors.neutral500,
    fontStyle: 'italic',
  },
});

export default PatientDetailsFormScreen;
