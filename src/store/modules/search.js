
import _ from 'lodash'
import Vue from 'vue'

const state = {}

const getters = {
  getSearch: function (state) {
    return _.values(state.search)
  }
}

const mutations = {
  addSearch: function (state, search) {
    Vue.set(state, 'search', search)
  }
}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}
