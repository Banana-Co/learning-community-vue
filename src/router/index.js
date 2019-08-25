import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'
//import MessageFlow from '@/components/message/MessageFlow'
//import MessageDetail from '@/components/message/MessageDetail'
//import MessageBrief from '@/components/message/MessageBrief'
//懒加载
const login = () => import('@/components/manage/login.vue')
const index = () => import('@/components/home/index.vue')
const register = () => import('@/components/manage/register.vue')
const main = () => import('@/components/main/Main.vue')
const change = () => import('@/components/manage/change.vue')
const forum = () => import('@/components/forum.vue')
const content = () => import('@/components/common/content.vue')
Vue.use(Router)

const routes = [{
		path: '/',
		redirect: '/login',
		meta: {
			isLogin: false
		},
		//redirect: '/forum'
	},
	{
		path: '/content',
		name: 'content',
		component: content,
		meta: {
			isLogin: true
		},
	},
	{
		path: '/forum',
		name: 'forum',
		component: forum,
		meta: {
			isLogin: true
		},
	},
	// {
	//   path: '/messageFlow',
	//   name: 'MessageFlow',
	//   component: MessageFlow
	// },
	// {
	//   path: '/messageDetail/:id',
	//   name: MessageDetail,
	//   component: MessageDetail
	// },
	// {
	//   path: '/messageBrief/:id',
	//   name: MessageBrief,
	//   component: MessageBrief
	// },
	{
		path: '/index',
		name: 'index',
		component: index,
		meta: {
			isLogin: true
		},
	},
	{
		path: '/login',
		name: 'login',
		component: login,
		meta: {
			isLogin: false
		},
	},
	{
		path: '/register',
		name: 'register',
		component: register,
		meta: {
			isLogin: false
		},
	},
	{
		path: '/main',
		name: 'main',
		component: main,
		meta: {
			isLogin: true
		},
	},
	{
		path: '/change',
		name: 'change',
		component: change,
		meta: {
			isLogin: true
		},
	},
];
const router = new Router({
	routes
});
export default router;

// router.beforeEach((to, from, next) => {
// 	let getFlag = localStorage.getItem('Flag') /* 这里是判断用户是否登录过，因为在用户登录后会在localStroage内存储Flag=isLogin */
// 	if (getFlag === 'isLogin') { /* 如果存在Flag并且为isLogin意味着用户登录，这时修改vux内state下isLogin的状态 */
// 		store.state.isLogin = true
// 		console.log(localStorage.getItem('username'))
// 		next()
// 		if (!to.meta.isLogin) { /* 如果在有登录状态的情况下前往不需要权限的路由路径，则判定为退出登录，进行提示并跳转登录页 */
// 			//Toast.info('退出成功')
// 			next({
// 				path: '/Login'
// 			})
// 		}
// 	} else {
// 		if (to.meta.isLogin) { /* 如果没有登录状态且要去往需要权限的路径时跳转登录页并进行提示 */
// 			next({
// 				path: '/Login'
// 			})
// 			//Toast.info('请先登录')
// 		} else {
// 			next()
// 		}
// 	}
// })
// 
// router.afterEach(route => {
// 	window.scroll(0, 0)
// })
