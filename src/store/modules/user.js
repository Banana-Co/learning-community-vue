
const state = {
    isLogin: false
}

// getters
const getters = {
    isLogin: state => state.isLogin
}

//actions
const actions = {
    //从服务器端校验本地登录 Cookie 有效性
    setUser ({commit}, flag) {
      commit('userStatus', flag)
    }
}


// mutations
const mutations = {
    userStatus (state, flag) {
      state.isLogin = flag
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
