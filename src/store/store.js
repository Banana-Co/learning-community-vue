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
		isLogin: false,
		username: '',
		avatarNum: 0,
	},
	getters: {
		getStateLogin(state) {
			return state.isLogin;
		},
		getStateUsername(state) {
			return state.username;
		},
		getStateavatarNum(state) {
			return state.avatarNum;
		},
	},
	mutations: {
		login(state) {
			state.isLogin = true
		},
		quit(state) {
			state.isLogin = false
		},
		changeAvatar(state) {
			state.avatarNum = state.avatarNum + 1
		},
	},
	actions: {
		login(context) {
			context.commit('login')
		},
		quit(context) {
			context.commit('quit')
		},
		changeAvatar(context) {
			context.commit('changeAvatar')
		},
	}
})
