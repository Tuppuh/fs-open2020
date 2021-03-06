export enum Gender {
    Male = 'male',
    Female = 'female'
}

export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
}

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;

export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}
