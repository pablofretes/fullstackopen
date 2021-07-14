import express from 'express';
import { bmiCalc } from './bmiCalculator';

const app = express();

app.get('/', (_req, res) => {
    res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
    const bmiObj = req.query;
    const height = Number(bmiObj.height);
    const weight = Number(bmiObj.weight);

    if(isNaN(height) || isNaN(weight)){
        res.status(400).send({
            error: 'malformatted parameters'
        })
    }

    res.send({
        height: height,
        weight: weight,
        bmi: bmiCalc(height, weight)
    })
})

const PORT = 3003

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})