import React, { createContext, useState } from 'react'

type TPatientProviderContext = {
  username: string;
  setUsername: (value: string) => void;
  tenant: string;
  setTenant: (value: string) => void;
  onChangeUsername: (value: string) => void;
}

export const PatientContext = createContext<TPatientProviderContext>(null!)

export const PatientProvider: React.FC = ({ children }) => {
  const [username, setUsername] = useState('')
  const [tenant, setTenant] = useState('')

  const onChangeUsername = (value: string) => setUsername(value)

  return (
    <PatientContext.Provider
      value={{
        username,
        setUsername,
        tenant,
        setTenant,
        onChangeUsername,
      }}
    >
      {children}
    </PatientContext.Provider>
  )
}
