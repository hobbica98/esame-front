
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// import example from './module-example'

import userData from './modules/userData'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

const store = new Vuex.Store({
  modules: {
    userData
  },
  plugins: [
    createPersistedState({
      key: 'odin',
      paths: [
        'userData.jwt',
        'userData.details'
      ]
    })
  ],

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV

})

export default store
