<template>
	<div id="header" class="header">
		<el-row type="flex" align="middle">
			<el-col :span="4">
				<el-button type="text" @click="ToForum">
					<!-- <img src="@/assets/logo2.png" alt="" @click="ToForum" height="40px"> -->
					<h1>论坛LOGO</h1><!-- 
					<h5>{{checkAvatar}}</h5>
					<h5>{{this.$store.state.avatarNum}}</h5> -->
				</el-button>
			</el-col>
			<el-col :span="7" :offset="6">
				<el-input placeholder="搜索" v-model="input" @keyup.enter.native="handleSearch" clearable>
					<i slot="prefix" class="el-input__icon el-icon-search"></i>
				</el-input>
			</el-col>
			<el-col :span="6" :offset="1">
				<el-button type="text" @click="ToIndex">
					<el-avatar :src="avatarUrl" :size="60"></el-avatar>
				</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				<el-menu-item index="1"><i class="el-icon-document"></i>
					<span slot="title">课程推荐</span></el-menu-item>
				<el-menu-item index="2"><i class="el-icon-document"></i>
					<span slot="title">刷题</span></el-menu-item>
				<el-menu-item index="3"><i class="el-icon-document"></i>
					<span slot="title">校园周边</span></el-menu-item>

			</el-menu>

		</el-row>
	</div>
</template>

<style>
	.header {
		margin-left: 120px;
		margin-right: 120px;
	}
</style>

<script>
	import {
		setCookie,
		getCookie,
		delCookie
	} from '../../assets/js/cookie.js'
	export default {
		name: 'BlogHeader',
		data() {
			return {
				input: '',
				select: '',
				activeIndex: '1',
				avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
				name: '',
			}
		},
		watch: {
			checkLogin(old, newd) {
				this.renderIt()
			},
			checkAvatar(old, newd) {
				this.renderIt()
			},
		},
		computed: {
			checkLogin() {
				return this.$store.state.isLogin;
			},
			checkAvatar(){
				return this.$store.state.avatarNum;
			}
		},
		created() {
			this.renderIt()
		},
		methods: {
			renderIt(){
				let uname = getCookie('username')
				this.name = uname
				if (this.name != '') {
					this.$axios.get(`/getUser/${this.name}`).then((response) => {
						this.time = response.data.createdDate
						if (response.data.avatarUrl != '') {
							this.avatarUrl = response.data.avatarUrl
						}
					})
				}else{
					this.avatarUrl='https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
				}
			},
			ToIndex() {
				if (this.name == '') {
					this.$router.push(
						'/login'
					)
				} else {
					this.$router.push(
						'/index'
					)
				}
			},
			ToForum() {
				this.$router.push({
					path: '/forum'
				})
			},
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
				this.$router.push({
					path: '/forum'
				})
			},
			handleSearch() {
				console.log(this.input)
				this.$router.push(`/search/${this.input}`)
				location.reload()
			}
		}
	}
</script>
