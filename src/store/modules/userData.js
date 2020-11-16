import axios from 'axios'
import Vue from 'vue'
import _ from 'lodash'
import { Notify } from 'quasar'
const state = {
  jwt: null,
  details: null,
  // lo stato conterrà sotto-oggetti navigationInfo per ogni pagina lista quindi es.
  // navigationInfo.userList, navigationInfo.ticketList ecc.
  navigationInfo: null
}

const getters = {
  isAuthenticated (state) {
    return state.jwt !== null
  },
  token: function (state) {
    return state.jwt
  },
  currentUser: function (state) {
    return state.details
  },
  navigationInfo: function (state) {
    return state.navigationInfo
  },

  navigationInfoByItem: function (state, itemName) {
    const defaultNavigationInfo = {
      sortBy: undefined,
      descending: undefined,
      page: 1,
      rowsPerPage: 25,
      q: undefined
    }
    const result = _.get(state.navigationInfo, itemName, {
      ...defaultNavigationInfo
    })
    return result
  }
}

const mutations = {
  authUser (state, userInfo) {
    Vue.set(state, 'jwt', userInfo.token)
    Vue.set(state, 'details', userInfo.user)
  },
  setCurrentUser: function (state, newUserInfo) {
    Vue.set(state, 'details', newUserInfo)
  },
  clearUserData: function (state) {
    Vue.set(state, 'jwt', null)
    Vue.set(state, 'details', null)
    Vue.set(state, 'navigationInfo', null)
  },
  setNavigationData: function (state, newNavigationObj) {
    Vue.set(state, 'navigationInfo', newNavigationObj)
  }
}

const actions = {
  login: async function ({ commit }, { email, password }) {
    try {
      const { data: userData } = await axios({
        url: '/auth',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + btoa(email + ':' + password)
        }
      })
      console.log('login User DATA:')
      console.log(userData)
      commit('authUser', { token: userData.token, user: userData.user })
      return Promise.resolve(userData.user)
    } catch (e) {
      return Promise.reject()
      // console.log(e);
    }
  },
  updateCurrentUser: async function ({ commit }, user) {
    try {
      const { data: updatedUser } = await axios.put(`/users/${user._id}`, user)
      commit('setCurrentUser', updatedUser)
      Notify.create({
        message: 'Profilo aggiornato con successo!'
      })
    } catch (e) {
      console.log(e)
    }
  },
  updateNavigation: function ({ commit }, navigationData) {
    /* usage:
     - in q-table props: @update:pagination="catchRequest"
     - in methods:
        catchRequest: function(requestProp) {
            let newNavigationData = { ...this.getNavigationInfo };
            newNavigationData[`${this.name}`] = { ...requestProp };
            this.updateNavigation(newNavigationData);
        },
     - now table state in `${this.name}` page has been persisted
     - on mounted:
        const emptyNavigationInfo = {
            sortBy: undefined,
            descending: undefined,
            page: undefined,
            rowsPerPage: undefined,
            q: undefined
          };
          this.pagination = _.get(this.getNavigationInfo, "`${this.name}`", {
            ...emptyNavigationInfo
        });
    */
    commit('setNavigationData', navigationData)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
