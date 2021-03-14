export enum Gender {
    Male = 'male',
    Female = 'female'
}

export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
}

export type NewPatient = Omit<Patient, 'id' | 'entries'>;

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface DischargeInfo {
    date: string;
    criteria: string;
}

export interface SickLeave {
    startDate: string;
    endDate: string;
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthCareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: DischargeInfo;
}


export type Entry = 
| HospitalEntry
| OccupationalHealthCareEntry
| HealthCheckEntry;

/*
export enum EntryType {
    "HospitalEntry" = 0,
    "OccupationalHealthCareEntry" = 1,
    "HealthCheckEntry" = 2
}*/
export type EntryType = "Hospital" | "OccupationalHealthcare" | "HealthCheck";

export type NewEntry = Pick<Entry, 'type'>;

export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;
export type NewOccupationalHealthCareEntry = Omit<OccupationalHealthCareEntry, 'id'>;
export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;

export type NewEntry2 = NewHospitalEntry | NewOccupationalHealthCareEntry | NewHealthCheckEntry;

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[]
}

export type PublicPatient = Omit<Patient, 'ssn'>;
