import express from 'express';
import patientsEntries from '../../data/patients';
import patientsService from "../services/patientsService";
import { toNewDiagnosisEntry, toNewPatientEntry } from '../utils';
const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getDataPatientNoSsn());
});

router.post('/', (req, res) => {
    try{
        const entry = toNewPatientEntry(req.body);
        const newPatientEntry = patientsService.addEntryPatient(entry);
        res.json(newPatientEntry);
    } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(e.message);
    }
});

router.get('/:id', (req, res) => {
    const requestedPatient = patientsEntries.find(p => p.id === req.params.id);

    if(!requestedPatient){
        throw new Error('Invalid ID code');
    }

    res.send(requestedPatient);
});

router.post('/:id/entries', (req, res) => {
    try {
        const id = req.params.id;
        const entry = toNewDiagnosisEntry(req.body);
        const newEntry = patientsService.addDiagnosisEntry(id, entry);
        res.json(newEntry);
    } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(e.message);
    }
});

export default router;