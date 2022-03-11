/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"

import {
  Container,
  LabelMenu,
  PrimaryCam,
  TopMenu,
  TimerMenu,
  ResolutionMenu,
  BottomMenu,
  SecondaryCam,
  SideMenu,
  // BottomButton,
  CallButton,
  CallButtonIcon,
  // SecundaryMenu,
  // ConectionMenu,
  AudioButton,
  VideoButton,
  // CamParticipant,
  FileIcon,
  ClipIcon,
  BottleIcon,
  FullButtonIcon,
  ModalCustom,
  ModalBox,
  XIcon,
  PacientInfo,
} from './style'

import {
  BsTelephoneXFill,
  BsArrowsFullscreen,
  BsFullscreenExit,
} from "react-icons/bs"


import {
  ChatWindow,
  ParticipantList,
  ClinicRegisterWrapper,
  FormTypeButtons,
  DocViewer
} from 'components'

import { useNavigate, useParams } from "react-router-dom"
import { ToggleChatButton } from "components/ToggleChatButton/ToggleChatButton"
import { useChatContext, useVideoContext, useParticipants } from "hooks"
import { TDataProntuario } from "types"
import { documentApi, documentApiWrapper } from "lib/api/document"

type TProps = {
  doctor?: boolean;
}

export const Room = ({ doctor }: TProps) => {
  // const [pacienteVideo, setPacienteVideo] = useState()
  const [openModalClinicalRecord, setOpenModalClinicalRecord] = useState(false)
  const [openModalRecipe, setOpenModalRecipe] = useState(false)
  const [screen, setScreen] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [isAwaitDoctor, setIsAwaitDoctor] = useState(true)

  const [datas, setDatas] = useState<TDataProntuario>()
  const [typeDocumentSelected, setTypeDocumentSelected] = useState<any>()
  const [templatesOptions, setTemplatesOptions] = useState<any[]>([]);
  const [selectedDocumentTemplate, setSelectedDocumentTemplate] = useState<any>();
  const [selectedType, setSelectedType] = useState({ value: [] });
  const { token } = useParams()

  const participants = useParticipants()

  const documentService = documentApi(token || '')

  useEffect(() => {
    if (!isAwaitDoctor) {
      setTimeout(() => {
        setCurrentTime(state => state + 1)
      }, 1000)
    }
  }, [isAwaitDoctor, currentTime])

  useEffect(
    () => {
      setIsAwaitDoctor(participants.length === 0)
    }, [participants]
  )

  const hours = Math.floor(currentTime / 60 / 60)
  const minutes = Math.floor(currentTime / 60)
  const seconds = currentTime % 60

  const history = useNavigate()

  const { room } = useVideoContext()
  const { isChatWindowOpen } = useChatContext()

  const handleDisconnect = () => {
    room?.disconnect()
    setIsAwaitDoctor(false)

    history('/', { replace: true })
  }

  const handleFullscreen = () => {
    screen ? document.exitFullscreen() : document.documentElement.requestFullscreen()
    setScreen(!screen)
  }

  const getDocumentsAfterSave = async () => {
    const documents = await documentService.get(`/documents?patient=${datas?.patient?.id}`);

    setDatas((prev: any) => ({ ...prev, documents: documents.data.reverse() }));
  }

  const getModelsByType = async (object?: any) => {
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

  const changeEditorState = (state: any) => {
    const newData = { ...selectedDocumentTemplate };
    newData.data = state;
    setSelectedDocumentTemplate(newData);
  }

  async function handleSave() {
    try {
      debugger
      if (!datas) return
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

  // const getScheduleInformations = async () => {
  //   try {
  //     setLoading(true);
  //     const attendance = await attendanceApi.get(`/attendances/${attendanceId}`);
  //     const patient = await clinicApi.get(`/patients/${attendance.data.patientId}`);
  //     const professional = await clinicApi.get(`/professionals/${user.user.professionalId}`); //TODO: VERIFY THIS OBJECT USER
  //     const documents = await documentApi.get(`/documents?patient=${attendance.data.patientId}`);
  //     const procedures = [];

  //     for (const procedure of attendance.data.procedures) {
  //       const procedureData = await clinicApi.get(`/procedures/${procedure.procedureId}`);
  //       procedures.push(procedureData.data);
  //     }
  //     debugger

  //     setDatas({
  //       patient: patient.data,
  //       professional: professional.data,
  //       documents: documents.data.reverse(),
  //       attendance: attendance.data,
  //       procedures
  //     });
  //     setLoading(false);
  //   } catch (error: any) {
  //     // setError(error.response.data.message);
  //   }
  // }

  // return isAwaitDoctor ? (
  //   <>
  //     <h1>Esperando Doctor</h1>
  //   </>
  // ) : (
  return (
    <Container>
      <PrimaryCam>
        <ParticipantList isPrimaryCam />
      </PrimaryCam>
      <TopMenu >
        <LabelMenu>Consulta Telemedicina</LabelMenu>
        <TimerMenu>
          {`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
        </TimerMenu>
        <ResolutionMenu>HD</ResolutionMenu>
      </TopMenu>

      <BottomMenu>
        <AudioButton fill="white" />
        <VideoButton fill="white" />

        {/* <BottomButton>
          <BsThreeDots />
        </BottomButton> */}

        <ToggleChatButton />

        <CallButton onClick={handleDisconnect}>
          <CallButtonIcon>
            <BsTelephoneXFill />
          </CallButtonIcon>
        </CallButton>

        <CallButton onClick={handleFullscreen}>
          <FullButtonIcon>
            {screen ? (<BsFullscreenExit />) : (<BsArrowsFullscreen />)}
          </FullButtonIcon>
        </CallButton>

      </BottomMenu>
      {
        doctor && (
          <SideMenu isChatWindowOpen={isChatWindowOpen}>

            <CallButton onClick={() => setOpenModalClinicalRecord(true)}>
              <ClipIcon />
            </CallButton>

            <CallButton>
              <FileIcon onClick={() => setOpenModalRecipe(true)} />
            </CallButton>

            <CallButton>
              <BottleIcon />
            </CallButton>
          </SideMenu>
        )
      }



      <SecondaryCam isChatWindowOpen={isChatWindowOpen}>
        <ParticipantList />
        {/* <ConectionMenu>
          <BsReception4 />
        </ConectionMenu>
        <SecundaryMenu>
          <BsThreeDotsVertical />
        </SecundaryMenu> */}

      </SecondaryCam>

      <ChatWindow />
      <PacientInfo >
        <p>teste</p>
      </PacientInfo>

      <ModalCustom
        open={openModalClinicalRecord}
        onClose={() => setOpenModalClinicalRecord(!openModalClinicalRecord)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox>
          <XIcon onClick={() => setOpenModalClinicalRecord(false)} />
          <ClinicRegisterWrapper datas={datas!} getDocumentsAfterSave={getDocumentsAfterSave} token="aa" />
        </ModalBox>
      </ModalCustom>

      <ModalCustom
        open={openModalRecipe}
        onClose={() => setOpenModalRecipe(!openModalRecipe)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox>
          <XIcon onClick={() => setOpenModalRecipe(false)} />
          <FormTypeButtons getModelsByType={getModelsByType} setTypeDocumentSelected={setTypeDocumentSelected} />

          <DocViewer
            templatesOptions={templatesOptions}
            selectedDocumentTemplate={selectedDocumentTemplate}
            setSelectedDocumentTemplate={setSelectedDocumentTemplate}
            changeEditorState={changeEditorState}
            handleSave={handleSave}
          />
        </ModalBox>
      </ModalCustom>
    </Container>
  )
}