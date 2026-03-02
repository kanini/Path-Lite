import React from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import {colors} from '../../styles/colors';
import {typography} from '../../styles/typography';
import {spacing} from '../../styles/spacing';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

const Logo: React.FC<LogoProps> = ({size = 'medium', style}) => {
  const getLogoSize = () => {
    switch (size) {
      case 'small':
        return 40;
      case 'medium':
        return 60;
      case 'large':
        return 80;
      default:
        return 60;
    }
  };

  const logoSize = getLogoSize();

  return (
    <View style={[styles.container, style]} accessibilityLabel="PATH Lite Logo">
      <View style={[styles.snowflake, {width: logoSize, height: logoSize}]}>
        <View style={styles.petalContainer}>
          <View style={[styles.petal, styles.petalPrimary]} />
          <View style={[styles.petal, styles.petalTeal]} />
          <View style={[styles.petal, styles.petalPrimary]} />
          <View style={[styles.petal, styles.petalTeal]} />
          <View style={[styles.petal, styles.petalPrimary]} />
          <View style={[styles.petal, styles.petalTeal]} />
        </View>
        <View style={styles.center} />
      </View>
      <Text style={styles.wordmark}>PATH LITE</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  snowflake: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  petalContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  petal: {
    position: 'absolute',
    width: '30%',
    height: '80%',
    borderRadius: 999,
  },
  petalPrimary: {
    backgroundColor: colors.brandBlueLogo,
  },
  petalTeal: {
    backgroundColor: colors.brandTeal,
  },
  center: {
    width: '25%',
    height: '25%',
    borderRadius: 999,
    backgroundColor: colors.white,
    zIndex: 1,
  },
  wordmark: {
    ...typography.headingXl,
    color: colors.primary,
    marginTop: spacing.md,
    letterSpacing: 2,
  },
});

export default Logo;
