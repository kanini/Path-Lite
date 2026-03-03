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
  PatientSearchModal,
  PatientSearchBar,
} from '../../components/patient';
import type {PatientWithStatus} from '../../services/patientService';
import type {TreatmentType} from '../../components/patient';
import type {Patient} from '../../models/Patient';

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
  const [showPatientSearch, setShowPatientSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filterPatients = (patients: PatientWithStatus[]): PatientWithStatus[] => {
    if (!searchQuery.trim()) {
      return patients;
    }
    
    const query = searchQuery.toLowerCase().trim();
    console.log('Search query:', query);
    console.log('Searching in patients:', patients.map(p => ({
      mrn: p.mrn, 
      firstName: p.firstName, 
      lastName: p.lastName,
      fullName: `${p.firstName} ${p.lastName}`.toLowerCase()
    })));
    
    const filtered = patients.filter(patient => {
      const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
      const reverseName = `${patient.lastName} ${patient.firstName}`.toLowerCase();
      const mrn = patient.mrn.toLowerCase();
      
      const matches = fullName.includes(query) || 
             reverseName.includes(query) || 
             mrn.includes(query);
      
      if (matches) {
        console.log('Match found:', {mrn: patient.mrn, firstName: patient.firstName, lastName: patient.lastName});
      }
      
      return matches;
    });
    
    console.log('Filtered results:', filtered.length);
    return filtered;
  };

  const filteredActivePatients = filterPatients(activePatients);
  const filteredCompletedPatients = filterPatients(completedPatients);

  const sections: PatientSection[] = [
    {title: 'Active', data: filteredActivePatients},
    {title: 'Completed', data: filteredCompletedPatients},
  ].filter(section => section.data.length > 0);

  const handlePatientPress = (patient: PatientWithStatus) => {
    console.log('Navigate to treatment page for patient:', patient.mrn);
  };

  const handleAddNewPress = () => {
    setShowTreatmentSelector(true);
  };

  const handleTreatmentTypeSelect = (type: TreatmentType) => {
    setShowTreatmentSelector(false);
    if (type === 'Hemodialysis') {
      setShowPatientSearch(true);
    }
  };

  const handleTreatmentTypeCancel = () => {
    setShowTreatmentSelector(false);
  };

  const handlePatientSelected = (patient: Patient) => {
    setShowPatientSearch(false);
    navigation.navigate('TreatmentForm', {mrn: patient.mrn});
  };

  const handleCreateNewTreatment = (searchCriteria?: {
    firstName: string;
    lastName: string;
    mrn: string;
    dob: string;
    admissionNumber: string;
  }) => {
    setShowPatientSearch(false);
    navigation.navigate('TreatmentForm', {
      searchCriteria: searchCriteria ? {
        firstName: searchCriteria.firstName,
        lastName: searchCriteria.lastName,
        mrn: searchCriteria.mrn,
        dob: searchCriteria.dob,
        admissionNumber: searchCriteria.admissionNumber,
      } : undefined,
    });
  };

  const handleSearchModalClose = () => {
    setShowPatientSearch(false);
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
        <PatientSearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          testID="patient-search-bar"
        />
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
      <PatientSearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        testID="patient-search-bar"
      />
      <PatientListTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        testID="patient-tabs"
      />
      <SectionList
        sections={sections}
        renderItem={renderPatientCard}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={item => 
          item.treatmentSession 
            ? `${item.mrn}-${item.treatmentSession.sessionId}` 
            : `${item.mrn}-${item.lastUpdated.getTime()}`
        }
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
      <PatientSearchModal
        visible={showPatientSearch}
        onClose={handleSearchModalClose}
        onPatientSelected={handlePatientSelected}
        onCreateNew={handleCreateNewTreatment}
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
