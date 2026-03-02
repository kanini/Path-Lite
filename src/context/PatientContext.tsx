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
      const sessions: TreatmentSession[] = [];
      const enrichedPatients = patientService.enrichPatientsWithStatus(
        allPatients,
        sessions,
      );
      setPatients(enrichedPatients);
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
      const sessions: TreatmentSession[] = [];
      const enrichedPatients = patientService.enrichPatientsWithStatus(
        allPatients,
        sessions,
      );
      setPatients(enrichedPatients);
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
