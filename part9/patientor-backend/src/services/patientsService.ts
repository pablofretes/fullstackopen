import patientsData from '../../data/patients';
import { Patients, noSsnPatients, NewPatient } from '../types/patient';
import { v1 as uuid } from 'uuid';
import { newEntry } from '../types/diagnose';

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

const addDiagnosisEntry = (id: string, entry: newEntry): Patients => {
    const userToUpdate = patientsData.find(p => p.id === id);
    if(!userToUpdate){
        throw new Error('That patient is not in the database!');
    }
    const newDiagnosisEntry = {
        id: uuid(),
        ...entry
    };
    userToUpdate.entries.concat(newDiagnosisEntry);
    return userToUpdate;
};

export default { getDataPatient, getDataPatientNoSsn, addEntryPatient, addDiagnosisEntry };