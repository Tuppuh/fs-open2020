import { NewPatient, Gender, NewEntry, EntryType, SickLeave, HealthCheckRating, DischargeInfo, NewEntry2 } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isStringArray = (array: unknown): array is string[] => {
    return Array.isArray(array);
};

const isSickLeave = (obj: unknown): obj is SickLeave => {
    return typeof(obj) === 'object' 
    && obj !== null 
    && 'startDate' in obj
    && 'endDate' in obj;
};

const isDischarge = (obj: unknown): obj is DischargeInfo => {
    return typeof(obj) === 'object' 
    && obj !== null 
    && 'date' in obj
    && 'criteria' in obj;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};

const parseDateOfBirth = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing Gender: ' + gender);
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};

const isEntryType = (param: unknown): param is EntryType => {
    return (param === "Hospital" || param==="OccupationalHealthcare" || param === "HealthCheck");
};

const parseType = ( type: unknown ): EntryType => {
    if (!type || !isEntryType(type)) {
        throw new Error('Incorrect or missing entry type: ' + type);
    }
    return type;
};

const parseString = (inputstring: unknown): string => {
    if (!inputstring || !isString(inputstring)) {
        throw new Error('Incorrect or missing string: ' + inputstring);
    }
    return inputstring;
};

const parseDiagnosisCodes = (codes: unknown): string[] | undefined => {
    if(!codes || !isStringArray(codes)){
        return undefined;
    }
    return codes;
};

const parseSickLeave = (sickleave: unknown): SickLeave => {
    if(!sickleave || !isSickLeave(sickleave) ){
        throw new Error('Incorrect or missing sickleave: ' + sickleave);
    }
    return sickleave;
};

const parseHealthRating = (rating: unknown): HealthCheckRating => {
    if (!rating || !isHealthRating(rating)) {
        throw new Error('Incorrect or missing healthcheckrating');
    }
    return rating;
};

const parseDischarge = (info: unknown): DischargeInfo => {
    if (!info || !isDischarge(info)) {
        throw new Error('Incorrect or missing dischargeinfo');
    }
    return info;
};

// TODO: entry parsers

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown};

export const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): NewPatient => {
    const newEntry: NewPatient = {
        name: parseName(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation)
    };
    return newEntry;
};


type EntryFields = { type: unknown };

export const toNewEntry = ({ type }: EntryFields ): NewEntry => {
    const newEntry: NewEntry = {
        type: parseType(type)
    };
    return newEntry;
};


type EntryFields2 = {type: unknown, date: unknown, specialist: unknown, diagnosisCodes: unknown, description: unknown, employerName: unknown, sickLeave: unknown, healthCheckRating: unknown, discharge: unknown};

export const  toNewEntry2 = ( {type, date, specialist, diagnosisCodes, 
    description, employerName, sickLeave, healthCheckRating, discharge} : EntryFields2): NewEntry2 => {
    const entryType = parseType(type);
    switch (entryType) {
        case 'HealthCheck':
            return {
                type: entryType,
                date: parseDateOfBirth(date),
                specialist: parseString(specialist),
                description: parseString(description),
                healthCheckRating: parseHealthRating(healthCheckRating)
            };
        case 'Hospital':
            return {
                type: entryType,
                date: parseDateOfBirth(date),
                specialist: parseString(specialist),
                diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
                description: parseString(description),
                discharge: parseDischarge(discharge)
            };
        case 'OccupationalHealthcare':
            return {
                type: entryType,
                date: parseDateOfBirth(date),
                specialist: parseString(specialist),
                employerName: parseString(employerName),
                description: parseString(description),
                sickLeave: parseSickLeave(sickLeave),
                diagnosisCodes: parseDiagnosisCodes(diagnosisCodes)
            };
    }
    /*
    const newEntry: NewEntry2 = {
        type: parseType(type),
        date: parseDateOfBirth(date),
        specialist: parseString(specialist),
        // diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        description: parseString(description),
        // employerName: parseString(employerName),
        // sickLeave: parseSickLeave(sickLeave),
        // healthCheckRating: parseHealthRating(healthCheckRating)
    };
    */
};
