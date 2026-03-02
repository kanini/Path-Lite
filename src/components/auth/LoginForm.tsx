import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Input from '../common/Input';
import Button from '../common/Button';
import {spacing} from '../../styles/spacing';

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
  loading?: boolean;
  error?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  loading = false,
  error,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = () => {
    if (!username.trim() || !password.trim()) {
      setValidationError('Username and password are required');
      return;
    }

    setValidationError('');
    onSubmit(username, password);
  };

  const handleUsernameChange = (text: string) => {
    setUsername(text);
    if (validationError) {
      setValidationError('');
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (validationError) {
      setValidationError('');
    }
  };

  return (
    <View style={styles.container}>
      <Input
        label="Username"
        value={username}
        onChangeText={handleUsernameChange}
        placeholder="Enter username"
        autoCapitalize="none"
        autoCorrect={false}
        editable={!loading}
        testID="username-input"
      />
      <Input
        label="Password"
        value={password}
        onChangeText={handlePasswordChange}
        placeholder="Enter password"
        secureTextEntry={true}
        showPasswordToggle={true}
        autoCapitalize="none"
        autoCorrect={false}
        editable={!loading}
        error={validationError || error}
        testID="password-input"
      />
      <Button
        title="Login"
        onPress={handleSubmit}
        loading={loading}
        disabled={loading}
        style={styles.loginButton}
        testID="login-button"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  loginButton: {
    marginTop: spacing.lg,
  },
});

export default LoginForm;
