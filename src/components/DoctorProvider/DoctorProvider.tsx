import React, { createContext, useEffect, useState } from 'react'
import { TAttendance, TDataProntuario, TDoctorProviderContext, TPatient } from 'types'
import { attendanceApi, clinicApi } from 'utils/axios'

import { useParams } from 'react-router-dom'
import { documentApi, documentApiWrapper } from 'lib/api/document'



export const DoctorContext = createContext<TDoctorProviderContext>(null!)

export const DoctorProvider: React.FC = ({ children }) => {
  const [patient, setPatient] = useState<TPatient>({} as TPatient)
  const [currentAttendance, setCurrentAttendance] = useState<TAttendance>({} as TAttendance)
  const [attendances, setAttendances] = useState<TAttendance[]>({} as TAttendance[])
  const [datas, setDatas] = useState<TDataProntuario>({} as TDataProntuario)
  const [selectedDocumentTemplate, setSelectedDocumentTemplate] = useState<any>({} as any)
  const [templatesOptions, setTemplatesOptions] = useState<any[]>([]);
  const [typeDocumentSelected, setTypeDocumentSelected] = useState<any>()

  const { token, patientId } = useParams()



  useEffect(() => {
    getPatient()
    getAttendance()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, patientId])

  useEffect(() => {
    token && localStorage.setItem('token', token)
  }, [token])

  const getPatient = async () => {
    if (!token || !patientId) return

    const clinicService = clinicApi(token)
    await clinicService
      .get<TPatient[]>(`/patients`).then(
        ({ data }) => {
          const patient = data.find(item => item.id === patientId)
          if (!patient) return
          localStorage.setItem('patient', JSON.stringify(patient))
          setPatient(patient)
        }
      )
  }

  const getAttendance = async () => {
    if (!token || !patientId) return

    const dateTime = new Date()
    const today = `${dateTime.getFullYear()}-${(dateTime.getMonth() + 1)}-${dateTime.getDate()}`

    const attendanceService = attendanceApi(token)
    await attendanceService
      .get<TAttendance[]>(`/attendances?readyAt=true&createdAt=${today}`).then(
        ({ data }) => {
          setAttendances(data)
          const attendance = data.find(item => item.patientId === patientId)
          if (!attendance) return
          localStorage.setItem('attendance', JSON.stringify(attendance))
          setCurrentAttendance(attendance)
        }
      )
  }

  const changeEditorState = (state: any) => {
    const newData = { ...selectedDocumentTemplate };
    newData.data = state;
    setSelectedDocumentTemplate(newData);
  }

  const getDocumentsAfterSave = async () => {
    const documentService = documentApi(token || '')

    const documents = await documentService.get(`/documents?patient=${datas?.patient?.id}`);

    setDatas((prev: any) => ({ ...prev, documents: documents.data.reverse() }));
  }

  const getModelsByType = async (object?: any) => {
    const documentService = documentApi(token || '')

    setTemplatesOptions([])
    setSelectedDocumentTemplate(null)
    const response = await documentApiWrapper.getDocumentTemplateByType('', documentService)
    const newTemplatesOptions = response.map((item: any) => ({
      value: item.id,
      label: item.name,
      data: item.data,
      id: item.id,
    }))

    setTemplatesOptions(newTemplatesOptions)
  }

  const handleSave = async () => {
    try {
      if (!datas || !token) return
      const documentService = documentApi(token || '')
      const verifyModelExist = datas.documents.find(
        (document: any) =>
          datas.attendance.createdAt === document.date &&
          typeDocumentSelected === document.type &&
          datas.professional.id === document.professionalId &&
          datas.patient.id === document.patientId
      );

      let data = {
        type: typeDocumentSelected,
        professionalId: datas.professional.id,
        patientId: datas.patient.id,
        date: datas.attendance.createdAt,
        data: selectedDocumentTemplate?.data,
        id: null
      };

      if (verifyModelExist) {
        data = { ...data, id: verifyModelExist.id };
        await documentService.put(`/documents/${verifyModelExist.id}`, data);
        // dispatch(showNotification("Editado com sucesso"));
        getDocumentsAfterSave();
      } else {
        await documentService.post(`/documents`, data);
        // dispatch(showNotification("Criado com sucesso"));
        getDocumentsAfterSave();
      }
    } catch (error: any) {
      console.warn(error.response.data.message);
    }
  }

  return (
    <DoctorContext.Provider
      value={{
        datas,
        setDatas,
        selectedDocumentTemplate,
        setSelectedDocumentTemplate,
        patient,
        setPatient,
        currentAttendance,
        setCurrentAttendance,
        attendances,
        setAttendances,
        getPatient,
        getAttendance,
        changeEditorState,
        templatesOptions,
        setTemplatesOptions,
        typeDocumentSelected,
        setTypeDocumentSelected,
        getDocumentsAfterSave,
        getModelsByType,
        handleSave,
      }}
    >
      {children}
    </DoctorContext.Provider>
  )
}
