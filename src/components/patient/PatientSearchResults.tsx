import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import Button from '../common/Button';
import {colors} from '../../styles/colors';
import {typography} from '../../styles/typography';
import {spacing, borderRadius} from '../../styles/spacing';
import type {Patient} from '../../models/Patient';
import {Gender} from '../../models/enums';

interface PatientSearchResultsProps {
  visible: boolean;
  patients: Patient[];
  onSelect: (patient: Patient) => void;
  onCancel: () => void;
}

const PatientSearchResults: React.FC<PatientSearchResultsProps> = ({
  visible,
  patients,
  onSelect,
  onCancel,
}) => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
  };

  const getGenderDisplay = (gender: Gender): string => {
    switch (gender) {
      case Gender.Male:
        return 'Male';
      case Gender.Female:
        return 'Female';
      default:
        return 'Unknown';
    }
  };

  const handleSelect = () => {
    if (selectedPatient) {
      onSelect(selectedPatient);
      setSelectedPatient(null);
    }
  };

  const handleCancel = () => {
    setSelectedPatient(null);
    onCancel();
  };

  const renderPatientCard = ({item}: {item: Patient}) => {
    const isSelected = selectedPatient?.mrn === item.mrn;

    return (
      <TouchableOpacity
        style={[styles.patientCard, isSelected && styles.patientCardSelected]}
        onPress={() => setSelectedPatient(item)}
        accessibilityRole="radio"
        accessibilityState={{selected: isSelected}}
        accessibilityLabel={`Patient ${item.firstName} ${item.lastName}, MRN ${item.mrn}`}>
        <View style={styles.cardContent}>
          <View style={styles.patientInfo}>
            <Text style={styles.patientName}>
              {item.firstName} {item.middleName} {item.lastName}
            </Text>
            <View style={styles.detailsRow}>
              <Text style={styles.detailLabel}>MRN:</Text>
              <Text style={styles.detailValue}>{item.mrn}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailLabel}>DOB:</Text>
              <Text style={styles.detailValue}>{formatDate(item.dob)}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailLabel}>Gender:</Text>
              <Text style={styles.detailValue}>
                {getGenderDisplay(item.gender)}
              </Text>
            </View>
          </View>
          <View style={styles.radioContainer}>
            <View
              style={[styles.radio, isSelected && styles.radioSelected]}
              accessibilityElementsHidden>
              {isSelected && <View style={styles.radioInner} />}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleCancel}
      accessibilityViewIsModal>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Multiple Patients Found</Text>
            <Text style={styles.subtitle}>
              Please select the correct patient
            </Text>
          </View>

          <FlatList
            data={patients}
            renderItem={renderPatientCard}
            keyExtractor={item => item.mrn}
            style={styles.listContainer}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={true}
          />

          <View style={styles.footer}>
            <Button
              title="Cancel"
              onPress={handleCancel}
              variant="secondary"
              style={styles.cancelButton}
              testID="cancel-button"
            />
            <Button
              title="Select"
              onPress={handleSelect}
              disabled={!selectedPatient}
              variant="primary"
              style={styles.selectButton}
              testID="select-button"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.overlayScrim,
  },
  modalContainer: {
    width: '90%',
    maxWidth: 500,
    maxHeight: '80%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral300,
  },
  title: {
    ...typography.headingMd,
    color: colors.neutral900,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.bodySm,
    color: colors.neutral700,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    padding: spacing.lg,
  },
  patientCard: {
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.neutral300,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  patientCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    ...typography.bodyLg,
    fontWeight: '600',
    color: colors.neutral900,
    marginBottom: spacing.xs,
  },
  detailsRow: {
    flexDirection: 'row',
    marginTop: spacing.xs,
  },
  detailLabel: {
    ...typography.bodySm,
    color: colors.neutral500,
    width: 60,
  },
  detailValue: {
    ...typography.bodySm,
    color: colors.neutral900,
    flex: 1,
  },
  radioContainer: {
    marginLeft: spacing.md,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.neutral300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: colors.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.neutral300,
    gap: spacing.md,
  },
  cancelButton: {
    flex: 1,
  },
  selectButton: {
    flex: 1,
  },
});

export default PatientSearchResults;
