import { AxiosInstance } from 'axios';
import { initAxios } from './axiosApiWrapper'

const DOCUMENT_API = process.env.REACT_APP_DOCUMENT_API as string

export const documentApi = (token: string) => initAxios(DOCUMENT_API, token)

//TODO: DELETE THIS BELOW AFTER

async function getDocumentTemplateByType(type: any, documentApi: AxiosInstance) {
  const response = await documentApi.get(`/documentTemplates?type=${type}`);
  return response.data;
}

async function getDocumentTemplateById(id: any, documentApi: AxiosInstance) {
  const response = await documentApi.get(`/documentTemplates/${id}`);
  return response.data;
}

async function postDocumentTemplate(form: any, documentApi: AxiosInstance) {
  const response = await documentApi.post(`/documentTemplates`, form);
  return response.data;
}

async function editDocumentTemplate(form: any, id: any, documentApi: AxiosInstance) {
  const response = await documentApi.put(`/documentTemplates/${id}`, form);
  return response.data;
}

async function deleteDocumentTemplate(payload: any, documentApi: AxiosInstance) {
  const response = await documentApi.delete(`/documentTemplates/${payload}`);
  return response.data;
}

//DYNAMIC FIELD

async function editDynamicFieldInDocumentTemplate(field: { id: any; }, id: any, documentApi: AxiosInstance) {
  const response = await documentApi.put(`/documentTemplates/${id}/dynamicFields/${field.id}`, field);
  return response.data;
}

async function saveDynamicFieldsInDocumentTemplate(field: any, id: any, documentApi: AxiosInstance) {
  const response = await documentApi.post(`/documentTemplates/${id}/dynamicFields/`, field);
  return response.data;
}

async function deleteDynamicFieldsInDocumentTemplate(documentId: any, dynamicId: any, documentApi: AxiosInstance) {
  const response = await documentApi.delete(
    `/documentTemplates/${documentId}/dynamicFields/${dynamicId}`
  );
  return response.data;
}

//PROCEDURE

async function saveProcedureInDocumentTemplate(procedure: any, id: any, documentApi: AxiosInstance) {
  const response = await documentApi.post(`/documentTemplates/${id}/procedures`, procedure);
  return response.data;
}

async function deleteProcedureInDocumentTemplate(documentId: any, procedureId: any, documentApi: AxiosInstance) {
  const response = await documentApi.delete(
    `/documentTemplates/${documentId}/procedures/${procedureId}`
  );
  return response.data;
}

export const documentApiWrapper = {
  getDocumentTemplateByType,
  getDocumentTemplateById,
  postDocumentTemplate,
  editDocumentTemplate,
  deleteDocumentTemplate,
  editDynamicFieldInDocumentTemplate,
  saveDynamicFieldsInDocumentTemplate,
  deleteDynamicFieldsInDocumentTemplate,
  saveProcedureInDocumentTemplate,
  deleteProcedureInDocumentTemplate,
};


