import { ButtonsContainer } from "./style"
import { useState, useEffect } from "react"

import { BaseButton } from 'components'

interface Props {
  getModelsByType: any,
  setTypeDocumentSelected: any,
}

export const FormTypeButtons = ({ getModelsByType, setTypeDocumentSelected }: Props) => {
  const [isSelected, setIsSelected] = useState("prescription")

  function handleClick(value: any) {
    setIsSelected(value)
    setTypeDocumentSelected(value)
    getModelsByType({ value: value })
  }

  useEffect(() => {
    getModelsByType({ value: "prescription" })
  }, [])

  return (
    <>
      <ButtonsContainer>
        <BaseButton
          customType="primary"
          value="prescription"
          isSelected={isSelected}
          onClick={(event: any) => handleClick(event.target.value)}
        >
          Prescrição
        </BaseButton>

        <BaseButton
          customType="primary"
          value="recipe"
          isSelected={isSelected}
          onClick={(event: any) => handleClick(event.target.value)}
        >
          Receita
        </BaseButton>

        {/* <BaseButton
          customType="primary"
          value="exam"
          isSelected={isSelected}
          onClick={(event: any) => handleClick(event.target.value)}
        >
          Exame
        </BaseButton> */}
        <BaseButton
          customType="primary"
          value="medicalCertificate"
          isSelected={isSelected}
          onClick={(event: any) => handleClick(event.target.value)}
        >
          Atestado
        </BaseButton>
        {/* <BaseButton
          customType="primary"
          value="medicalReferral"
          isSelected={isSelected}
          onClick={(event: any) => handleClick(event.target.value)}
        >
          Encaminhamento
        </BaseButton>
        <BaseButton
          customType="primary"
          value="orientation"
          isSelected={isSelected}
          onClick={(event: any) => handleClick(event.target.value)}
        >
          Orientações
        </BaseButton> */}
      </ButtonsContainer>
    </>
  )
}
