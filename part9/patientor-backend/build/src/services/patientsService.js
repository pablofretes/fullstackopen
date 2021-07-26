"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getDataPatient = () => { return patients_1.default; };
const getDataPatientNoSsn = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};
const addEntryPatient = (patient) => {
    const newPatientEntry = Object.assign({ id: uuid_1.v1() }, patient);
    patients_1.default.push(newPatientEntry);
    return newPatientEntry;
};
const addDiagnosisEntry = (id, entry) => {
    const userToUpdate = patients_1.default.find(p => p.id === id);
    if (!userToUpdate) {
        throw new Error('That patient is not in the database!');
    }
    const newDiagnosisEntry = Object.assign({ id: uuid_1.v1() }, entry);
    userToUpdate.entries.concat(newDiagnosisEntry);
    return userToUpdate;
};
exports.default = { getDataPatient, getDataPatientNoSsn, addEntryPatient, addDiagnosisEntry };
