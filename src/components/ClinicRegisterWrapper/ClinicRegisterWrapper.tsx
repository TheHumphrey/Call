import { useEffect, useState } from "react"
import { documentApi } from "lib/api/document"
import { isSameDay } from "date-fns"

import { ClinicType, AllRegistersModal, BaseButton } from "components"
import { TDataProntuario } from "types"

import {
  Container,
  ButtonContainer
} from "./style"
import { useDoctorContext, useDocuments } from "hooks"

const clinicRegisterTypes = [
  { name: "ANAMNESE", value: "subjective" },
  { name: "EXAME FÍSICO", value: "objective" },
  { name: "DIAGNÓSTICO", value: "assessment" },
  { name: "EVOLUÇÃO", value: "plan" },
  { name: "PROGNÓSTICO", value: "plan" },
]

type TProps = {
  datas: TDataProntuario;
  getDocumentsAfterSave: any;
}

export const ClinicRegisterWrapper = ({ datas, getDocumentsAfterSave }: TProps) => {
  const [toggleModal, setToggleModal] = useState(false)
  const [clinicTypes, setClinicTypes] = useState<any[]>([])
  const [newDocuments, setNewDocuments] = useState<any[]>([])
  const { authToken } = useDoctorContext()
  const documentService = documentApi(authToken)
  const { setStatusToProgress } = useDocuments()

  useEffect(() => {
    if (datas) {
      mountData()
    }
  }, [datas])

  function mountData() {
    const newData = []

    for (const type of clinicRegisterTypes) {

      newData.push({ type: type.value, name: type.name, data: [] })
    }

    setClinicTypes(newData)
  }

  function onChangeDocument(value: any, type: any) {
    const typeAlredyExist = newDocuments.find(data => data.type === type)
    setStatusToProgress("clinicalRecord")
    if (typeAlredyExist) {
      const newData = newDocuments.filter(data => data.type !== type)
      setNewDocuments([...newData, { type, data: value }])
    } else {
      setNewDocuments([...newDocuments, { type, data: value }])
    }
  }

  async function onClickSave() {
    const filteredData = newDocuments.filter(document => document.data)

    for (const document of filteredData) {
      const alreadyBeenSavedToday = datas.documents.find(
        (data: any) => data.type === document.type && isSameDay(new Date(), new Date(data.date))
      )

      const documentToSend = {
        ...document,
        professionalId: datas.professional.id,
        patientId: datas.patient.id,
      }

      if (!alreadyBeenSavedToday) {
        await postNewDocument(documentToSend)
      } else {
        await updateDocument(documentToSend, alreadyBeenSavedToday.id)
      }
    }
  }

  async function postNewDocument(document: any) {
    await documentService.post(`/documents`, document)
    getDocumentsAfterSave()
  }

  async function updateDocument(document: any, id: any) {
    await documentService.put(`/documents/${id}`, document)
    getDocumentsAfterSave()
  }

  return (
    <Container>
      <ClinicType
        setToggleModal={setToggleModal}
        clinicTypes={clinicTypes}
        onChangeDocument={onChangeDocument}
      />

      <ButtonContainer>
        <BaseButton onClick={onClickSave}>
          Salvar
        </BaseButton>
      </ButtonContainer>

      {toggleModal && (
        <AllRegistersModal
          toggleModal={toggleModal}
          setToggleModal={setToggleModal}
          clinicTypes={clinicTypes}
        />
      )}
    </Container>
  )
}
