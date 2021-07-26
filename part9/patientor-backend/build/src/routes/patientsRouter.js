"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patients_1 = __importDefault(require("../../data/patients"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientsService_1.default.getDataPatientNoSsn());
});
router.post('/', (req, res) => {
    try {
        const entry = utils_1.toNewPatientEntry(req.body);
        const newPatientEntry = patientsService_1.default.addEntryPatient(entry);
        res.json(newPatientEntry);
    }
    catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(e.message);
    }
});
router.get('/:id', (req, res) => {
    const requestedPatient = patients_1.default.find(p => p.id === req.params.id);
    if (!requestedPatient) {
        throw new Error('Invalid ID code');
    }
    res.send(requestedPatient);
});
router.post('/:id/entries', (req, res) => {
    try {
        const id = req.params.id;
        const entry = utils_1.toNewDiagnosisEntry(req.body);
        const newEntry = patientsService_1.default.addDiagnosisEntry(id, entry);
        res.json(newEntry);
    }
    catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(e.message);
    }
});
exports.default = router;
