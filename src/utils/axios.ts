import { initAxios } from 'lib/api/axiosApiWrapper'

const ATTENDANCE_API = process.env.REACT_APP_ATTENDANCES_API as string

export const attendanceApi = (token: string) => initAxios(ATTENDANCE_API, token)

const CLINIC_API = process.env.REACT_APP_CLINIC_API as string

export const clinicApi = (token: string) => initAxios(CLINIC_API, token)