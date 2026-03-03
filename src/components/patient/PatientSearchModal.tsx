import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Input from '../common/Input';
import Button from '../common/Button';
import {colors} from '../../styles/colors';
import {typography} from '../../styles/typography';
import {spacing, borderRadius} from '../../styles/spacing';
import type {Patient} from '../../models/Patient';
import {PatientSearchService} from '../../services/PatientSearchService';
import type {SearchProgress} from '../../services/PatientSearchService';
import {Gender} from '../../models/enums';

interface PatientSearchModalProps {
  visible: boolean;
  onClose: () => void;
  onPatientSelected?: (patient: Patient) => void;
  onCreateNew?: (searchCriteria: SearchFormData) => void;
}

type SearchState = 'idle' | 'searching' | 'results' | 'no-results';

interface SearchFormData {
  firstName: string;
  lastName: string;
  mrn: string;
  dob: string;
  admissionNumber: string;
}

const PatientSearchModal: React.FC<PatientSearchModalProps> = ({
  visible,
  onClose,
  onPatientSelected,
  onCreateNew,
}) => {
  const [formData, setFormData] = useState<SearchFormData>({
    firstName: '',
    lastName: '',
    mrn: '',
    dob: '',
    admissionNumber: '',
  });

  const [mrnError, setMrnError] = useState<string>('');
  const [searchState, setSearchState] = useState<SearchState>('idle');
  const [searchProgress, setSearchProgress] = useState<SearchProgress>({
    percentage: 0,
    message: '',
  });
  const [searchResults, setSearchResults] = useState<Patient[]>([]);

  useEffect(() => {
    if (visible) {
      setSearchState('idle');
    }
  }, [visible]);

  const handleFieldChange = (field: keyof SearchFormData, value: string) => {
    if (field === 'mrn') {
      if (value && !/^\d*$/.test(value)) {
        setMrnError('MRN must be numeric');
        return;
      }
      setMrnError('');
    }

    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const getFilledFieldsCount = (): number => {
    let count = 0;
    if (formData.firstName.trim()) count++;
    if (formData.lastName.trim()) count++;
    if (formData.mrn.trim()) count++;
    if (formData.dob.trim()) count++;
    if (formData.admissionNumber.trim()) count++;
    return count;
  };

  const isSearchEnabled = (): boolean => {
    const hasMrn = formData.mrn.trim().length > 0;
    const filledCount = getFilledFieldsCount();
    return hasMrn && filledCount >= 2;
  };

  const handleSearch = async () => {
    setSearchState('searching');
    setSearchProgress({percentage: 0, message: ''});

    try {
      const criteria = {
        firstName: formData.firstName.trim() || undefined,
        lastName: formData.lastName.trim() || undefined,
        mrn: formData.mrn.trim() || undefined,
        dob: formData.dob.trim() ? new Date(formData.dob) : undefined,
        admissionNumber: formData.admissionNumber.trim() || undefined,
      };

      const results = await PatientSearchService.searchWithProgress(
        criteria,
        progress => {
          setSearchProgress(progress);
        },
      );

      setSearchResults(results);

      if (results.length === 0) {
        setSearchState('no-results');
      } else {
        setSearchState('results');
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchState('no-results');
    }
  };

  const handlePatientSelect = (patient: Patient) => {
    onPatientSelected?.(patient);
    handleClose();
  };

  const handleCreateNew = () => {
    onCreateNew?.(formData);
    handleClose();
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      mrn: '',
      dob: '',
      admissionNumber: '',
    });
    setMrnError('');
  };

  const handleClose = () => {
    resetForm();
    setSearchState('idle');
    setSearchResults([]);
    setSearchProgress({percentage: 0, message: ''});
    onClose();
  };

  const handleClear = () => {
    resetForm();
  };

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

  const calculateAge = (dob: Date): number => {
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };

  const getInitials = (firstName: string, lastName: string): string => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const renderModalContent = () => {
    if (searchState === 'no-results') {
      return (
        <View style={styles.modalBody}>
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>No matching patients found</Text>
            <Text style={styles.emptySubtitle}>
              No patient records match MRN "{formData.mrn}" with the provided criteria. You can create a new treatment record for this patient.
            </Text>
            <Button
              title="Create New Treatment"
              onPress={handleCreateNew}
              variant="primary"
              testID="create-new-button"
              style={styles.createNewButton}
            />
          </View>
        </View>
      );
    }

    if (searchState === 'results') {
      console.log('Rendering results:', searchResults.length, searchResults);
      return (
        <>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsCount}>
              {searchResults.length} patient{searchResults.length > 1 ? 's' : ''} found for MRN "{formData.mrn}". Select to prefill form.
            </Text>
          </View>
          <ScrollView style={styles.resultsContainer}>
            {searchResults.map((item, index) => {
              console.log('Rendering patient:', item.firstName, item.lastName, item.mrn);
              return (
                <TouchableOpacity
                  key={`${item.mrn}-${index}`}
                  style={styles.resultRow}
                  onPress={() => {
                    console.log('Patient selected:', item);
                    handlePatientSelect(item);
                  }}
                  accessibilityRole="button"
                  accessibilityLabel={`Select patient ${item.firstName} ${item.lastName}`}>
                  <View style={styles.resultAvatar}>
                    <Text style={styles.resultAvatarText}>
                      {getInitials(item.firstName, item.lastName)}
                    </Text>
                  </View>
                  <View style={styles.resultInfo}>
                    <Text style={styles.resultName}>
                      {item.lastName}, {item.firstName} {item.middleName ? item.middleName + ' ' : ''}
                    </Text>
                    <Text style={styles.resultMeta}>
                      MRN: {item.mrn} · DOB: {formatDate(item.dob)} · {getGenderDisplay(item.gender)} · {calculateAge(item.dob)} yrs
                    </Text>
                  </View>
                  <Text style={styles.resultChevron}>›</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </>
      );
    }

    return (
      <>
        <View style={styles.modalBody}>
          <Text style={styles.instructionText}>
            Enter search criteria to recall patient data.
          </Text>

          <Input
            label="Patient First Name"
            value={formData.firstName}
            onChangeText={value => handleFieldChange('firstName', value)}
            placeholder="[Enter]"
            accessibilityLabel="Patient First Name"
          />

          <Input
            label="Patient Last Name"
            value={formData.lastName}
            onChangeText={value => handleFieldChange('lastName', value)}
            placeholder="[Enter]"
            accessibilityLabel="Patient Last Name"
          />

          <Input
            label="Medical Record Number (MRN)"
            value={formData.mrn}
            onChangeText={value => handleFieldChange('mrn', value)}
            placeholder="[Enter]"
            keyboardType="numeric"
            mandatory
            error={mrnError}
            accessibilityLabel="Medical Record Number"
            accessibilityHint="Required field - numeric only"
          />

          <Input
            label="DOB"
            value={formData.dob}
            onChangeText={value => handleFieldChange('dob', value)}
            placeholder="[mm/dd/yyyy]"
            accessibilityLabel="Date of Birth"
          />

          <Input
            label="Admission / Encounter Number"
            value={formData.admissionNumber}
            onChangeText={value =>
              handleFieldChange('admissionNumber', value)
            }
            placeholder="[Enter]"
            accessibilityLabel="Admission or Encounter Number"
          />
        </View>

        <View style={styles.modalActions}>
          <TouchableOpacity
            onPress={handleClear}
            disabled={!getFilledFieldsCount()}
            accessibilityRole="button"
            accessibilityLabel="Clear search criteria"
            style={styles.clearButton}>
            <Text
              style={[
                styles.clearText,
                !getFilledFieldsCount() && styles.clearTextDisabled,
              ]}>
              Clear
            </Text>
          </TouchableOpacity>
          <Button
            title="Search"
            onPress={handleSearch}
            disabled={!isSearchEnabled()}
            variant="primary"
            testID="search-button"
            style={styles.searchButton}
          />
        </View>
      </>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
      accessibilityViewIsModal>
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={searchState === 'searching' ? undefined : handleClose}
          accessibilityLabel="Close modal"
          accessibilityRole="button"
        />
        <View style={[
          styles.modalContainer,
          searchState === 'results' && styles.modalContainerResults
        ]}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={handleClose}
              accessibilityRole="button"
              accessibilityLabel="Cancel patient search"
              style={styles.headerAction}>
              <Text style={styles.headerActionText}>Cancel</Text>
            </TouchableOpacity>
            <View style={styles.headerCenter}>
              <Text style={styles.title}>Recall Patient Data</Text>
            </View>
            <View style={styles.headerActionPlaceholder}>
              {searchState === 'no-results' && (
                <TouchableOpacity
                  onPress={handleCreateNew}
                  accessibilityRole="button"
                  accessibilityLabel="Create new treatment"
                  style={styles.createNewHeaderButton}>
                  <Text style={styles.createNewHeaderText}>Create New Treatment</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {renderModalContent()}

          {searchState === 'searching' && (
            <View style={styles.progressOverlay}>
              <View style={styles.logoContainer}>
                <Text style={styles.logoText}>PATH LITE</Text>
              </View>
              <Text style={styles.progressMessage}>
                {searchProgress.message || 'PATH is retrieving data for matching patient'}
              </Text>
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    {width: `${searchProgress.percentage}%`},
                  ]}
                />
              </View>
              <Text style={styles.progressPct}>{Math.round(searchProgress.percentage)}%</Text>
              <TouchableOpacity
                onPress={handleClose}
                style={styles.cancelProgressButton}>
                <Text style={styles.cancelProgressText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
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
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlayScrim,
  },
  modalContainer: {
    width: '90%',
    maxWidth: 520,
    maxHeight: '90%',
    backgroundColor: colors.white,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 8,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  modalContainerResults: {
    minHeight: 400,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral300,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    flexShrink: 0,
  },
  headerAction: {
    flex: 1,
  },
  headerActionText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.primary,
  },
  headerCenter: {
    flex: 2,
    alignItems: 'center',
  },
  headerActionPlaceholder: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.neutral900,
    textAlign: 'center',
  },
  modalBody: {
    padding: 20,
    paddingHorizontal: 24,
  },
  modalBodyResults: {
    padding: 0,
    flex: 1,
    minHeight: 200,
  },
  instructionText: {
    fontSize: 14,
    color: colors.neutral700,
    lineHeight: 21,
    marginBottom: spacing.lg,
  },
  modalActions: {
    paddingHorizontal: 24,
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.neutral300,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  clearButton: {
    height: 36,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
  },
  clearText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
  clearTextDisabled: {
    color: colors.neutral500,
  },
  searchButton: {
    flex: 1,
  },
  createNewHeaderButton: {
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  createNewHeaderText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.neutral700,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.neutral500,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  createNewButton: {
    marginTop: spacing.sm,
    minWidth: 200,
  },
  resultsHeader: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral300,
  },
  resultsCount: {
    fontSize: 13,
    color: colors.neutral500,
  },
  resultsContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  resultsScrollView: {
    flex: 1,
  },
  resultsScrollContent: {
    flexGrow: 1,
  },
  resultsList: {
    flex: 1,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral100,
  },
  resultAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  resultAvatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.neutral900,
    marginBottom: 3,
  },
  resultMeta: {
    fontSize: 13,
    color: colors.neutral500,
    marginTop: 2,
  },
  resultChevron: {
    fontSize: 18,
    color: colors.neutral500,
    marginLeft: spacing.md,
  },
  progressOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
    borderRadius: 12,
  },
  logoContainer: {
    marginBottom: spacing.lg,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 2,
  },
  progressMessage: {
    fontSize: 16,
    color: colors.neutral700,
    textAlign: 'center',
    marginBottom: spacing.lg,
    maxWidth: 320,
    lineHeight: 24,
  },
  progressTrack: {
    width: '60%',
    maxWidth: 300,
    height: 4,
    backgroundColor: colors.neutral300,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  progressPct: {
    fontSize: 12,
    color: colors.neutral700,
    marginBottom: spacing.lg,
  },
  cancelProgressButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  cancelProgressText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});

export default PatientSearchModal;
