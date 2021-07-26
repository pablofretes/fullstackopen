import express from 'express';
import cors from 'cors';
import diagnoseRouter from './src/routes/diagnosesRouter';
import patientsRouter from './src/routes/patientsRouter';

const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const PORT = 3001;

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});