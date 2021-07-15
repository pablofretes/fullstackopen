import express from 'express';
import patientsService from "../services/patientsService";
const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getDataPatientNoSsn());
});

router.post('/', (req, res) => {
    const newPatientEntry = patientsService.addEntryPatient(req.body);
    res.json(newPatientEntry);
});

export default router;