export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthCareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  }
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: {
    date: string;
    criteria: string;
  }
}

export interface EntryValues {
  type: EntryValuesTypes;
  date: string;
  description: string;
  specialist: string;
  diagnosisCodes: Array<Diagnosis['code']>;
  discharge: {
    date: string;
    criteria: string;
  }
  employerName: string;
  sickLeave: {
    startDate: string;
    endDate: string;
  }
  healthCheckRating: HealthCheckRating;
}

export enum EntryValuesTypes {
  Hospital = 'Hospital',
  OccupationalHealthcare = 'OccupationalHealthcare',
  HealthCheck = 'HealthCheck'
}

export type Entry = HealthCheckEntry | OccupationalHealthCareEntry | HospitalEntry;

export type NewEntry = Omit<HealthCheckEntry, 'id'> | Omit<OccupationalHealthCareEntry, 'id'> | Omit<HospitalEntry, 'id'>;  