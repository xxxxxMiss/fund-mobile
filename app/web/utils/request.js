const axios = require('axios')
const { getCookie } = require('./cookie')
// import { message } from 'antd'

const request = (module.exports = function request(config) {
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
    const { code, data, message: msg } = res.data
    if (config.fullRes) {
      return res
    }
    if (code != 200) {
      // message.error(msg)

      return null
    }
    return data
  })

  return instance.request({ ...CONFIG, ...config })
})

module.exports.get = (url, config) => {
  return request({
    url,
    method: 'GET',
    ...config,
  })
}

module.exports.post = (url, data, config) => {
  return request({
    url,
    data,
    method: 'POST',
    ...config,
  })
}
