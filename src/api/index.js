import axios from 'axios'

const baseURL = import.meta.env.VITE_BASE_URL
const userKEY = import.meta.env.VITE_TOKEN_KEY

const instance = axios.create({ baseURL })

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    return response
  },
  function (error) {
    return error
  }
)

export const MovieAPI = {
  getMainList(page) {
    return instance
      .get(`/api/content/main/2/list?page=${page}&user=${userKEY}`)
      .then((response) => response)
      .catch((error) => error)
  },
  getDetailInfo(id) {
    return instance
      .get(`/api/content/main/2/show/${id}?user=${userKEY}`)
      .then((response) => response)
      .catch((error) => error)
  }
}
