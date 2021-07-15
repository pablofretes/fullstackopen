import patientsData from '../../data/patients';
import { Patients, noSsnPatients } from '../types/patient';

const getDataPatient= (): Patients[] => { return patientsData;};

const getDataPatientNoSsn = (): noSsnPatients[] => { 
    return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    })); 
};

export default { getDataPatient, getDataPatientNoSsn };