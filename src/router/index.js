import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'
import SearchResult from "../components/common/SearchResult";
//懒加载
const login = () => import('@/components/manage/login.vue')
const index = () => import('@/components/home/index.vue')
const outIndex = () => import('@/components/home/outIndex.vue')
const register = () => import('@/components/manage/register.vue')
const main = () => import('@/components/main/Main.vue')
const changePassword = () => import('@/components/manage/changePassword.vue')
const forum = () => import('@/components/forum.vue')
const content = () => import('@/components/common/content.vue')
const myPost = () => import('@/components/home/myPost.vue')
const profile = () => import('@/components/home/profile.vue')
Vue.use(Router)

const routes = [{
		path: '/',
		redirect: '/outIndex',
		meta: {
			isLogin: false
		},
		//redirect: '/forum'
	},
	{
		path: '/outIndex',
		name: 'outIndex',
		component: outIndex,
		meta: {
			isLogin: false
		},
	},
	{
		path: '/myPost',
		name: 'myPost',
		component: myPost,
		meta: {
			isLogin: true
		},
	},
	{
		path: '/content/:id',
		name: 'content',
		component: content,
		meta: {
			isLogin: true
		},
	},
	{
		path: '/forum/:id',
		name: 'forum',
		component: forum,
		meta: {
			isLogin: true
		},
	},
	{
		path: '/index',
		name: 'index',
		component: index,
		meta: {
			isLogin: true
		},
	},
  {
    path: '/profile/:username',
    name: 'profile',
    component: profile,
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
		path: '/changePassword',
		name: 'changePassword',
		component: changePassword,
		meta: {
			isLogin: true
		},
	},
  {
    path: '/search/:keyword',
    name: 'SearchResult',
    component: SearchResult
  }
];
const router = new Router({
	routes
});
export default router;

