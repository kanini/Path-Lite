import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import type {Hospital} from '../models';
import type {HospitalContextType} from '../types/hospital';
import {hospitalStorage} from '../storage/HospitalStorage';
import {findHospitalById} from '../data/mockHospitals';

const HospitalContext = createContext<HospitalContextType | undefined>(
  undefined,
);

export const useHospital = () => {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error('useHospital must be used within a HospitalProvider');
  }
  return context;
};

interface HospitalProviderProps {
  children: React.ReactNode;
}

export const HospitalProvider: React.FC<HospitalProviderProps> = ({
  children,
}) => {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPersistedHospital = () => {
      try {
        const hospitalId = hospitalStorage.getHospitalId();
        if (hospitalId) {
          const hospital = findHospitalById(hospitalId);
          if (hospital) {
            setSelectedHospital(hospital);
          } else {
            hospitalStorage.clearHospitalId();
          }
        }
      } catch (error) {
        console.error('Error loading persisted hospital:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPersistedHospital();
  }, []);

  const setHospital = useCallback((hospital: Hospital) => {
    try {
      if (!hospital || !hospital.hospitalId) {
        throw new Error('Invalid hospital object');
      }

      setSelectedHospital(hospital);
      hospitalStorage.saveHospitalId(hospital.hospitalId);
    } catch (error) {
      console.error('Error setting hospital:', error);
      throw error;
    }
  }, []);

  const clearHospital = useCallback(() => {
    try {
      setSelectedHospital(null);
      hospitalStorage.clearHospitalId();
    } catch (error) {
      console.error('Error clearing hospital:', error);
      throw error;
    }
  }, []);

  const value: HospitalContextType = {
    selectedHospital,
    isLoading,
    setHospital,
    clearHospital,
  };

  return (
    <HospitalContext.Provider value={value}>
      {children}
    </HospitalContext.Provider>
  );
};
