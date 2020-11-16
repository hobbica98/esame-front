import axios from 'axios'
import { Notify } from 'quasar'
import store from '../store'
import _ from 'lodash'

export default async ({ Vue }) => {
  axios.defaults.baseURL = process.env.API_URL
  axios.defaults.headers.common['Content-Type'] = 'application/json'
  axios.interceptors.request.use(
    conf => {
      conf.headers.common.Authorization =
        'Bearer ' + store.state.userData.jwt
      return conf
    },
    error => {
      return Promise.reject(error)
    }
  )
  axios.interceptors.response.use(
    response => {
      return response
    },
    error => {
      const message = _.get(error, 'response.data.message')
      Notify.create({
        color: 'negative',
        message: message || 'error',
        icon: 'report_problem'
      })
      console.log(error)

      return Promise.reject(error)
    }
  )
  Vue.prototype.$axios = axios
}
