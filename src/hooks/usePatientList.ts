import {useState, useMemo, useCallback} from 'react';
import {usePatients} from '../context/PatientContext';
import {patientService} from '../services/patientService';
import type {PatientWithStatus} from '../services/patientService';
import type {TabType} from '../components/patient/PatientListTabs';

interface UsePatientListResult {
  activePatients: PatientWithStatus[];
  completedPatients: PatientWithStatus[];
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onRefresh: () => Promise<void>;
}

export const usePatientList = (currentUserId?: string): UsePatientListResult => {
  const {patients, isLoading, isRefreshing, error, refreshPatients} = usePatients();
  const [activeTab, setActiveTab] = useState<TabType>('all-patients');

  const filteredPatients = useMemo(() => {
    if (activeTab === 'my-patients' && currentUserId) {
      return patientService.filterMyPatients(patients, currentUserId);
    }
    return patients;
  }, [patients, activeTab, currentUserId]);

  const groupedPatients = useMemo(() => {
    return patientService.groupByCompletionStatus(filteredPatients);
  }, [filteredPatients]);

  const onRefresh = useCallback(async () => {
    await refreshPatients();
  }, [refreshPatients]);

  return {
    activePatients: groupedPatients.active,
    completedPatients: groupedPatients.completed,
    isLoading,
    isRefreshing,
    error,
    activeTab,
    setActiveTab,
    onRefresh,
  };
};
