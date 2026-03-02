import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {RootStackNavigationProp} from '../../navigation/types';
import {useHospital} from '../../context/HospitalContext';
import {useHospitalSearch} from '../../hooks/useHospitalSearch';
import HospitalSearchBar from '../../components/hospital/HospitalSearchBar';
import HospitalListItem from '../../components/hospital/HospitalListItem';
import {MOCK_HOSPITALS} from '../../data/mockHospitals';
import type {Hospital} from '../../models';
import {colors} from '../../styles/colors';
import {spacing} from '../../styles/spacing';
import {typography} from '../../styles/typography';

const HospitalSelectionScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {setHospital} = useHospital();
  const {searchQuery, filteredHospitals, handleSearchChange, clearSearch} =
    useHospitalSearch(MOCK_HOSPITALS);

  const handleHospitalSelect = (hospital: Hospital) => {
    setHospital(hospital);
    navigation.navigate('PatientDashboard');
  };

  const renderHeader = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hospital Selection</Text>
      </View>
      <HospitalSearchBar
        value={searchQuery}
        onChangeText={handleSearchChange}
        onClear={clearSearch}
      />
      <View style={styles.columnHeader}>
        <Text style={styles.columnHeaderText}>HOSPITAL</Text>
        <Text style={[styles.columnHeaderText, styles.addressColumn]}>
          ADDRESS
        </Text>
      </View>
    </>
  );

  const renderEmptyState = () => {
    if (MOCK_HOSPITALS.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🏥</Text>
          <Text style={styles.emptyTitle}>No hospitals available</Text>
          <Text style={styles.emptyMessage}>
            Contact administrator for assistance.
          </Text>
        </View>
      );
    }

    if (searchQuery && filteredHospitals.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🏥</Text>
          <Text style={styles.emptyTitle}>No hospitals found</Text>
          <Text style={styles.emptyMessage}>
            No hospitals match your search. Try different keywords or clear the
            search.
          </Text>
        </View>
      );
    }

    return null;
  };

  const renderItem = React.useCallback(
    ({item}: {item: Hospital}) => (
      <HospitalListItem hospital={item} onPress={handleHospitalSelect} />
    ),
    [handleHospitalSelect],
  );

  const keyExtractor = React.useCallback(
    (item: Hospital) => item.hospitalId,
    [],
  );

  const getItemLayout = React.useCallback(
    (_data: ArrayLike<Hospital> | null | undefined, index: number) => ({
      length: 52,
      offset: 52 * index,
      index,
    }),
    [],
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        data={filteredHospitals}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={
          filteredHospitals.length === 0 && styles.emptyListContent
        }
        showsVerticalScrollIndicator={true}
        initialNumToRender={15}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        windowSize={10}
        removeClippedSubviews={true}
        getItemLayout={getItemLayout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    height: 56,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral300,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    ...typography.headingLg,
    color: colors.neutral900,
  },
  columnHeader: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.neutral100,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral300,
  },
  columnHeaderText: {
    ...typography.labelSm,
    fontWeight: '600',
    color: colors.neutral700,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    flex: 1,
  },
  addressColumn: {
    width: 240,
    flex: 0,
  },
  emptyListContent: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xxxl,
    paddingVertical: spacing.huge,
  },
  emptyIcon: {
    fontSize: 40,
    color: colors.neutral300,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    ...typography.bodyLg,
    fontWeight: '600',
    color: colors.neutral700,
    marginBottom: spacing.sm,
  },
  emptyMessage: {
    ...typography.bodyMd,
    color: colors.neutral500,
    textAlign: 'center',
  },
});

export default HospitalSelectionScreen;
