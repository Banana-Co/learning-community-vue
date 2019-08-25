// import Vue from 'vue'
// import Vuex from 'vuex'
// import user from './modules/user'
// 
// Vue.use(Vuex)
// 
// //const debug = process.env.NODE_ENV !== 'production'
// 
// export default new Vuex.Store({
//     modules: {
//         user
//     },
//     //strict: debug,
//     //plugins:  []
// })
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false
  },
  getters: {
    isLogin: state => state.isLogin
  },
  mutations: {
    userStatus (state, flag) {
      state.isLogin = flag
    }
  },
  actions: {
    setUser ({commit}, flag) {
      commit('userStatus', flag)
    }
  }
})