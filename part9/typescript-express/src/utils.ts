/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Gender, NewPatient } from "./types/patient";

const toNewPatientEntry = ({name, dateOfBirth, ssn, occupation, gender}: NewPatient): NewPatient => {
    const newEntry: NewPatient = {
        name: parseName(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseSsn(ssn),
        occupation: parseOccupation(occupation),
        gender: parseGender(gender)
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