import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {
  RootStackNavigationProp,
  RootStackRouteProp,
} from '../../navigation/types';
import Input from '../../components/common/Input';
import GenderToggle, {Gender} from '../../components/common/GenderToggle';
import SelectField from '../../components/common/SelectField';
import DatePickerField from '../../components/common/DatePickerField';
import PickerModal from '../../components/common/PickerModal';
import AIVoiceArea from '../../components/common/AIVoiceArea';
import {patientStorage} from '../../storage/PatientStorage';
import type {Patient} from '../../models';
import {useHospital} from '../../context/HospitalContext';
import {usePatients} from '../../context/PatientContext';
import {colors} from '../../styles/colors';
import {typography} from '../../styles/typography';
import {spacing, borderRadius} from '../../styles/spacing';

interface TreatmentFormData {
  firstName: string;
  middleName: string;
  lastName: string;
  mrn: string;
  dob: string;
  gender: Gender | '';
  admissionNumber: string;
  roomNumber: string;
  treatmentLocation: string;
  hbsag: string;
  hbsagDateDrawn: string;
  hbsagSource: string;
  hbsab: string;
  hbsabDateDrawn: string;
  hbsabSource: string;
}

const TreatmentFormScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<RootStackRouteProp<'TreatmentForm'>>();
  const {selectedHospital} = useHospital();
  const {refreshPatients} = usePatients();

  const [formData, setFormData] = useState<TreatmentFormData>({
    firstName: '',
    middleName: '',
    lastName: '',
    mrn: '',
    dob: '',
    gender: '',
    admissionNumber: '',
    roomNumber: '',
    treatmentLocation: '',
    hbsag: '',
    hbsagDateDrawn: '',
    hbsagSource: '',
    hbsab: '',
    hbsabDateDrawn: '',
    hbsabSource: '',
  });

  const [showTreatmentLocationPicker, setShowTreatmentLocationPicker] = useState(false);
  const [showHBsAgPicker, setShowHBsAgPicker] = useState(false);
  const [showHBsAbPicker, setShowHBsAbPicker] = useState(false);
  const [showSourcePicker, setShowSourcePicker] = useState(false);
  const [activeSourceField, setActiveSourceField] = useState<'hbsag' | 'hbsab' | null>(null);

  useEffect(() => {
    console.log('TreatmentForm - Current formData state:', formData);
  }, [formData]);

  useEffect(() => {
    const loadPatient = async () => {
      const mrnParam = route.params?.mrn;
      console.log('TreatmentForm - MRN Param:', mrnParam);
      
      if (!mrnParam) {
        console.log('TreatmentForm - No MRN, clearing form');
        setFormData(prev => ({
          ...prev,
          firstName: '',
          middleName: '',
          lastName: '',
          mrn: '',
          dob: '',
          gender: '',
          admissionNumber: '',
          roomNumber: '',
          treatmentLocation: '',
        }));
        return;
      }

      try {
        const patient = await patientStorage.getPatientByMRN(mrnParam);
        
        if (patient) {
          console.log('TreatmentForm - Found patient:', patient);
          
          const dobDate = typeof patient.dob === 'string' ? new Date(patient.dob) : patient.dob;
          const formattedDob = dobDate.toLocaleDateString('en-US');
          console.log('TreatmentForm - Formatted DOB:', formattedDob);
          
          // Format HBsAg date if it exists
          let formattedHbsagDate = '';
          if (patient.hbsAgDate) {
            const hbsagDate = typeof patient.hbsAgDate === 'string' ? new Date(patient.hbsAgDate) : patient.hbsAgDate;
            formattedHbsagDate = hbsagDate.toLocaleDateString('en-US');
          }
          
          // Format HBsAb date if it exists
          let formattedHbsabDate = '';
          if (patient.hbsAbDate) {
            const hbsabDate = typeof patient.hbsAbDate === 'string' ? new Date(patient.hbsAbDate) : patient.hbsAbDate;
            formattedHbsabDate = hbsabDate.toLocaleDateString('en-US');
          }
          
          setFormData(prev => ({
            ...prev,
            firstName: patient.firstName,
            middleName: patient.middleName ?? '',
            lastName: patient.lastName,
            mrn: patient.mrn,
            dob: formattedDob,
            gender: patient.gender as Gender,
            admissionNumber: patient.admissionNumber,
            roomNumber: patient.roomNumber,
            treatmentLocation: patient.treatmentLocation,
            hbsag: patient.hbsAgStatus || '',
            hbsagDateDrawn: formattedHbsagDate,
            hbsagSource: patient.hbsAgSource || '',
            hbsab: patient.hbsAbValue ? patient.hbsAbValue.toString() : '',
            hbsabDateDrawn: formattedHbsabDate,
            hbsabSource: patient.hbsAbSource || '',
          }));
          
          console.log('TreatmentForm - Form data updated with clinical intake');
        } else {
          console.log('TreatmentForm - Patient not found for MRN:', mrnParam);
        }
      } catch (error) {
        console.error('TreatmentForm - Error loading patient:', error);
      }
    };

    loadPatient();
  }, [route.params?.mrn]);

  const handleFieldChange = (field: keyof TreatmentFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const isFormValid = (): boolean => {
    return (
      formData.firstName.trim().length > 0 &&
      formData.lastName.trim().length > 0 &&
      formData.mrn.trim().length > 0 &&
      formData.dob.trim().length > 0 &&
      formData.gender !== '' &&
      formData.treatmentLocation.trim().length > 0 &&
      formData.roomNumber.trim().length > 0 &&
      formData.hbsag.trim().length > 0 &&
      formData.hbsab.trim().length > 0
    );
  };

  const treatmentLocations = ['OR', 'Bedside', 'ICU-CCU', 'ER', 'Multi-Tx Room'];
  const hbsagOptions = ['Positive', 'Negative', 'Unknown'];
  const hbsabOptions = ['Immuno10', 'Immuno20', 'Immuno30', 'Non-Immune', 'Unknown'];
  const sourceOptions = ['Lab', 'CWOW', 'DaVita', 'Manual Entry'];

  const handleSave = async () => {
    if (!isFormValid()) {
      return;
    }

    try {
      // Parse the date string back to Date object
      const dobParts = formData.dob.split('/');
      const dobDate = new Date(
        parseInt(dobParts[2]), // year
        parseInt(dobParts[0]) - 1, // month (0-indexed)
        parseInt(dobParts[1]) // day
      );

      // Parse HBsAg and HBsAb date strings if they exist
      let hbsagDate: Date | null = null;
      if (formData.hbsagDateDrawn) {
        const hbsagParts = formData.hbsagDateDrawn.split('/');
        hbsagDate = new Date(
          parseInt(hbsagParts[2]),
          parseInt(hbsagParts[0]) - 1,
          parseInt(hbsagParts[1])
        );
      }

      let hbsabDate: Date | null = null;
      if (formData.hbsabDateDrawn) {
        const hbsabParts = formData.hbsabDateDrawn.split('/');
        hbsabDate = new Date(
          parseInt(hbsabParts[2]),
          parseInt(hbsabParts[0]) - 1,
          parseInt(hbsabParts[1])
        );
      }

      // Create patient object
      const patient: Patient = {
        schemaVersion: '1.0.0',
        mrn: formData.mrn,
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        dob: dobDate,
        gender: formData.gender as any,
        admissionNumber: formData.admissionNumber,
        treatmentLocation: formData.treatmentLocation as any,
        roomNumber: formData.roomNumber,
        hbsAgStatus: formData.hbsag as any,
        hbsAgDate: hbsagDate,
        hbsAgSource: formData.hbsagSource ? (formData.hbsagSource as any) : null,
        hbsAbValue: formData.hbsab ? parseInt(formData.hbsab.replace(/\D/g, '')) || null : null,
        hbsAbDate: hbsabDate,
        hbsAbSource: formData.hbsabSource ? (formData.hbsabSource as any) : null,
      };

      // Save to storage using patientStorage
      await patientStorage.savePatient(patient);
      console.log('Patient saved successfully:', patient);
      
      // Refresh the patient list in the dashboard
      await refreshPatients();
      
      navigation.goBack();
    } catch (error) {
      console.error('Error saving patient:', error);
      // You might want to show an error message to the user here
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel}>
          <Text style={styles.headerButton}>Done</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Patient Treatment</Text>
        <TouchableOpacity onPress={handleSave} disabled={!isFormValid()}>
          <Text
            style={[
              styles.headerButtonPrimary,
              !isFormValid() && styles.headerButtonDisabled,
            ]}>
            Save
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.splitPanel}>
        <View style={styles.leftNav}>
          <View style={styles.leftNavHospital}>
            <Text style={styles.hospitalName}>
              {selectedHospital?.name?.toUpperCase() || 'SELECT A HOSPITAL'}
            </Text>
            <Text style={styles.treatmentType}>Hemodialysis</Text>
          </View>
          <View style={styles.patientSummaryCard}>
            <Text style={styles.pscName}>
              {formData.firstName && formData.lastName
                ? `${formData.firstName}${formData.middleName ? ' ' + formData.middleName.charAt(0) + '.' : ''} ${formData.lastName}`
                : '—'}
            </Text>
            <Text style={styles.pscDetail}>
              {formData.gender && formData.dob ? `${formData.gender} · Age` : '—'}
            </Text>
            <Text style={styles.pscMrn}>MRN: {formData.mrn || '—'}</Text>
            <Text style={styles.pscHep}>
              HBsAg: {formData.hbsag || '—'} | HBsAb: {formData.hbsab || '—'}
            </Text>
          </View>
          <Text style={styles.sectionGroupHeader}>HD BILLING</Text>
          <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
            <Text style={styles.navItemText}>Patient Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navItemText}>Primary Care Nurse Report (Pre and Post)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navItemText}>Order</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navItemText}>Wait Time (Pre and Post)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navItemText}>Treatment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navItemText}>ACOI Questions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navItemText}>Cancel Billing</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navItemText}>Review and Submit</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          key={route.params?.mrn || 'new'}
          style={styles.mainContent}
          contentContainerStyle={styles.mainContentScroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <AIVoiceArea
            isActive={false}
            statusLabel="AI Voice — Inactive"
            statusSub="Tap to activate conversational mode"
            testID="ai-voice-area"
          />

          <View style={styles.formSection}>
            <Text style={styles.sectionHeaderLabel}>Demographics & Admission</Text>

            <Input
              label="Medical Record Number (MRN)"
              value={formData.mrn}
              onChangeText={value => handleFieldChange('mrn', value)}
              placeholder="[Enter]"
              keyboardType="numeric"
              mandatory
              accessibilityLabel="Medical Record Number"
            />

            <View style={styles.fieldRow}>
              <View style={styles.fieldFull}>
                <Input
                  label="Patient First Name"
                  value={formData.firstName}
                  onChangeText={value => handleFieldChange('firstName', value)}
                  placeholder="[Enter]"
                  mandatory
                  accessibilityLabel="First Name"
                />
              </View>
              <View style={styles.fieldHalf}>
                <Input
                  label="Middle Initial / Name"
                  value={formData.middleName}
                  onChangeText={value => handleFieldChange('middleName', value)}
                  placeholder="[Enter]"
                  accessibilityLabel="Middle Name"
                />
              </View>
            </View>

            <Input
              label="Patient Last Name"
              value={formData.lastName}
              onChangeText={value => handleFieldChange('lastName', value)}
              placeholder="[Enter]"
              mandatory
              accessibilityLabel="Last Name"
            />

            <View style={styles.fieldRow}>
              <View style={styles.fieldHalf}>
                <DatePickerField
                  label="DOB"
                  value={formData.dob}
                  onChange={value => handleFieldChange('dob', value)}
                  placeholder="mm/dd/yyyy"
                  mandatory
                  testID="dob-picker"
                />
              </View>
              <View style={styles.fieldHalf}>
                <Input
                  label="Admission / Encounter Number"
                  value={formData.admissionNumber}
                  onChangeText={value => handleFieldChange('admissionNumber', value)}
                  placeholder="[Enter]"
                  accessibilityLabel="Admission Number"
                />
              </View>
            </View>

            <GenderToggle
              value={formData.gender}
              onChange={(gender: Gender) => handleFieldChange('gender', gender)}
              mandatory
              testID="gender-toggle"
            />

            <SelectField
              label="Treatment Location"
              value={formData.treatmentLocation}
              onPress={() => setShowTreatmentLocationPicker(true)}
              mandatory
              testID="treatment-location-select"
            />

            <Input
              label="Room Number"
              value={formData.roomNumber}
              onChangeText={value => handleFieldChange('roomNumber', value)}
              placeholder="[Enter]"
              mandatory
              accessibilityLabel="Room Number"
            />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionHeaderLabel}>Clinical Intake</Text>
            <TouchableOpacity style={styles.importLink}>
              <Text style={styles.importLinkText}>⬇ Import Hepatitis B result from CWOW</Text>
            </TouchableOpacity>

            <SelectField
              label="HBsAg"
              value={formData.hbsag}
              onPress={() => setShowHBsAgPicker(true)}
              mandatory
              testID="hbsag-select"
            />

            <View style={styles.fieldRow}>
              <View style={styles.fieldHalf}>
                <DatePickerField
                  label="Date Drawn"
                  value={formData.hbsagDateDrawn}
                  onChange={value => handleFieldChange('hbsagDateDrawn', value)}
                  placeholder="mm/dd/yyyy"
                  testID="hbsag-date-picker"
                />
              </View>
              <View style={styles.fieldHalf}>
                <SelectField
                  label="Source"
                  value={formData.hbsagSource}
                  onPress={() => {
                    setActiveSourceField('hbsag');
                    setShowSourcePicker(true);
                  }}
                  testID="hbsag-source-select"
                />
              </View>
            </View>

            <SelectField
              label="HBsAb"
              value={formData.hbsab}
              onPress={() => setShowHBsAbPicker(true)}
              mandatory
              testID="hbsab-select"
            />

            <View style={styles.fieldRow}>
              <View style={styles.fieldHalf}>
                <DatePickerField
                  label="Date Drawn"
                  value={formData.hbsabDateDrawn}
                  onChange={value => handleFieldChange('hbsabDateDrawn', value)}
                  placeholder="mm/dd/yyyy"
                  testID="hbsab-date-picker"
                />
              </View>
              <View style={styles.fieldHalf}>
                <SelectField
                  label="Source"
                  value={formData.hbsabSource}
                  onPress={() => {
                    setActiveSourceField('hbsab');
                    setShowSourcePicker(true);
                  }}
                  testID="hbsab-source-select"
                />
              </View>
            </View>

            <View style={styles.davitaMpi}>
              <Text style={styles.davitaMpiLabel}>DaVita MPI</Text>
              <Text style={styles.davitaMpiValue}>Based on imported data from DaVita</Text>
            </View>
          </View>
        </ScrollView>
      </View>

      <PickerModal
        visible={showTreatmentLocationPicker}
        title="Treatment Location"
        options={treatmentLocations}
        selectedValue={formData.treatmentLocation}
        onSelect={value => handleFieldChange('treatmentLocation', value)}
        onClose={() => setShowTreatmentLocationPicker(false)}
        testID="treatment-location-picker-modal"
      />

      <PickerModal
        visible={showHBsAgPicker}
        title="HBsAg"
        options={hbsagOptions}
        selectedValue={formData.hbsag}
        onSelect={value => handleFieldChange('hbsag', value)}
        onClose={() => setShowHBsAgPicker(false)}
        testID="hbsag-picker-modal"
      />

      <PickerModal
        visible={showHBsAbPicker}
        title="HBsAb"
        options={hbsabOptions}
        selectedValue={formData.hbsab}
        onSelect={value => handleFieldChange('hbsab', value)}
        onClose={() => setShowHBsAbPicker(false)}
        testID="hbsab-picker-modal"
      />

      <PickerModal
        visible={showSourcePicker}
        title="Source"
        options={sourceOptions}
        selectedValue={
          activeSourceField === 'hbsag'
            ? formData.hbsagSource
            : formData.hbsabSource
        }
        onSelect={value => {
          if (activeSourceField === 'hbsag') {
            handleFieldChange('hbsagSource', value);
          } else {
            handleFieldChange('hbsabSource', value);
          }
        }}
        onClose={() => {
          setShowSourcePicker(false);
          setActiveSourceField(null);
        }}
        testID="source-picker-modal"
      />
    </KeyboardAvoidingView>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral300,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  headerButton: {
    ...typography.labelMd,
    color: colors.primary,
    fontSize: 15,
    fontWeight: '500',
  },
  headerButtonPrimary: {
    ...typography.labelMd,
    color: colors.white,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    fontSize: 14,
    fontWeight: '600',
    overflow: 'hidden',
  },
  headerButtonDisabled: {
    backgroundColor: colors.neutral300,
  },
  headerTitle: {
    ...typography.headingLg,
    color: colors.neutral900,
    fontSize: 20,
    fontWeight: '600',
  },
  splitPanel: {
    flex: 1,
    flexDirection: 'row',
  },
  leftNav: {
    width: 200,
    backgroundColor: colors.neutral100,
    borderRightWidth: 1,
    borderRightColor: colors.neutral300,
  },
  leftNavHospital: {
    padding: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral300,
  },
  hospitalName: {
    ...typography.labelSm,
    color: colors.neutral900,
    fontSize: 12,
    fontWeight: '600',
  },
  treatmentType: {
    ...typography.bodySm,
    color: colors.neutral700,
    fontSize: 12,
    marginTop: 2,
  },
  patientSummaryCard: {
    padding: 10,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral300,
    gap: 3,
  },
  pscName: {
    ...typography.labelMd,
    color: colors.neutral900,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
  },
  pscDetail: {
    ...typography.bodySm,
    color: colors.neutral700,
    fontSize: 11,
  },
  pscMrn: {
    ...typography.bodySm,
    color: colors.neutral500,
    fontSize: 11,
  },
  pscHep: {
    ...typography.bodySm,
    color: colors.neutral500,
    fontSize: 11,
  },
  sectionGroupHeader: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: 4,
    ...typography.labelSm,
    color: colors.neutral500,
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  navItem: {
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    minHeight: 44,
    justifyContent: 'center',
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
  },
  navItemActive: {
    backgroundColor: colors.primaryLight,
    borderLeftColor: colors.primary,
  },
  navItemText: {
    ...typography.bodyMd,
    color: colors.neutral700,
    fontSize: 13,
    lineHeight: 17,
  },
  mainContent: {
    flex: 1,
  },
  mainContentScroll: {
    padding: spacing.lg,
  },
  formSection: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.sm,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeaderLabel: {
    ...typography.headingMd,
    color: colors.neutral700,
    fontSize: 17,
    fontWeight: '600',
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral300,
    paddingBottom: spacing.sm,
    marginBottom: spacing.lg,
  },
  fieldRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  fieldFull: {
    flex: 1,
  },
  fieldHalf: {
    flex: 1,
  },
  importLink: {
    marginBottom: spacing.lg,
  },
  importLinkText: {
    ...typography.labelMd,
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  davitaMpi: {
    padding: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.neutral100,
    borderRadius: borderRadius.xs,
    borderWidth: 1,
    borderColor: colors.neutral300,
    gap: 2,
  },
  davitaMpiLabel: {
    ...typography.bodySm,
    color: colors.neutral500,
    fontSize: 11,
  },
  davitaMpiValue: {
    ...typography.bodyMd,
    color: colors.neutral700,
    fontSize: 13,
    fontStyle: 'italic',
  },
});

export default TreatmentFormScreen;
