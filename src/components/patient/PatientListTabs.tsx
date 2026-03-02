import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../styles/colors';
import {typography} from '../../styles/typography';
import {spacing} from '../../styles/spacing';

export type TabType = 'my-patients' | 'all-patients';

interface PatientListTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  testID?: string;
}

const PatientListTabs: React.FC<PatientListTabsProps> = ({
  activeTab,
  onTabChange,
  testID,
}) => {
  return (
    <View style={styles.container} testID={testID}>
      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === 'my-patients' && styles.tabActive,
        ]}
        onPress={() => onTabChange('my-patients')}
        activeOpacity={0.7}
        accessibilityRole="tab"
        accessibilityState={{selected: activeTab === 'my-patients'}}
        testID="tab-my-patients">
        <Text
          style={[
            styles.tabText,
            activeTab === 'my-patients' && styles.tabTextActive,
          ]}>
          My Patients
        </Text>
        {activeTab === 'my-patients' && <View style={styles.activeIndicator} />}
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === 'all-patients' && styles.tabActive,
        ]}
        onPress={() => onTabChange('all-patients')}
        activeOpacity={0.7}
        accessibilityRole="tab"
        accessibilityState={{selected: activeTab === 'all-patients'}}
        testID="tab-all-patients">
        <Text
          style={[
            styles.tabText,
            activeTab === 'all-patients' && styles.tabTextActive,
          ]}>
          All Patients
        </Text>
        {activeTab === 'all-patients' && <View style={styles.activeIndicator} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral300,
    height: spacing.tabHeight,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    minHeight: 44,
  },
  tabActive: {
    backgroundColor: 'transparent',
  },
  tabText: {
    ...typography.labelMd,
    color: colors.neutral500,
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: colors.primary,
  },
});

export default PatientListTabs;
