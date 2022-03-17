import React, { createContext, useEffect, useState } from 'react'
import { TAttendance, TDataProntuario, TDoctor, TDoctorProviderContext, TDocuments, TDocumentTemplate, TPatient } from 'types'
import { accessApi, attendanceApi, clinicApi } from 'utils/axios'

import { useParams } from 'react-router-dom'
import { documentApi, documentApiWrapper } from 'lib/api/document'



export const DoctorContext = createContext<TDoctorProviderContext>(null!)

export const DoctorProvider: React.FC = ({ children }) => {
  const [patient, setPatient] = useState<TPatient>({} as TPatient)
  const [doctor, setDoctor] = useState<TDoctor>({} as TDoctor)
  const [authToken, setAuthToken] = useState<string>('')
  const [currentAttendance, setCurrentAttendance] = useState<TAttendance>({} as TAttendance)
  const [attendances, setAttendances] = useState<TAttendance[]>({} as TAttendance[])
  const [datas, setDatas] = useState<TDataProntuario>({} as TDataProntuario)
  const [selectedDocumentTemplate, setSelectedDocumentTemplate] = useState<TDocumentTemplate>({} as TDocumentTemplate)
  const [templatesOptions, setTemplatesOptions] = useState<TDocumentTemplate[]>([]);
  const [typeDocumentSelected, setTypeDocumentSelected] = useState<any>('prescription')

  const { token, patientId } = useParams()

  useEffect(() => {
    getPatient()
    getAttendance()
    getDoctorData()
    getModelsByType('prescription')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, patientId])

  useEffect(() => {
    getScheduleInformations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAttendance])

  useEffect(() => {
    token && localStorage.setItem('token', token)
    token && setAuthToken(token)
  }, [token])

  const getPatient = async () => {
    if (!token || !patientId) return

    const clinicService = clinicApi(token)
    await clinicService
      .get<TPatient[]>(`/patients`).then(
        ({ data }) => {
          const newPatientData = data.find(item => item.id === patientId)
          if (!newPatientData) return
          localStorage.setItem('patient', JSON.stringify(patient))
          setPatient({ ...patient, ...newPatientData })
        }
      )
  }

  const getAttendance = async () => {
    if (!token || !patientId) return

    const dateTime = new Date()
    const today = `${dateTime.getFullYear()}-${(dateTime.getMonth() + 1)}-${dateTime.getDate()}`

    const attendanceService = attendanceApi(token)
    // await attendanceService.get<TAttendance[]>(`/attendances?readyAt=true&createdAt=${today}`)
    await attendanceService.get<TAttendance[]>(`/attendances?readyAt=true&createdAt=2022-03-15`)
      .then(
        ({ data }) => {
          setAttendances(data)
          const attendance = data.find(item => item.patientId === patientId)
          if (!attendance) return
          localStorage.setItem('attendance', JSON.stringify(attendance))
          setCurrentAttendance(attendance)
        }
      )
  }

  const getDoctorData = async () => {
    if (!token) return

    const acessService = accessApi(token)

    acessService.post<TDoctor>('auth/me', { accessToken: token })
      .then(
        ({ data }) => {
          if (!data) return
          setDoctor(data)
        }
      )
  }

  const changeEditorState = (state: any) => {
    const newData = { ...selectedDocumentTemplate };
    newData.data = state;
    setSelectedDocumentTemplate(newData);
    updateTemplateData(newData.data)
  }

  const getDocumentsAfterSave = async () => {
    const documentService = documentApi(token || '')

    const documents = await documentService.get(`/documents?patient=${datas?.patient?.id}`);

    setDatas((prev: any) => ({ ...prev, documents: documents.data.reverse() }));
  }

  const getModelsByType = async (object: any) => {
    const documentService = documentApi(token || '')
    const { value } = object
    setTemplatesOptions([])
    setSelectedDocumentTemplate({ data: "" } as TDocumentTemplate)
    const response = await documentApiWrapper.getDocumentTemplateByType(value, documentService)
    const newTemplatesOptions: TDocumentTemplate[] = response.map((item: any) => ({
      value: item.id,
      label: item.name,
      data: item.data,
      id: item.id,
      type: value,
    }))

    if (!newTemplatesOptions) return

    setSelectedDocumentTemplate(newTemplatesOptions[0])

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

      let data: TDocuments = {
        type: typeDocumentSelected,
        professionalId: datas.professional.id,
        patientId: datas.patient.id,
        date: datas.attendance.createdAt,
        data: selectedDocumentTemplate.data,
        id: null
      };

      if (verifyModelExist) {
        data = { ...data, id: verifyModelExist.id };
        await documentService.put(`/documents/${verifyModelExist.id}`, data)
          .then(() => {
            const documentUpdate = datas.documents.map((document) => {
              if (document.type === data.type && document.id === data.id) {
                return { ...document, data: data.data }
              } else {
                return document
              }
            })

            setDatas({ ...datas, documents: documentUpdate })
            updateTemplateData()
          })
        // dispatch(showNotification("Editado com sucesso"));
        getDocumentsAfterSave();
      } else {
        await documentService.post(`/documents`, data)
          .then(({ data }) => {
            const documentUpdate = datas.documents
            documentUpdate.push(data)
            setDatas({ ...datas, documents: documentUpdate })
            updateTemplateData()
          })
        // dispatch(showNotification("Criado com sucesso"));
        getDocumentsAfterSave();
      }
    } catch (error: any) {
      console.warn(error.response.data.message);
    }
  }

  const updateTemplateData = (data?: string) => {
    const documentTemplateUpdate = templatesOptions.map((item) => {
      if (item.type === selectedDocumentTemplate.type && item.id === selectedDocumentTemplate.id) {
        return data ? { ...item, data: data } : { ...item, data: selectedDocumentTemplate.data }
      } else {
        return item
      }
    })

    setTemplatesOptions(documentTemplateUpdate)
  }

  async function getScheduleInformations() {
    try {
      if (!token || !currentAttendance?.id) return

      const attendanceService = attendanceApi(token)
      const clinicService = clinicApi(token)
      const documentService = documentApi(token || '')

      const attendanceResponse = await attendanceService.get(`/attendances/${currentAttendance?.id}`)

      const patient = await clinicService.get(`/patients/${attendanceResponse.data.patientId}`)
      const professional = await clinicService.get(`/professionals/${doctor.user.professionalId}`)
      const documents = await documentService.get(`/documents?patient=${attendanceResponse.data.patientId}`)
      const procedures = [];

      for (const procedure of attendanceResponse.data.procedures) {
        const procedureData = await clinicService.get(`/procedures/${procedure.procedureId}`)
        procedures.push(procedureData.data)
      }

      setDatas({
        patient: patient.data,
        professional: professional.data,
        documents: documents.data.reverse(),
        attendance: attendanceResponse.data,
        procedures
      })
    } catch (error: any) {
      console.warn(error.response.data.message)
    }
  }

  return (
    <DoctorContext.Provider
      value={{
        authToken,
        datas,
        setDatas,
        selectedDocumentTemplate,
        setSelectedDocumentTemplate,
        patient,
        setPatient,
        doctor,
        setDoctor,
        currentAttendance,
        setCurrentAttendance,
        attendances,
        setAttendances,
        getPatient,
        getAttendance,
        getDoctorData,
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
