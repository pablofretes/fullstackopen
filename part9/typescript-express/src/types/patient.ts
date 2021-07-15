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
}

export type noSsnPatients = Omit<Patients, 'ssn'>;

export type NewPatient = Omit<Patients, 'id'>;