<template>
	<div class="wrap">
		<div class="grid-content"><br /><br /><br /><br /><br /><br /><br /></div>
		<center>
			<el-card class="register-card">

				<el-row>
					<span><p v-show="showTishi" class="tishiText" >{{tishi}}</p><p v-show="inputed" class="tishiText" >{{this.auth_time}}秒之后重新发送验证码</p></span>
				</el-row>
				<el-row>
					<el-input type="text" v-model="loginInfoVo.username" placeholder="请输入用户名"></el-input>
				</el-row>
				<el-row>
					<el-input type="password" v-model="loginInfoVo.password" placeholder="请输入6~20位密码"></el-input>
				</el-row>
				<el-row>
					<el-input type="text" v-model="loginInfoVo.emailAddress" placeholder="请输入邮箱" :disabled="inputed"></el-input>
				</el-row>
				<el-row :gutter="10">
					<el-col :span="16">
						<el-input type="text" v-model="loginInfoVo.code" placeholder="请输入验证码"> </el-input>
					</el-col>
					<el-col :span="8">
						<el-button type="primary" @click='sendPin' name='codeButton' :disabled="inputed">获取验证码</el-button>
					</el-col>
				</el-row>
				<el-row>
					<el-button type="primary" v-on:click="register">注册</el-button>
				</el-row>
				<el-row>
					<div>
						<span v-on:click="ToLogin">已有账号？马上登录</span><br />
					</div>
				</el-row>

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
					password: '',
					emailAddress: '',
					code: '',
				},
				responseResult: [],
				showTishi: false,
				tishi: '',
				code: '',
				emailAddress: '',
				inputed: false,
				auth_time: '',
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
			sendPin() {
				this.$axios.get('sendPin', {
						params: {
							emailAddress: this.loginInfoVo.emailAddress,
						}
					})
					.then((response) => {
						if (response.data.code == 305) {
							this.tishi = "邮箱不合法"
							this.showTishi = true
						} else if (response.data.code == 306) {
							this.tishi = "邮箱已被注册"
							this.showTishi = true
						} else if (response.data.code == 200) {
							
							this.code = response.data.message
							this.emailAddress = this.loginInfoVo.emailAddress
							this.inputed = true
							this.showTishi = false
							console.log(this.emailAddress)
							this.auth_time = 60;
							var auth_timetimer = setInterval(() => {
								this.auth_time--;
								if (this.auth_time <= 0) {
									this.inputed = false;
									clearInterval(auth_timetimer);
								}
							}, 1000);

						}
					}).catch(function(error) {
						console.log(error);
					})
			},
			register() {
				if (this.code != this.loginInfoVo.code) {
					this.tishi = "验证码不正确"
					this.showTishi = true
				}else if(this.inputed==false){
					this.tishi = "请获取验证码"
					this.showTishi = true
				}else {
					this.$axios
						.post('register', {
							username: this.loginInfoVo.username,
							password: this.loginInfoVo.password,
							emailAddress: this.emailAddress,
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
	}
</script>

<style>
	.wrap {
		text-align: center;
	}



	.register-card {
		width: 400px;
	}

	input {
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
