import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExcercises, excerciseResult } from './excerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const weight = req.query.weight;
    const height = req.query.height;
    if (weight == null || height == null){
        res.send(
            {
                error: "malformatted parameters"
            }
        );
    }
    else{
        const bmi: string = calculateBmi(Number(height), Number(weight));
        res.send({
            weight: Number(weight),
            height: Number(height),
            bmi: bmi
        });
    }
});

app.post('/excercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const excerciseInfo: any = req.body;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dailyExcercises: any = excerciseInfo.daily_exercises;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dailyTarget: any = excerciseInfo.target;
    if (!dailyExcercises || !dailyTarget){
        res.json({
            error: "parameters missing"
        });
    }
    else if (!Array.isArray(dailyExcercises) || typeof(dailyExcercises[0]) !== "number" || typeof(dailyTarget) != "number"){
        res.json({
            error: "malformatted parameters"
        });
    }
    else{
        const result: excerciseResult = calculateExcercises(dailyExcercises, dailyTarget);
        res.json(result);
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
