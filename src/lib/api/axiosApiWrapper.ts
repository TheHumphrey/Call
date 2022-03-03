import axios, { AxiosInstance } from "axios"

export const initAxios = (moduleUrl: string, token: string): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: `${moduleUrl}api/`
  });

  axiosInstance.interceptors.request.use((config: any) => {
    if (token) {
      config.headers["x-access-token"] = token;
    }
    return config;
  });

  return axiosInstance;
}