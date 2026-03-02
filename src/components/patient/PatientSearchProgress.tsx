import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {colors} from '../../styles/colors';
import {typography} from '../../styles/typography';
import {spacing, borderRadius} from '../../styles/spacing';

interface PatientSearchProgressProps {
  visible: boolean;
  progress: number;
  message?: string;
}

const PatientSearchProgress: React.FC<PatientSearchProgressProps> = ({
  visible,
  progress,
  message = 'PATH is retrieving data for matching patient',
}) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [progress, progressAnim]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      accessibilityViewIsModal>
      <View style={styles.overlay}>
        <View style={styles.progressContainer}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>PATH</Text>
          </View>

          <Text style={styles.message}>{message}</Text>

          <View style={styles.progressBarContainer}>
            <Animated.View
              style={[
                styles.progressBar,
                {
                  width: progressWidth,
                },
              ]}
            />
          </View>

          <Text style={styles.percentageText}>{Math.round(progress)}%</Text>

          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={styles.spinner}
          />
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
  progressContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.xxl,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoContainer: {
    marginBottom: spacing.lg,
  },
  logoText: {
    ...typography.headingXl,
    color: colors.primary,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  message: {
    ...typography.bodyMd,
    color: colors.neutral700,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: colors.neutral100,
    borderRadius: borderRadius.xs,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.brandTeal,
    borderRadius: borderRadius.xs,
  },
  percentageText: {
    ...typography.labelMd,
    color: colors.primary,
    marginBottom: spacing.lg,
  },
  spinner: {
    marginTop: spacing.md,
  },
});

export default PatientSearchProgress;
