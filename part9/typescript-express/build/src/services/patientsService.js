"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getDataPatient = () => { return patients_1.default; };
const getDataPatientNoSsn = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const addEntryPatient = (patient) => {
    const newPatientEntry = Object.assign({ id: uuid_1.v1() }, patient);
    patients_1.default.push(newPatientEntry);
    return newPatientEntry;
};
exports.default = { getDataPatient, getDataPatientNoSsn, addEntryPatient };
