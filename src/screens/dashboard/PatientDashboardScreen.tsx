import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {RootStackNavigationProp} from '../../navigation/types';
import {colors} from '../../styles/colors';
import {spacing} from '../../styles/spacing';
import {typography} from '../../styles/typography';
import {useHospital} from '../../context/HospitalContext';
import {usePatientList} from '../../hooks/usePatientList';
import {
  PatientCard,
  PatientListTabs,
  EmptyPatientState,
  AddNewPatientButton,
  TreatmentTypeSelector,
} from '../../components/patient';
import type {PatientWithStatus} from '../../services/patientService';
import type {TreatmentType} from '../../components/patient';

interface PatientSection {
  title: string;
  data: PatientWithStatus[];
}

const PatientDashboardScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {selectedHospital} = useHospital();
  const {
    activePatients,
    completedPatients,
    isLoading,
    isRefreshing,
    activeTab,
    setActiveTab,
    onRefresh,
  } = usePatientList();

  const [showTreatmentSelector, setShowTreatmentSelector] = useState(false);

  const sections: PatientSection[] = [
    {title: 'Active', data: activePatients},
    {title: 'Completed', data: completedPatients},
  ].filter(section => section.data.length > 0);

  const handlePatientPress = (patient: PatientWithStatus) => {
    console.log('Navigate to treatment page for patient:', patient.mrn);
  };

  const handleAddNewPress = () => {
    setShowTreatmentSelector(true);
  };

  const handleTreatmentTypeSelect = (type: TreatmentType) => {
    setShowTreatmentSelector(false);
    console.log('Selected treatment type:', type);
  };

  const handleTreatmentTypeCancel = () => {
    setShowTreatmentSelector(false);
  };

  const renderSectionHeader = ({section}: {section: PatientSection}) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
    </View>
  );

  const renderPatientCard = ({item}: {item: PatientWithStatus}) => (
    <PatientCard
      firstName={item.firstName}
      lastName={item.lastName}
      mrn={item.mrn}
      status={item.status}
      lastUpdated={item.lastUpdated}
      onPress={() => handlePatientPress(item)}
      testID={`patient-card-${item.mrn}`}
    />
  );

  const renderEmptyState = () => (
    <EmptyPatientState
      onAddNew={handleAddNewPress}
      testID="empty-patient-state"
    />
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {selectedHospital?.name || 'Patient Dashboard'}
          </Text>
          <AddNewPatientButton
            onPress={handleAddNewPress}
            testID="add-new-button"
          />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {selectedHospital?.name || 'Patient Dashboard'}
        </Text>
        <AddNewPatientButton
          onPress={handleAddNewPress}
          testID="add-new-button"
        />
      </View>
      <PatientListTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        testID="patient-tabs"
      />
      <SectionList
        sections={sections}
        renderItem={renderPatientCard}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={item => item.mrn}
        contentContainerStyle={
          sections.length === 0 ? styles.emptyListContent : styles.listContent
        }
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        stickySectionHeadersEnabled={false}
      />
      <TreatmentTypeSelector
        visible={showTreatmentSelector}
        onSelect={handleTreatmentTypeSelect}
        onCancel={handleTreatmentTypeCancel}
        testID="treatment-type-selector"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral100,
  },
  header: {
    height: spacing.headerHeight,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
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
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingVertical: spacing.md,
  },
  emptyListContent: {
    flexGrow: 1,
  },
  sectionHeader: {
    backgroundColor: colors.neutral100,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  sectionTitle: {
    ...typography.labelMd,
    color: colors.neutral700,
    textTransform: 'uppercase',
  },
});

export default PatientDashboardScreen;
