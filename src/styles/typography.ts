import {Platform} from 'react-native';

const systemFont = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'System',
});

export const typography = {
  headingXl: {
    fontFamily: systemFont,
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 32,
  },
  headingLg: {
    fontFamily: systemFont,
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  headingMd: {
    fontFamily: systemFont,
    fontSize: 17,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  bodyLg: {
    fontFamily: systemFont,
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodyMd: {
    fontFamily: systemFont,
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  bodySm: {
    fontFamily: systemFont,
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  labelMd: {
    fontFamily: systemFont,
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 20,
  },
  labelSm: {
    fontFamily: systemFont,
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 16,
  },
  buttonLabel: {
    fontFamily: systemFont,
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  caption: {
    fontFamily: systemFont,
    fontSize: 11,
    fontWeight: '400' as const,
    lineHeight: 14,
  },
};
