import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'
//import MessageFlow from '@/components/message/MessageFlow'
//import MessageDetail from '@/components/message/MessageDetail'
//import MessageBrief from '@/components/message/MessageBrief'
//懒加载
const login = () => import ( '@/components/manage/login.vue')
const index = () => import ('@/components/home/index.vue')
const register = () => import ( '@/components/manage/register.vue')
const main = () => import ( '@/components/main/Main.vue')
const change = () => import ( '@/components/manage/change.vue')
const forum = () => import ('@/components/forum.vue')
const content = () => import ('@/components/common/content.vue')
Vue.use(Router)

const routes=[
	{
	  path: '/',
	  redirect: '/login'
		//redirect: '/forum'
	},
	{
	  path: '/content',
	  name: 'content',
	  component: content
	},
	{
	  path: '/forum',
	  name: 'forum',
	  component: forum
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
	  component: index
	},
	{
	  path: '/login',
	  name: 'login',
	  component: login
	},
		{
		  path: '/register',
		  name: 'register',
		  component: register
		  },
	{
	  path: '/main',
	  name: 'main',
	  component: main
	},
	{
	  path: '/change',
	  name: 'change',
	  component: change
	},
];
export default new Router({
  routes
})
