import React from 'react';
import { TwilioError, Track, VideoBandwidthProfileOptions, LocalVideoTrack, RemoteVideoTrack } from 'twilio-video'

declare module 'twilio-video' {
  interface LocalVideoTrack {
    isSwitchedOff: undefined
    setPriority: undefined
  }
}

export type RoomType = 'group' | 'group-small' | 'peer-to-peer' | 'go'

export type RecordingRule = {
  type: 'include' | 'exclude'
  all?: boolean
  kind?: 'audio' | 'video'
  publisher?: string
};

export type RecordingRules = RecordingRule[]

export type ErrorCallback = (error: TwilioError | Error) => void

export type Callback = (...args: any[]) => void

export interface Settings {
  trackSwitchOffMode: VideoBandwidthProfileOptions['trackSwitchOffMode'];
  dominantSpeakerPriority?: Track.Priority;
  bandwidthProfileMode: VideoBandwidthProfileOptions['mode'];
  maxAudioBitrate: string;
  contentPreferencesMode?: 'auto' | 'manual';
  clientTrackSwitchOffControl?: 'auto' | 'manual';
}

export type IVideoTrack = LocalVideoTrack | RemoteVideoTrack;

type TAdress = {
  cep: string;
  city: string;
  createdAt: string;
  id: string;
  neighborhood: string;
  number: string;
  state: string;
  street: string;
  suite: any;
  type: string;
  updatedAt: string;
}

type TProcedures = {
  attendanceId: number;
  canceledAt: string;
  createdAt: string;
  executedByProfessionalId: string;
  finishedAt: string;
  healthPlanId: string;
  id: number;
  note: string;
  preAttendance: boolean;
  procedureId: number;
  professionalId: string;
  scheduleId: number;
  spsadtId: any;
  startedAt: string;
  status: string;
  susId: any;
  tissId: any;
  updatedAt: string;
}

export type TAttendance = {
  canceledAt: any;
  createdAt: string;
  deletedAt: string;
  finishedAttendanceAt: string;
  id: number;
  note: string;
  patientId: string;
  procedures: TProcedures[]
  readyAt: string;
  startAttendanceAt: string;
  updatedAt: string;
}

type TPhones = {
  createdAt: string;
  ddd: string;
  id: string;
  phone: string;
  type: string;
  updatedAt: string;
}

export type TPatient = {
  addresses: TAdress[]
  allergies: any[]
  birthdate: string;
  clinicInformations: any;
  cpf: string;
  createdAt: string;
  email: string;
  ethnicity: any;
  filiation: any;
  fullname: string;
  gender: any;
  healthPlans: any[]
  id: string;
  informations: string;
  nationality: string;
  phones: TPhones[]
  religion: string;
  rg: string;
  rgEmittedBy: any;
  scholarity: any;
  socialName: any;
  specialNeeds: any;
  updatedAt: string;
  doctorName?: string;
  reason?: string;
}

interface IProcedures {
  createdAt: string,
  disabled: boolean,
  documentId: any,
  duration: any,
  friendlyName: string,
  id: number,
  instruction: string,
  materialBundleId: any,
  tussGroup: string,
  tussId: string,
  tussName: string,
  tussSubgroup: string,
  tussTableCode: string,
  updatedAt: string,
}

type TBankAccounts = {
  accountName: string;
  accountNumber: string;
  accountType: string;
  agencyNumber: string;
  bankCode: string;
  bankName: string;
  cpf: string;
  createdAt: string;
  id: string;
  pixKey: string;
  primary: boolean
  updatedAt: string;
}

type THealthPlans = {
  createdAt: string;
  healthPlan: {
    ansCode: string;
    cep: string;
    city: string;
    clinicCode: any;
    companyEmail: string;
    companyName: string;
    createdAt: string;
    description: string;
    healthPlanPlans: any[]
    id: number;
    imageUrl: any;
    neighborhood: string;
    number: string;
    state: string;
    street: string;
    suite: any;
    updatedAt: string;
  }
  healthPlanId: number;
  id: string;
  planProfessionalCode: string;
  updatedAt: string;
}

type TProceduresProfissional = {
  createdAt: string;
  id: string;
  procedure: IProcedures;
  procedureId: number;
  updatedAt: string;
}

type TSpecialities = {
  createdAt: string;
  id: string;
  speciality: {
    id: number;
    name: string;
    cboId: string;
    createdAt: string;
    updatedAt: string;
  }
  specialityId: 1
  updatedAt: string;
}

type TProfessional = {
  addresses: TAdress[]
  ansCbo: string;
  ansConsilCode: string;
  ansConsilProfessionalCode: string;
  ansUfCode: string;
  bankAccounts: TBankAccounts[]
  birthdate: string;
  cnpj: null
  cpf: string;
  createdAt: string;
  email: string;
  fullname: string;
  gender: string;
  healthPlans: THealthPlans[]
  id: string;
  inactivatedAt: any;
  legalEntity: string;
  maxComplyAge: number;
  minComplyAge: number;
  phones: TPhones[]
  procedures: TProceduresProfissional[]
  professionalCategory: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  }
  professionalCategoryId: number;
  specialities: TSpecialities[]
  status: boolean;
  updatedAt: string;
}

export type TDocuments = {
  attendanceId?: any;
  createdAt?: string;
  data?: string;
  date?: string;
  id?: number | null;
  patientId?: string;
  procedureId?: any;
  professionalId?: string;
  title?: any;
  type?: string;
  updatedAt?: string;
}

export type TDataProntuario = {
  attendance: TAttendance;
  documents: TDocuments[];
  patient: TPatient;
  procedures: IProcedures[];
  professional: TProfessional;
}

export type TDoctor = {
  exp: number;
  iat: number;
  tenant: string;
  user: {
    avatarUrl: any;
    createdAt: string;
    deletedAt: any;
    email: string;
    id: string;
    name: string;
    permissions: any[];
    professionalId: string;
    rolesIds: string[]
    token: any;
    updatedAt: string;
    username: string;
  }
}

export type TDocumentTypes = "clinicalRecord" | "certificate" | "recipe"

export type TDoctorProviderContext = {
  authToken: string;
  attendances: TAttendance[];
  setAttendances: React.Dispatch<React.SetStateAction<TAttendance[]>>;
  currentAttendance: TAttendance;
  setCurrentAttendance: React.Dispatch<React.SetStateAction<TAttendance>>;
  patient: TPatient;
  setPatient: React.Dispatch<React.SetStateAction<TPatient>>;
  doctor: TDoctor;
  setDoctor: React.Dispatch<React.SetStateAction<TDoctor>>;
  datas: TDataProntuario;
  setDatas: React.Dispatch<React.SetStateAction<TDataProntuario>>;
  getPatient(): Promise<void>;
  getAttendance(): Promise<void>;
  getDoctorData(): Promise<void>;
  changeEditorState(state: any): void;
  selectedDocumentTemplate: any;
  setSelectedDocumentTemplate: React.Dispatch<React.SetStateAction<any>>;
  typeDocumentSelected: any;
  setTypeDocumentSelected: React.Dispatch<React.SetStateAction<any>>;
  templatesOptions: any[];
  setTemplatesOptions: React.Dispatch<React.SetStateAction<any[]>>;
  getDocumentsAfterSave(): Promise<void>;
  getModelsByType(object?: any): Promise<void>;
  handleSave(): Promise<void>;
}

export type TDocumentTemplate = {
  data: string;
  id: number;
  label: string;
  value: number;
  type: string;
}