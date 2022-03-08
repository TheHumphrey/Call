import { useState } from 'react'

type TStatus = "empty" | "progress" | "finished"

type TDocumentTypes = "clinicalRecord" | "certificate" | "recipe"


export const useDocuments = () => {
  const [clinicalRecord, setClinicalRecord] = useState<TStatus>("empty")
  const [certificate, setCertificate] = useState<TStatus>("empty")
  const [recipe, setRecipe] = useState<TStatus>("empty")

  const setStatusToEmpty = (type: TDocumentTypes) => {
    switch (type) {
      case 'clinicalRecord':
        setClinicalRecord('empty')
        break
      case 'certificate':
        setCertificate('empty')
        break
      case 'recipe':
        setRecipe('empty')
        break
      default:
        console.error('Type not exist on useDocument')
    }
  }

  const setStatusToProgress = (type: TDocumentTypes) => {
    switch (type) {
      case 'clinicalRecord':
        setClinicalRecord('progress')
        break
      case 'certificate':
        setCertificate('progress')
        break
      case 'recipe':
        setRecipe('progress')
        break
      default:
        console.error('Type not exist on useDocument')
    }
  }

  const setStatusToFinished = (type: TDocumentTypes) => {
    switch (type) {
      case 'clinicalRecord':
        setClinicalRecord('finished')
        break
      case 'certificate':
        setCertificate('finished')
        break
      case 'recipe':
        setRecipe('finished')
        break
      default:
        console.error('Type not exist on useDocument')
    }
  }

  return { clinicalRecord, certificate, recipe, setStatusToEmpty, setStatusToProgress, setStatusToFinished }
}
