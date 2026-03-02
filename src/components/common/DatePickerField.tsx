import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import {colors} from '../../styles/colors';
import {typography} from '../../styles/typography';
import {spacing, borderRadius} from '../../styles/spacing';

interface DatePickerFieldProps {
  label: string;
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
  mandatory?: boolean;
  error?: string;
  testID?: string;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = 'mm/dd/yyyy',
  mandatory = false,
  error,
  testID,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handlePress = () => {
    if (value) {
      const parts = value.split('/');
      if (parts.length === 3) {
        setSelectedMonth(parseInt(parts[0]) - 1);
        setSelectedDay(parseInt(parts[1]));
        setSelectedYear(parseInt(parts[2]));
      }
    }
    setShowPicker(true);
  };

  const handleConfirm = () => {
    const formattedDate = `${String(selectedMonth + 1).padStart(2, '0')}/${String(selectedDay).padStart(2, '0')}/${selectedYear}`;
    onChange(formattedDate);
    setShowPicker(false);
  };

  const handleCancel = () => {
    setShowPicker(false);
  };

  const hasValue = value && value.length > 0;

  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 100}, (_, i) => currentYear - i);
  const days = Array.from({length: getDaysInMonth(selectedMonth, selectedYear)}, (_, i) => i + 1);

  return (
    <View style={styles.container} testID={testID}>
      <TouchableOpacity
        style={[
          styles.inputContainer,
          error ? styles.inputContainerError : null,
        ]}
        onPress={handlePress}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityHint={mandatory ? 'Required field' : undefined}>
        <Text
          style={[
            styles.label,
            hasValue ? styles.labelActive : null,
            error ? styles.labelError : null,
          ]}>
          {label}
          {mandatory && <Text style={styles.required}> *</Text>}
        </Text>
        <Text
          style={[
            styles.value,
            !hasValue ? styles.placeholder : null,
          ]}>
          {hasValue ? value : placeholder}
        </Text>
      </TouchableOpacity>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <Modal
        visible={showPicker}
        transparent
        animationType="fade"
        onRequestClose={handleCancel}>
        <Pressable style={styles.modalOverlay} onPress={handleCancel}>
          <Pressable style={styles.modalContent} onPress={e => e.stopPropagation()}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label}</Text>
              <TouchableOpacity onPress={handleCancel}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.pickerContainer}>
              <View style={styles.pickerColumn}>
                <Text style={styles.columnLabel}>Month</Text>
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                  {months.map((month, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.pickerItem,
                        selectedMonth === index && styles.pickerItemSelected,
                      ]}
                      onPress={() => setSelectedMonth(index)}>
                      <Text
                        style={[
                          styles.pickerItemText,
                          selectedMonth === index && styles.pickerItemTextSelected,
                        ]}>
                        {month}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View style={styles.pickerColumn}>
                <Text style={styles.columnLabel}>Day</Text>
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                  {days.map((day) => (
                    <TouchableOpacity
                      key={day}
                      style={[
                        styles.pickerItem,
                        selectedDay === day && styles.pickerItemSelected,
                      ]}
                      onPress={() => setSelectedDay(day)}>
                      <Text
                        style={[
                          styles.pickerItemText,
                          selectedDay === day && styles.pickerItemTextSelected,
                        ]}>
                        {day}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View style={styles.pickerColumn}>
                <Text style={styles.columnLabel}>Year</Text>
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                  {years.map((year) => (
                    <TouchableOpacity
                      key={year}
                      style={[
                        styles.pickerItem,
                        selectedYear === year && styles.pickerItemSelected,
                      ]}
                      onPress={() => setSelectedYear(year)}>
                      <Text
                        style={[
                          styles.pickerItemText,
                          selectedYear === year && styles.pickerItemTextSelected,
                        ]}>
                        {year}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirm}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  inputContainer: {
    height: spacing.formFieldHeight,
    borderWidth: 1,
    borderColor: colors.neutral300,
    borderRadius: borderRadius.xs,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingTop: 18,
    paddingBottom: 6,
    justifyContent: 'center',
    position: 'relative',
  },
  inputContainerError: {
    borderWidth: 2,
    borderColor: colors.error,
  },
  label: {
    ...typography.labelSm,
    color: colors.neutral500,
    position: 'absolute',
    top: spacing.xs,
    left: spacing.md,
    fontSize: 11,
    backgroundColor: colors.white,
    paddingHorizontal: 2,
  },
  labelActive: {
    color: colors.primary,
  },
  labelError: {
    color: colors.error,
  },
  required: {
    color: colors.error,
  },
  value: {
    ...typography.bodyLg,
    color: colors.neutral900,
  },
  placeholder: {
    color: colors.neutral500,
    fontStyle: 'italic',
    fontSize: 14,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  errorText: {
    ...typography.bodySm,
    color: colors.error,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    width: '85%',
    maxWidth: 500,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral300,
    backgroundColor: colors.neutral100,
  },
  modalTitle: {
    ...typography.headingMd,
    color: colors.neutral900,
    fontSize: 17,
    fontWeight: '600',
  },
  closeButton: {
    fontSize: 20,
    color: colors.neutral500,
    fontWeight: '600',
    padding: spacing.xs,
  },
  pickerContainer: {
    flexDirection: 'row',
    height: 280,
    padding: spacing.md,
    gap: spacing.sm,
  },
  pickerColumn: {
    flex: 1,
    alignItems: 'center',
  },
  columnLabel: {
    ...typography.labelSm,
    color: colors.neutral700,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  pickerItem: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    alignItems: 'center',
    borderRadius: borderRadius.xs,
    marginVertical: 2,
  },
  pickerItemSelected: {
    backgroundColor: colors.primaryLight,
  },
  pickerItemText: {
    ...typography.bodyMd,
    color: colors.neutral900,
    fontSize: 15,
  },
  pickerItemTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  modalActions: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.neutral300,
  },
  cancelButton: {
    flex: 1,
    height: 48,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    ...typography.labelMd,
    color: colors.primary,
    fontSize: 15,
    fontWeight: '600',
  },
  confirmButton: {
    flex: 1,
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    ...typography.labelMd,
    color: colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
});

export default DatePickerField;
