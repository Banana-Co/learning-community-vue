import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import MessageFlow from '@/components/message/MessageFlow'
import MessageDetail from '@/components/message/MessageDetail'
import MessageBrief from '@/components/message/MessageBrief'
import login from '@/components/manage/login.vue'
import index from '@/components/home/index.vue'
import register from '@/components/manage/register.vue'
import main from '@/components/main/Main.vue'
import change from '@/components/manage/change.vue'
import forum from '@/components/forum.vue'
import content from '@/components/common/content.vue'
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
	{
	  path: '/messageFlow',
	  name: 'MessageFlow',
	  component: MessageFlow
	},
	{
	  path: '/messageDetail/:id',
	  name: MessageDetail,
	  component: MessageDetail
	},
	{
	  path: '/messageBrief/:id',
	  name: MessageBrief,
	  component: MessageBrief
	},
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
