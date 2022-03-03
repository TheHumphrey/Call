import BaseModal from "components/BaseModal/BaseModal"
import {
  Container,
  TypeNameContainer,
  Name,
  RegisterContainer,
  Date,
  Register,
  RegisterContainerWrapper,
  Header,
  Title,
  ActionButtons,
  PaginationButton,
  ArrowButton,
} from "./style"

import { BsChevronRight, BsChevronLeft } from "react-icons/bs"
import { VscClose } from "react-icons/vsc"
import { useState } from "react"
import { formatDate } from "utils/helpers"

interface Props {
  toggleModal: any,
  setToggleModal: any,
  clinicTypes: any,
}

export const AllRegistersModal = ({ toggleModal, setToggleModal, clinicTypes }: Props) => {
  const [currentPage, setCurrentPage] = useState(0)

  return (
    <BaseModal toggleModal={toggleModal} setToggleModal={setToggleModal} blockOutsideClick>
      <Container>
        <Header>
          <Title>Registro de consultas anteriores</Title>
          <ActionButtons>
            <VscClose
              size="28px"
              color="#66717F"
              onClick={() => setToggleModal(false)}
              style={{ cursor: "pointer" }}
            />
            <PaginationButton>
              <ArrowButton onClick={() => setCurrentPage(currentPage - 3)} disabled={currentPage === 0}>
                <BsChevronLeft size="16px" color="#66717F" />
              </ArrowButton>

              <ArrowButton>
                <BsChevronRight
                  size="16px"
                  color="#66717F"
                  onClick={() => setCurrentPage(currentPage + 3)}
                />
              </ArrowButton>
            </PaginationButton>
          </ActionButtons>
        </Header>

        {clinicTypes.map((type: any) => {
          const data = type.data.reverse()
          const firstCard = data[currentPage]
          const secondCard = data[currentPage + 1]
          const thirdCard = data[currentPage + 2]

          return (
            <div style={{ display: "flex", marginBottom: "16px" }}>
              <TypeNameContainer>
                <Name>{type.name}</Name>
              </TypeNameContainer>

              <RegisterContainerWrapper>
                <RegisterContainer withoutRegister={!firstCard?.createdAt}>
                  <Date>{firstCard?.createdAt && formatDate(firstCard?.createdAt)}</Date>
                  <Register>
                    {firstCard?.data || `Não existe registro de ${type.name} para o último atendimento`}
                  </Register>
                </RegisterContainer>

                <RegisterContainer withoutRegister={!secondCard?.createdAt} style={{ margin: "0 16px" }}>
                  <Date>{secondCard?.createdAt && formatDate(secondCard?.createdAt)}</Date>
                  <Register>
                    {secondCard?.data || `Não existe registro de ${type.name} para o último atendimento`}
                  </Register>
                </RegisterContainer>

                <RegisterContainer withoutRegister={!thirdCard?.createdAt}>
                  <Date>{thirdCard?.createdAt && formatDate(thirdCard?.createdAt)}</Date>
                  <Register>
                    {thirdCard?.data || `Não existe registro de ${type.name} para o último atendimento`}
                  </Register>
                </RegisterContainer>
              </RegisterContainerWrapper>
            </div>
          )
        })}
      </Container>
    </BaseModal>
  )
}
