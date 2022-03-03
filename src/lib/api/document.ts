import { initAxios } from './axiosApiWrapper'

const DOCUMENT_API = process.env.REACT_APP_DOCUMENT_API as string

export const documentApi = (token: string) => initAxios(DOCUMENT_API, token)
