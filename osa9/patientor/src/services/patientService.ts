import patientData from '../../data/patients.json';
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry } from '../types';
import toNewPatientEntry from '../utils';
import {v1 as uuid} from 'uuid';

const patients: Array<PatientEntry> = patientData.map(obj => {
    const object = toNewPatientEntry(obj) as PatientEntry;
    object.id = obj.id;
    return object;
});

const getEntries = (): Array<PatientEntry> => {
    return patients;
};

const getNonSensitiveEntries = (): Array<NonSensitivePatientEntry> => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addEntry = ( entry: NewPatientEntry ): PatientEntry => {
    const id = uuid();
    const newPatientEntry = {
        id: id,
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getEntries,
    addEntry,
    getNonSensitiveEntries
};