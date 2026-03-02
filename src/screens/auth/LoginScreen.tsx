import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {RootStackNavigationProp} from '../../navigation/types';
import {useAuth} from '../../context/AuthContext';
import Logo from '../../components/common/Logo';
import LoginForm from '../../components/auth/LoginForm';
import {colors} from '../../styles/colors';
import {spacing} from '../../styles/spacing';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {login, isLoading} = useAuth();
  const [error, setError] = useState('');

  const handleLogin = async (username: string, password: string) => {
    setError('');

    const result = await login(username, password);

    if (result.success) {
      navigation.navigate('HospitalSelection');
    } else {
      setError(result.error || 'Login failed');
    }
  };

  const {width, height} = Dimensions.get('window');
  const isTablet = width >= 600;
  const isLandscape = width > height;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          isTablet && isLandscape && styles.scrollContentLandscape,
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.formContainer,
            isTablet && styles.formContainerTablet,
          ]}>
          <Logo size={isTablet ? 'large' : 'medium'} style={styles.logo} />
          <LoginForm onSubmit={handleLogin} loading={isLoading} error={error} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.huge,
  },
  scrollContentLandscape: {
    paddingHorizontal: spacing.huge,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  formContainerTablet: {
    maxWidth: 480,
  },
  logo: {
    marginBottom: spacing.xxxl,
  },
});

export default LoginScreen;
