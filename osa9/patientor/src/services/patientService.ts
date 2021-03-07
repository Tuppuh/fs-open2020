import patientData from '../../data/patients.json';
import { Patient, PublicPatient, NewPatient } from '../types';
import toNewPatientEntry from '../utils';
import {v1 as uuid} from 'uuid';

const patients: Array<Patient> = patientData.map(obj => {
    const object = toNewPatientEntry(obj) as Patient;
    object.id = obj.id;
    return object;
});

const getEntries = (): Array<Patient> => {
    return patients;
};

const findById = (id: string): Patient | undefined => {
    const entry = patients.find(p => p.id === id);
    if (entry) {
        return ({
            id: entry.id,
            name: entry.name,
            dateOfBirth: entry.dateOfBirth,
            gender: entry.gender,
            occupation: entry.occupation,
            ssn: entry.ssn,
            entries: []
        });
    }
    else {
        return undefined;
    }
};

const getNonSensitiveEntries = (): Array<PublicPatient> => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addEntry = ( entry: NewPatient ): Patient => {
    const id = uuid();
    const newPatientEntry = {
        id: id,
        entries: [],
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getEntries,
    addEntry,
    getNonSensitiveEntries,
    findById
};