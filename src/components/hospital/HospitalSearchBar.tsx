import React from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {colors} from '../../styles/colors';
import {spacing, borderRadius} from '../../styles/spacing';
import {typography} from '../../styles/typography';

interface HospitalSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
}

const HospitalSearchBar: React.FC<HospitalSearchBarProps> = ({
  value,
  onChangeText,
  onClear,
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={[styles.searchBar, isFocused && styles.searchBarFocused]}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.input}
          placeholder="Search Hospitals"
          placeholderTextColor={colors.neutral500}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {value.length > 0 && (
          <TouchableOpacity
            onPress={onClear}
            style={styles.clearButton}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
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
  },
  searchBarFocused: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  searchIcon: {
    fontSize: 16,
    color: colors.neutral500,
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    ...typography.labelMd,
    color: colors.neutral900,
    padding: 0,
  },
  clearButton: {
    padding: spacing.xs,
  },
  clearIcon: {
    fontSize: 14,
    color: colors.neutral500,
  },
});

export default HospitalSearchBar;
