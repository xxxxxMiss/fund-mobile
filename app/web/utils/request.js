import axios from 'axios'
import { Toast } from 'antd-mobile'
import { isBrowser } from 'umi'

export default function request(config) {
  const isServer = typeof window === 'undefined'
  const CONFIG = {
    baseURL: isServer ? process.env.ssrAxiosBaseURL : process.env.axiosBaseURL,
  }
  if (process.env.NODE_ENV != 'production') {
    CONFIG.baseURL = process.env.axiosBaseURL
  }
  const instance = axios.create()

  instance.interceptors.request.use(cfg => {
    return cfg
  })

  instance.interceptors.response.use(res => {
    const { code, data, msg, message } = res.data
    if (config.fullRes) {
      return res
    }
    if (code != 200) {
      if (isBrowser()) Toast.fail(msg || message, 0.5)
      return null
    }
    return data
  })

  return instance.request({ ...CONFIG, ...config })
}

export const get = (url, config) => {
  return request({
    url,
    method: 'GET',
    ...config,
  })
}

export const post = (url, data, config) => {
  return request({
    url,
    data,
    method: 'POST',
    ...config,
  })
}
