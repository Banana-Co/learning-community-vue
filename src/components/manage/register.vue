<template>
	<div class="wrap">
		<div class="grid-content"><br /><br /><br /><br /><br /><br /><br /></div>
		<center>
			<el-card class="register-card">
					<el-input type="text" v-model="loginInfoVo.username" placeholder="请输入用户名"></el-input>
				
					<el-input type="password" v-model="loginInfoVo.password" placeholder="请输入6~20位密码"></el-input>
				
					<el-input type="text" v-model="loginInfoVo.emailAddress" placeholder="请输入邮箱" :disabled="inputed"></el-input>
				
				<el-row type="flex" align="top">
						<el-input type="text" v-model="loginInfoVo.code" placeholder="请输入验证码"> </el-input>
					
						<el-button type="primary" @click='sendPin' name='codeButton' :disabled="inputed" class="bottomControl"><span v-if="inputed">{{this.auth_time}}</span>
							<span v-else>获取验证码</span> </el-button>
					
				</el-row>
					<el-button type="primary" v-on:click="register">注册</el-button>
					<div>
						<span v-on:click="ToLogin">已有账号？马上登录</span><br />
					</div>

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
							this.$notify.error({
								title: '错误',
								message: '邮箱不合法'
							});
						} else if (response.data.code == 306) {
							this.$notify.error({
								title: '错误',
								message: '邮箱已被注册'
							});
						} else if (response.data.code == 200) {

							this.code = response.data.message
							this.emailAddress = this.loginInfoVo.emailAddress
							this.inputed = true
							this.$notify({
								title: '成功',
								message: '验证码已发送',
								type: 'success'
							});
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
					this.$notify.error({
						title: '错误',
						message: '验证码有误或已过期'
					});
				} else if (this.loginInfoVo.emailAddress == '') {
					this.$notify.error({
						title: '错误',
						message: '请输入邮箱'
					});
				} else if (this.inputed == false) {
					this.$notify.error({
						title: '提示',
						message: '请重新获取验证码'
					});
				} else {
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
								this.$store.dispatch('login')
								this.$notify({
									title: '成功',
									message: '注册成功！',
									type: 'success'
								});
								this.$router.replace('content/5d6a2a46b1a29323a0caf9fb')
							} else if (successResponse.data.code === 201) {
								this.$notify.error({
									title: '错误',
									message: '该用户已存在'
								});
							} else if (successResponse.data.code === 400) {
								this.$notify.error({
									title: '错误',
									message: '输入不合法'
								});
							} else if (successResponse.data.code === 402) {
								this.$notify.error({
									title: '错误',
									message: '输入不合法'
								});
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
		margin-bottom: 10px;
		outline: none;
		border: 1px solid #888;
		padding: 10px;
		box-sizing: border-box;
	}
	.bottomControl{
		height: 40px;
		margin-left: 20px;
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
