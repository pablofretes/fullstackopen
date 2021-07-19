import express from 'express';
import patientsEntries from '../../data/patients';
import patientsService from "../services/patientsService";
const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getDataPatientNoSsn());
});

router.post('/', (req, res) => {
    const newPatientEntry = patientsService.addEntryPatient(req.body);
    res.json(newPatientEntry);
});

router.get('/:id', (req, res) => {
    const requestedPatient = patientsEntries.find(p => p.id === req.params.id);

    if(!requestedPatient){
        throw new Error('Invalid ID code');
    }

    res.send(requestedPatient);
});

export default router;