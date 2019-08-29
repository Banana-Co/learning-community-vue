<template>
	<div class="wrap">
		<div class="grid-content"><br /><br /><br /><br /><br /><br /><br /></div>
		<center>
			<el-card class="register-card">
				
				<el-row><p v-show="showTishi" class="tishiText">{{tishi}}</p></el-row>
				<el-row><el-input type="text" v-model="loginInfoVo.username" placeholder="请输入用户名"></el-input></el-row>
				<el-row><el-input type="password" v-model="loginInfoVo.password" placeholder="请输入6~20位密码"></el-input></el-row>
				<el-row :gutter="10">
					<el-col :span="16">
						<el-input type="text" v-model="loginInfoVo.emailAddress" placeholder="请输入邮箱"></el-input>
					</el-col>
					<el-col :span="8" >
						<el-button type="primary" @click='sendPin' name='codeButton'>获取验证码</el-button>
					</el-col>
				</el-row>
				<el-row>
				<el-input type="text" v-model="loginInfoVo.code" placeholder="请输入验证码"> </el-input>
				</el-row>
				<el-row><el-button type="primary" v-on:click="register">注册</el-button></el-row>
				<el-row><div>
					<span v-on:click="ToLogin">已有账号？马上登录</span><br />
				</div></el-row>
				
			</el-card>
		</center>

	</div>
</template>

<script>
	import {
		setCookie,
		getCookie
	} from '../../assets/js/cookie.js'
	export default {
		data() {
			return {
				loginInfoVo: {
					username: '',
					password: ''
				},
				responseResult: [],
				showTishi: false,
				tishi: '',
			}
		},
		mounted() {
			/*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
			if (getCookie('username')) {
				this.$router.push(
					'/forum'
				)
			}
		},
		methods: {
			ToMain() {
				this.$router.push(
					'/main'
				)
			},
			ToLogin() {
				this.$router.replace({
					path: '/login'
				})
			},
			sendPin(){
				this.$axios.get('sendPin',this.loginInfoVo.emailAddress)
				.then((response) => {
					console.log(response)
				}).catch(function(error) {
						console.log(error);
					})
			},
			register() {
				this.$axios
					.post('register', {
						username: this.loginInfoVo.username,
						password: this.loginInfoVo.password
					})
					.then(successResponse => {
						this.responseResult = JSON.stringify(successResponse.data)
						if (successResponse.data.code === 200) {
							setCookie('username', this.loginInfoVo.username, 1000 * 60)
							// this.$store.dispatch('setUser', true)
							// localStorage.setItem('Flag', 'isLogin')
							// localStorage.setItem('username', userName)
							this.$router.push('/forum')
						} else if (successResponse.data.code === 201) {
							this.tishi = "该用户已存在"
							this.showTishi = true
						} else if (successResponse.data.code === 400) {
							this.tishi = "输入不合法"
							this.showTishi = true
						} else if (successResponse.data.code === 402) {
							this.tishi = "输入不合法"
							this.showTishi = true
						}
					})
					.catch(failResponse => {})
			}
		}
	}
</script>

<style>
	.wrap {
		text-align: center;
	}

	
	
	.register-card {
		width: 400px;
	}
	input{
		display: block;
		width: 250px;
		height: 40px;
		line-height: 40px;
		margin-top: 10px;
		outline: none;
		border: 1px solid #888;
		padding: 10px;
		box-sizing: border-box;
	}
	.tishiText {
		color: red;
	}

	span {
		cursor: pointer;
	}

	span:hover {
		color: #41b883;
	}
</style>
