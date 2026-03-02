import React from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import {colors} from '../../styles/colors';
import {typography} from '../../styles/typography';
import {spacing, borderRadius} from '../../styles/spacing';

interface PatientSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  testID?: string;
}

const PatientSearchBar: React.FC<PatientSearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search Patients by Last Name, First Name or MRN',
  testID,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.neutral500}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          testID={testID}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral300,
  },
  searchBar: {
    height: 44,
    backgroundColor: colors.neutral100,
    borderWidth: 1,
    borderColor: colors.neutral300,
    borderRadius: borderRadius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  searchIcon: {
    fontSize: 16,
    color: colors.neutral500,
  },
  input: {
    flex: 1,
    ...typography.bodyMd,
    color: colors.neutral900,
    padding: 0,
  },
});

export default PatientSearchBar;
