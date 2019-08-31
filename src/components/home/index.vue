<template>
	<div>
		<div class="selfNotiAndPost">
			<el-row type="flex" align="top">
				<el-card class="self-card">
					<div slot="header" class="clearfix">
						<center><span>你好!</span></center>
					</div>
					<div>

						<el-tooltip class="item" effect="dark" content="点击修改头像" placement="top">
							<el-upload class="avatar-uploader" action="http://localhost:8000/uploadFile" :show-file-list="false" :on-success="handleAvatarSuccess"
							 :before-upload="beforeAvatarUpload">
								<img v-if="this.user.avatarUrl" :src="this.user.avatarUrl" class="avatar">
							</el-upload>
						</el-tooltip>
					</div>
					<div><br />
						<span>用户名 : {{this.user.username}}</span><br /><br />
						<span>声望 : {{this.user.prestige}}</span><br /><br />
						<span>注册邮箱 : {{this.user.emailAddress}}</span><br /><br />
						<span>注册日期 : {{formattedDate}}</span>

					</div>

					<br /><br />
					<div>
						<el-button plain @click="ToChange">修改密码</el-button>
						<!-- <el-button plain @click="ToMyPost">我的帖子</el-button> -->
						<el-button plain @click="quit">注销</el-button>
						<!-- <el-button plain><el-upload class="avatar-uploader" action="http://localhost:8000/uploadFile" :show-file-list="false" :on-success="handleAvatarSuccess"
					 :before-upload="beforeAvatarUpload">修改头像</el-upload></el-button> -->
					</div>
					<!-- <div>
					<center>
						<el-button type=text @click="$router.back(-1)">返回</el-button>
					</center>
				</div> -->
				</el-card>
				<div class="notiAndPost">
					<notification :notiData='this.user.notifications' :name='this.user.username'></notification>
					<my-simple-post :post="posts"></my-simple-post>
				</div>
			</el-row>
		</div>
		
		<div class="muteAndReport">
			<el-row type="flex" align="top">
				<report :report='reports'></report>
				<muteUser :user='users'></muteUser>
			</el-row>
		</div>
	</div>
</template>

<script>
	/*引入公共方法*/
	import {
		setCookie,
		getCookie,
		delCookie
	} from '../../assets/js/cookie.js'
	import {
		dateFormat
	} from "../../assets/js/time.js";
	import notification from "@/components/home/notification.vue";
	import MySimplePost from "./mySimplePost";
	import report from "./report";
	import muteUser from "./muteUser";
	export default {
		components: {
			MySimplePost,
			notification,
			report,
			muteUser,
		},
		data() {
			return {
				file: '',
				url: '',
				notiData: [],
				posts: [],
				read: '',
				user: '',
				reports: [],
				users: [],
				adm: false,
			}
		},
		computed: {
			formattedDate() {
				return dateFormat(this.user.createdDate);
			}
		},
		created() {
			/*页面挂载获取保存的cookie值，渲染到页面上*/
			let uname = getCookie('username')
			this.name = uname
			/*如果cookie不存在，则跳转到登录页*/
			if (uname == "") {
				this.$router.replace('/')
			}
			this.$axios.get(`/getUser/${this.name}`).then((response) => {
				this.user = response.data
				if (this.user.notiData == null) {
					this.user.notiData = []
				}
				if (this.user.permission >= 2) {
					this.adm = true
				}
			})
			this.$axios.get('getAllReports').then((res) => {
				this.reports = res.data || []
			})
			this.$axios.get('allMutedUser').then((res1) => {
				this.users = res1.data || []
			})
			this.getLatestPosts(this.name)
		},
		methods: {
			ToMessage() {
				this.$router.push(
					'/messageFlow'
				)
			},
			ToChange() {
				this.$router.push(
					'/changePassword'
				)
			},
			ToMyPost() {
				this.$router.push(
					'/myPost'
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
				this.$store.dispatch('quit')
				this.$router.replace('/login')
			},
			handleAvatarSuccess(res, file) {
				if (res.code === 200) {
					this.url = res.message
					this.user.avatarUrl = this.url
					this.$store.dispatch('changeAvatar')
					this.$axios.post('/uploadAvatar', {
						username: this.name,
						avatarUrl: this.url,
					}).then((response) => {
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
				const isPNG = file.type === 'image/png';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG && !isPNG) {
					this.$message.error('上传头像图片只能是 JPG或PNG格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return (isPNG || isJPG) && isLt2M;
			},
			getLatestPosts() {
				this.$axios
					.get(`findLatestPostsByAuthor`, {
						params: {
							author: this.name
						}
					})
					.then(res => {
						this.posts = res.data || [];
					})
					.catch(function(err) {
						console.log(err)
					})

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
		object-fit: cover;
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

	.self-card {
		margin-top: 0px;
		min-width: 380px;
		height: 570px;
	}

	.selfNotiAndPost {
		width: 1210px;
		height: 570px;
		margin: 0 auto;
	}

	.notiAndPost {
		margin-left: 40px;
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
	.muteAndReport{
		width: 1210px;
		height: 340px;
		margin: 0 auto;
	}
</style>
