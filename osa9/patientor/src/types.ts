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

// export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[]
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
