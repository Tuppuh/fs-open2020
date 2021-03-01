import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

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

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
