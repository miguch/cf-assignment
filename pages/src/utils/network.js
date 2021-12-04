import axios from "axios"
export default function useNetwork() {
  const service = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? "/" : "https://socials.miguch.workers.dev/",
  })
  service.interceptors.request.use((config) => {
    return config
  })
  service.interceptors.response.use((resp) => resp.data)
  return service
}
