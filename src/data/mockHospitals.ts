import { Hospital } from '../models';

const SCHEMA_VERSION = '1.0.0';

export const MOCK_HOSPITALS: Hospital[] = [
  {
    schemaVersion: SCHEMA_VERSION,
    hospitalId: 'HOSP001',
    name: 'City General Hospital',
    code: 'CGH',
    address: '123 Main St, New York, NY 10001',
  },
  {
    schemaVersion: SCHEMA_VERSION,
    hospitalId: 'HOSP002',
    name: 'Memorial Medical Center',
    code: 'MMC',
    address: '456 Oak Ave, Los Angeles, CA 90001',
  },
  {
    schemaVersion: SCHEMA_VERSION,
    hospitalId: 'HOSP003',
    name: 'Regional Health System',
    code: 'RHS',
    address: '789 Pine Rd, Chicago, IL 60601',
  },
  {
    schemaVersion: SCHEMA_VERSION,
    hospitalId: 'HOSP004',
    name: 'University Hospital',
    code: 'UH',
    address: '321 Elm St, Houston, TX 77001',
  },
  {
    schemaVersion: SCHEMA_VERSION,
    hospitalId: 'HOSP005',
    name: 'Community Care Center',
    code: 'CCC',
    address: '654 Maple Dr, Phoenix, AZ 85001',
  },
];

export const findHospitalById = (hospitalId: string): Hospital | undefined => {
  return MOCK_HOSPITALS.find(hospital => hospital.hospitalId === hospitalId);
};

export const findHospitalByCode = (code: string): Hospital | undefined => {
  return MOCK_HOSPITALS.find(hospital => hospital.code === code);
};
