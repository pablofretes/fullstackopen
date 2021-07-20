/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Gender, NewPatient } from "./types/patient";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatientEntry = (object: any): NewPatient => {
    const newEntry: NewPatient = {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        occupation: parseOccupation(object.occupation),
        gender: parseGender(object.gender),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        entries: object.entries
    };
    return newEntry;
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: any): string => {
    if(!name || !isString(name)){
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: any): string => {
    if(!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)){
        throw new Error('Incorrect or missing date: ' + dateOfBirth);
    }
    return dateOfBirth;
};

const parseOccupation = (occupation: any): string => {
    if(!occupation || !isString(occupation)){
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};

const parseSsn = (ssn: any): string => {
    if(!ssn || !isString(ssn)){
        throw new Error('Incorrect or missing ssn: ' + ssn); 
    }
    return ssn;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
    if(!gender || !isGender(gender)){
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

export default toNewPatientEntry;