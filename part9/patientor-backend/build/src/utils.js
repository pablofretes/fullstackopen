"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewDiagnosisEntry = exports.toNewPatientEntry = void 0;
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable  @typescript-eslint/no-explicit-any */
const patient_1 = require("./types/patient");
const diagnose_1 = require("./types/diagnose");
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatientEntry = (object) => {
    const newEntry = {
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
exports.toNewPatientEntry = toNewPatientEntry;
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDateOfBirth = (dateOfBirth) => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date: ' + dateOfBirth);
    }
    return dateOfBirth;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
};
const isGender = (param) => {
    return Object.values(patient_1.Gender).includes(param);
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
const isTypeString = (type) => {
    if (!type || !isString(type)) {
        throw new Error('Incorrect or missing type: ' + type);
    }
    return type;
};
const parseType = (type) => {
    if (!type || !isTypeString(type)) {
        throw new Error('Incorrect or missing type: ' + type);
    }
    if (type !== 'Hospital' && type !== 'OccupationalHealthcare' && type !== 'HealthCheck') {
        throw new Error('Incorrect or missing type: ' + type);
    }
    return type;
};
const isHealthCheckRating = (param) => {
    return Object.values(diagnose_1.HealthCheckRating).includes(param);
};
const parseHealthCheckRating = (healthCheckRating) => {
    if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
        throw new Error('Incorrect or missing health check rating: ' + healthCheckRating);
    }
    return healthCheckRating;
};
const parseEmployerName = (employerName) => {
    if (!employerName || !isString(employerName)) {
        throw new Error('Incorrect or missing employer name: ' + employerName);
    }
    return employerName;
};
const parseStartDate = (startDate) => {
    if (!startDate || !isDate(startDate) || !isString(startDate)) {
        throw new Error('Incorrect or missing sick leave start date: ' + startDate);
    }
    return startDate;
};
const parseEndDate = (endDate) => {
    if (!endDate || !isDate(endDate) || !isString(endDate)) {
        throw new Error('Incorrect or missing sick leave end date: ' + endDate);
    }
    return endDate;
};
const parseDate = (date) => {
    if (!date || !isDate(date) || !isString(date)) {
        throw new Error('Incorrect or missing criteria date: ' + date);
    }
    return date;
};
const parseCriteria = (criteria) => {
    if (!criteria || !isString(criteria)) {
        throw new Error('Incorrect or missing discharge criteria: ' + criteria);
    }
    return criteria;
};
const parseDescription = (description) => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description: ' + description);
    }
    return description;
};
const parseSpecialist = (specialist) => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist: ' + specialist);
    }
    return specialist;
};
const isCodeArray = (param) => {
    return Array.isArray(param);
};
const parseDiagnosisCodes = (diagnosisCodes) => {
    if (!diagnosisCodes || !isCodeArray(diagnosisCodes)) {
        throw new Error('Incorrect or missing diagnosis codes: ' + diagnosisCodes);
    }
    return diagnosisCodes;
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewDiagnosisEntry = (object) => {
    let newEntry;
    if (parseType(object.type) !== 'Hospital' || parseType(object.type) !== 'OccupationalHealthcare' || parseType(object.type) !== 'HealthCheck') {
        throw new Error('Incorrect entry type');
    }
    switch (object.type) {
        case 'Hospital':
            newEntry = {
                description: parseDescription(object.description),
                date: parseDate(object.date),
                specialist: parseSpecialist(object.specialist),
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                discharge: {
                    date: parseDate(object.discharge.date),
                    criteria: parseCriteria(object.discharge.criteria)
                },
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                type: object.type
            };
            return newEntry;
        case 'OccupationalHealthcare':
            newEntry = {
                description: parseDescription(object.description),
                date: parseDate(object.date),
                specialist: parseSpecialist(object.specialist),
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                employerName: parseEmployerName(object.employerName),
                sickLeave: {
                    startDate: parseStartDate(object.sickLeave.startDate),
                    endDate: parseEndDate(object.sickLeave.endDate)
                },
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                type: object.type
            };
            return newEntry;
        case 'HealthCheck':
            newEntry = {
                description: parseDescription(object.description),
                date: parseDate(object.date),
                specialist: parseSpecialist(object.specialist),
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                type: object.type
            };
            return newEntry;
        default:
            throw new Error('Incorrect entry type');
    }
};
exports.toNewDiagnosisEntry = toNewDiagnosisEntry;
