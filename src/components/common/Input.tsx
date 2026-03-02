import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import {colors} from '../../styles/colors';
import {typography} from '../../styles/typography';
import {spacing, borderRadius} from '../../styles/spacing';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  mandatory?: boolean;
  secureTextEntry?: boolean;
  showPasswordToggle?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  mandatory = false,
  secureTextEntry = false,
  showPasswordToggle = false,
  value,
  onChangeText,
  placeholder,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isSecure = secureTextEntry && !isPasswordVisible;
  const hasValue = value && value.length > 0;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          isFocused ? styles.inputContainerFocused : null,
          error ? styles.inputContainerError : null,
        ]}>
        <Text
          style={[
            styles.label,
            isFocused ? styles.labelFocused : null,
            hasValue ? styles.labelFilled : null,
            error ? styles.labelError : null,
          ]}>
          {label}
          {mandatory && ' *'}
        </Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isSecure}
          placeholder={placeholder}
          placeholderTextColor={colors.neutral500}
          accessibilityLabel={label}
          accessibilityHint={mandatory ? 'Required field' : undefined}
          {...rest}
        />
        {showPasswordToggle && secureTextEntry && (
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            accessibilityLabel={
              isPasswordVisible ? 'Hide password' : 'Show password'
            }
            accessibilityRole="button">
            <Text style={styles.toggleText}>
              {isPasswordVisible ? '👁️' : '👁️‍🗨️'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
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
    justifyContent: 'center',
  },
  inputContainerFocused: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  inputContainerError: {
    borderWidth: 2,
    borderColor: colors.error,
  },
  label: {
    ...typography.labelSm,
    color: colors.neutral500,
    position: 'absolute',
    top: spacing.lg,
    left: spacing.md,
  },
  labelFocused: {
    color: colors.primary,
    top: spacing.xs,
    fontSize: 10,
  },
  labelFilled: {
    color: colors.primary,
    top: spacing.xs,
    fontSize: 10,
  },
  labelError: {
    color: colors.error,
  },
  input: {
    ...typography.bodyLg,
    color: colors.neutral900,
    paddingTop: spacing.lg,
    paddingBottom: 0,
    height: '100%',
  },
  toggleButton: {
    position: 'absolute',
    right: spacing.md,
    top: spacing.lg,
    padding: spacing.xs,
  },
  toggleText: {
    fontSize: 18,
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
});

export default Input;
