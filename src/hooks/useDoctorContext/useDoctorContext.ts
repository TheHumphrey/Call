import { useContext } from 'react'
import { DoctorContext } from 'components'

export const useDoctorContext = () => {
  const context = useContext(DoctorContext)
  if (!context) {
    throw new Error('useDoctorContext must be used within a DoctorProvider')
  }
  return context
}
