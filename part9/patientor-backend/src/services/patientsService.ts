import patientsData from '../../data/patients';
import { Patients, noSsnPatients, NewPatient } from '../types/patient';
import { v1 as uuid } from 'uuid';

const getDataPatient= (): Patients[] => { return patientsData;};

const getDataPatientNoSsn = (): noSsnPatients[] => { 
    return patientsData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    })); 
};

const addEntryPatient = (patient: NewPatient): Patients => {
    const newPatientEntry = {
        id: uuid(),
        ...patient
    };
    patientsData.push(newPatientEntry);
    return newPatientEntry;
};

export default { getDataPatient, getDataPatientNoSsn, addEntryPatient };