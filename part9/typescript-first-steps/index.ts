import express from 'express';
import { bmiCalc } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

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
        });
    }

    res.send({
        height: height,
        weight: weight,
        bmi: bmiCalc(height, weight)
    });
});

app.post('/exercises', (req, res) => {
    const exercisesObj = req.body;
    const daily_exercises = exercisesObj.daily_exercises;
    const target = Number(exercisesObj.target);

    if(!daily_exercises || !target){
        res.status(400).json({
            error: 'parameters missing'
        });
    }

    if(isNaN(target) || daily_exercises.some(isNaN)){
        res.status(400).json({
            error: 'malformatted parameters'
        });
    }

    res.json(calculateExercises(daily_exercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});