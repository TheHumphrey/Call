import { useContext } from 'react'
import { PatientContext } from 'components'

export const usePatientContext = () => {
  const context = useContext(PatientContext)
  if (!context) {
    throw new Error('usePatientContext must be used within a PatientProvider')
  }
  return context
}