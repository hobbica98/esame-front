import axios from 'axios'
import { Notify } from 'quasar'
import _ from 'lodash'
import { t } from './i18n'

export default async ({ Vue }) => {
  const masterAxios = axios.create({
    baseURL: process.env.API_URL,
    headers: {
      common: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.MASTER_KEY}`
      }
    }
  })
  masterAxios.interceptors.response.use(
    response => {
      return response
    },
    error => {
      const message = _.get(error, 'response.data.message')
      Notify.create({
        color: 'negative',
        message: message ? t(message) : 'error',
        icon: 'report_problem'
      })
      console.log({ error })

      return Promise.reject(error)
    }
  )
  Vue.prototype.$masterAxios = masterAxios
}
