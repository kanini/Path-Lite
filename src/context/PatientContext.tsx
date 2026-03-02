import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import type {Patient} from '../models/Patient';
import type {TreatmentSession} from '../models/TreatmentSession';
import type {PatientWithStatus} from '../services/patientService';
import {patientStorage} from '../storage/PatientStorage';
import {patientService} from '../services/patientService';
import {useHospital} from './HospitalContext';
import {MOCK_PATIENT_DASHBOARD_DATA} from '../data/mockPatientDashboard';

interface PatientContextType {
  patients: PatientWithStatus[];
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  loadPatients: () => Promise<void>;
  refreshPatients: () => Promise<void>;
  addPatient: (patient: Patient) => Promise<void>;
  updatePatient: (mrn: string, updates: Partial<Patient>) => Promise<void>;
}

const PatientContext = createContext<PatientContextType | undefined>(
  undefined,
);

export const usePatients = () => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatients must be used within a PatientProvider');
  }
  return context;
};

interface PatientProviderProps {
  children: React.ReactNode;
}

export const PatientProvider: React.FC<PatientProviderProps> = ({
  children,
}) => {
  const [patients, setPatients] = useState<PatientWithStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {selectedHospital} = useHospital();

  const loadPatients = useCallback(async () => {
    try {
      setError(null);
      const allPatients = await patientStorage.getAllPatients();
      
      // Merge mock data with real patient data
      const mockPatientMRNs = MOCK_PATIENT_DASHBOARD_DATA.map(p => p.mrn);
      const realPatientMRNs = allPatients.map(p => p.mrn);
      
      // Filter out mock patients that have been replaced by real data
      const mockPatientsToKeep = MOCK_PATIENT_DASHBOARD_DATA.filter(
        mockPatient => !realPatientMRNs.includes(mockPatient.mrn)
      );
      
      // Combine real patients with remaining mock patients
      const sessions: TreatmentSession[] = [];
      const enrichedRealPatients = patientService.enrichPatientsWithStatus(
        allPatients,
        sessions,
      );
      
      // Merge both lists
      const allCombinedPatients = [...enrichedRealPatients, ...mockPatientsToKeep];
      console.log('Total patients loaded:', allCombinedPatients.length);
      console.log('Real patients:', enrichedRealPatients.map(p => ({mrn: p.mrn, firstName: p.firstName, lastName: p.lastName})));
      console.log('Mock patients kept:', mockPatientsToKeep.map(p => ({mrn: p.mrn, firstName: p.firstName, lastName: p.lastName})));
      setPatients(allCombinedPatients);
    } catch (err) {
      console.error('Error loading patients:', err);
      setError('Failed to load patients');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshPatients = useCallback(async () => {
    if (isRefreshing) {
      return;
    }

    try {
      setIsRefreshing(true);
      setError(null);
      const allPatients = await patientStorage.getAllPatients();
      
      // Merge mock data with real patient data
      const mockPatientMRNs = MOCK_PATIENT_DASHBOARD_DATA.map(p => p.mrn);
      const realPatientMRNs = allPatients.map(p => p.mrn);
      
      // Filter out mock patients that have been replaced by real data
      const mockPatientsToKeep = MOCK_PATIENT_DASHBOARD_DATA.filter(
        mockPatient => !realPatientMRNs.includes(mockPatient.mrn)
      );
      
      // Combine real patients with remaining mock patients
      const sessions: TreatmentSession[] = [];
      const enrichedRealPatients = patientService.enrichPatientsWithStatus(
        allPatients,
        sessions,
      );
      
      // Merge both lists
      const allCombinedPatients = [...enrichedRealPatients, ...mockPatientsToKeep];
      setPatients(allCombinedPatients);
    } catch (err) {
      console.error('Error refreshing patients:', err);
      setError('Failed to refresh patients');
    } finally {
      setIsRefreshing(false);
    }
  }, [isRefreshing]);

  const addPatient = useCallback(async (patient: Patient) => {
    try {
      setError(null);
      await patientStorage.savePatient(patient);
      await loadPatients();
    } catch (err) {
      console.error('Error adding patient:', err);
      setError('Failed to add patient');
      throw err;
    }
  }, [loadPatients]);

  const updatePatient = useCallback(async (mrn: string, updates: Partial<Patient>) => {
    try {
      setError(null);
      await patientStorage.updatePatient(mrn, updates);
      await loadPatients();
    } catch (err) {
      console.error('Error updating patient:', err);
      setError('Failed to update patient');
      throw err;
    }
  }, [loadPatients]);

  useEffect(() => {
    if (selectedHospital) {
      loadPatients();
    }
  }, [selectedHospital, loadPatients]);

  const value: PatientContextType = {
    patients,
    isLoading,
    isRefreshing,
    error,
    loadPatients,
    refreshPatients,
    addPatient,
    updatePatient,
  };

  return (
    <PatientContext.Provider value={value}>
      {children}
    </PatientContext.Provider>
  );
};
