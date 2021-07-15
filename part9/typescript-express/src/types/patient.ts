export interface Patients {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn?: string;
    gender: string;
    occupation: string
}

export type noSsnPatients = Omit<Patients, 'ssn'>;