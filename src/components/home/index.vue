<template>
	<center>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<center><span>你好!</span></center>
			</div>
			<div>
				<el-upload class="avatar-uploader" action="http://localhost:8000/uploadFile" :show-file-list="false" :on-success="handleAvatarSuccess"
				 :before-upload="beforeAvatarUpload">
					<img v-if="imageUrl" :src="imageUrl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</div>
			<div>
				<span><br />用户名:<br />{{name}}</span><br /><br />
				<span>注册日期:<br />{{time}}</span>
			</div>

			<br /><br /><br />
			<div>
				<el-button plain @click="ToChange">更改密码</el-button>
				<el-button plain @click="quit">注销</el-button>
				<el-button plain><el-upload class="avatar-uploader" action="http://localhost:8000/uploadFile" :show-file-list="false" :on-success="handleAvatarSuccess"
				 :before-upload="beforeAvatarUpload">修改头像</el-upload></el-button>
			</div>
			<div>
				<center>
					<el-button type=text @click="$router.back(-1)">返回</el-button>
				</center>
			</div>

		</el-card>
	</center>
</template>

<script>
	/*引入公共方法*/
	import {
		setCookie,
		getCookie,
		delCookie
	} from '../../assets/js/cookie.js'
	export default {
		data() {
			return {
				name: '',
				time: '',
				VueUserNameVo: {
					username: ''
				},
				imageUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
				file: '',
				url: '',
			}
		},
		mounted() {
			/*页面挂载获取保存的cookie值，渲染到页面上*/
			let uname = getCookie('username')
			this.name = uname
			/*如果cookie不存在，则跳转到登录页*/
			if (uname == "") {
				this.$router.replace('/')
			}
			this.$axios.get(`/getUser/${this.name}`).then((response) => {
				this.time = response.data.createdDate
				if(response.data.avatarUrl!=''){
					this.imageUrl=response.data.avatarUrl
				}
			})
		},
		methods: {
			ToMessage() {
				this.$router.push(
					'/messageFlow'
				)
			},
			ToChange() {
				this.$router.push(
					'/change'
				)
			},
			changeA() {
				this.$router.push(
					'/avatar'
				)
			},
			quit() {
				/*删除cookie*/
				delCookie('username')
				// localStorage.removeItem('Flag')
				// localStorage.removeItem('username')
				this.$router.replace('/login')
			},
			handleAvatarSuccess(res, file) {
				if (res.code === 200) {
					this.url = res.message
					this.imageUrl=this.url
					this.$axios.post('/uploadAvatar',{
								username: this.name,
								avatarUrl: this.url,
							}).then((response)=>{
					    console.log(response)
					})
				} else if (res.code === 300) {
					console.log("not exist")
				} else if (res.code === 400) {
					console.log("fail")
				}
				location.reload();
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				//const isPNG = file.type === 'image/png';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			}
		},
	}
</script>



<style>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}

	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.box-card {
		width: 360px;
	}

	.wrap {
		text-align: center;
	}




	span {
		cursor: pointer;
	}

	span:hover {
		color: #41b883;
	}
</style>
