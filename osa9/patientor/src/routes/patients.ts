import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewEntry2 } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
    const patient = patientService.findById(String(req.params.id));
    if (patient) {
        res.send(patient);
    }
    else {
        res.sendStatus(404);
    }
});

router.post('/:id/entries', (req, res) => {
    try {
        console.log(req.body);
        const newEntry = toNewEntry2(req.body);
        const patient = patientService.findById(String(req.params.id));
        if (patient) {
            const newPatient = patientService.addEntryToPatient(patient, newEntry);
            res.json(newPatient);
        }
        else {
            throw new Error('Patient not found');
        }
    }catch (e) {
        res.status(400).send(e.message);
    }
});

router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedEntry = patientService.addEntry(newPatientEntry);
        res.json(addedEntry);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

export default router;
