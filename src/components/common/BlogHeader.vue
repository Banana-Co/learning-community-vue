<template>
	<div id="header" class="header">
		<el-row type="flex" align="middle">
			<el-col :span="5">
				<el-button type="text" @click="ToForum">
					<h1><img src="@/assets/logo3.png" alt="" height="70px" title="前往论坛主页"></h1>
				</el-button>
			</el-col>
			<el-col :span="7">
				<el-input placeholder="搜索" v-model="input" @keyup.enter.native="handleSearch" clearable>
					<i slot="prefix" class="el-input__icon el-icon-search"></i>
				</el-input>
			</el-col>
			<el-col :span="2" :offset="9">

					<el-button type="text" @click="ToIndex" title="前往个人主页">
						<el-badge :value="notiNum" class="Badge" :max="99" :hidden='hidBadge'>
						<el-avatar :src="avatarUrl" :size="60"></el-avatar>
						</el-badge>
					</el-button>

			</el-col>
		</el-row>
		<el-divider class = "blogHeaderDivider"></el-divider>
	</div>
</template>

<style>
	.header {

		margin-left: 55px;
		margin-right: 55px;
	}
	.blogHeaderDivider {
    display: block;
    height: 2px;
	width : 95.5%;
    margin-bottom: 50px;
	margin-left: 40px;
	margin-right: 40px;
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
				notiNum:0,
				hidBadge:true,
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
			checkAvatar() {
				return this.$store.state.avatarNum;
			}
		},
		created() {
			this.renderIt()
		},
		methods: {
			renderIt() {
				let uname = getCookie('username')
				this.name = uname
				if (this.name != '') {
					this.$axios.get(`/getUser/${this.name}`).then((response) => {
						this.time = response.data.createdDate
						this.notiNum=response.data.unreadNotification
						if(this.notiNum==0){
							this.hidBadge=true
						}else{
							this.hidBadge=false
						}
						if (response.data.avatarUrl != '') {
							this.avatarUrl = response.data.avatarUrl
						}
					})
				} else {
					this.avatarUrl = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
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
					path: '/outIndex'
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
