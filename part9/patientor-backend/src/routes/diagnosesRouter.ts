import express from 'express';
import diagnoseServices from '../services/diagnoseService';
const router = express.Router();

router.get('/', (_req, res) => {
    res.send(diagnoseServices.getData());
});

router.post('/', (_req,res) => {
    res.send('Saving a Diagnose');
});

export default router;