import type {Hospital} from '../models';

export interface HospitalState {
  selectedHospital: Hospital | null;
  isLoading: boolean;
}

export interface HospitalContextType extends HospitalState {
  setHospital: (hospital: Hospital) => void;
  clearHospital: () => void;
}
