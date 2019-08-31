import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		isLogin: false,
		username: '',
		avatarNum: 0,
		threadId:1,
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
		getStatethreadId(state) {
			return state.threadId;
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
		changethreadId(state,n) {
			state.threadId = n
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
		changethreadId(context,n) {
			context.commit('changethreadId',n)
		},
	}
})
