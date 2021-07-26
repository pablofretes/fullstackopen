import { Entry } from './diagnose';

export enum Gender {
    Male = 'male',
    Female = 'female',
}

export interface Patients {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn?: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type noSsnPatients = Omit<Patients, 'ssn'>;

export type NewPatient = Omit<Patients, 'id'>;

export type PublicPatient = Omit<Patients, 'ssn' | 'entries'>;