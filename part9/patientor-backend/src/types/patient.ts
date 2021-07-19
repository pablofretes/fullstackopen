export enum Gender {
    Male = 'male',
    Female = 'female',
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Patients {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn?: string;
    gender: Gender;
    occupation: string;
    entry: Entry[];
}

export type noSsnPatients = Omit<Patients, 'ssn'>;

export type NewPatient = Omit<Patients, 'id'>;

export type PublicPatient = Omit<Patients, 'ssn' | 'entries'>;