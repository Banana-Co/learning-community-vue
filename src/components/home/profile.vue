<template>
	<div>
		<el-row>
			<el-col :span="7" :offset='2'>
				<el-card class="pro-card">
					<div align="center">
<!--						<el-tooltip class="item" effect="dark" content="点击修改头像" placement="top">-->
<!--							<el-upload class="avatar-uploader" action="http://localhost:8000/uploadFile" :show-file-list="false" :on-success="handleAvatarSuccess"-->
<!--							 :before-upload="beforeAvatarUpload">-->
								<img v-if="this.user.avatarUrl" :src="this.user.avatarUrl" class="avatar">
<!--							</el-upload>-->
<!--						</el-tooltip>-->
					</div>
          <br/>
					<div ><br/>
						<span>用户名 : {{this.user.username}}</span><br /><br />
						<span>声望 : {{this.user.prestige}}</span><br /><br />
<!--						<span>注册邮箱 : {{this.user.emailAddress}}</span><br /><br />-->
						<span>注册日期 : {{formattedDate}}</span>
					</div>

					<br /><br />
					<div>
<!--						<el-button plain @click="ToChange">修改密码</el-button>-->
						<!-- <el-button plain @click="ToMyPost">我的帖子</el-button> -->
<!--						<el-button plain @click="quit">注销</el-button>-->
						<!-- <el-button plain><el-upload class="avatar-uploader" action="http://localhost:8000/uploadFile" :show-file-list="false" :on-success="handleAvatarSuccess"
					 :before-upload="beforeAvatarUpload">修改头像</el-upload></el-button> -->
					</div>
					<!-- <div>
					<center>
						<el-button type=text @click="$router.back(-1)">返回</el-button>
					</center>
				</div> -->

				</el-card>
			</el-col>

			<el-col :span="15">
				<el-row>
					<my-simple-post :post="posts" :other='other'></my-simple-post>
				</el-row>
			</el-col>
		</el-row>
		<br />

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
	import MySimplePost from "./mySimplePost";
	export default {
		components: {
			MySimplePost,
		},
		data() {
			return {
				posts: [],
				user: '',
				reports: [],
				other:true,
			}
		},
		computed: {
			formattedDate() {
				return dateFormat(this.user.createdDate);
			}
		},
		created() {
		    if (this.$route.params.username == getCookie('username'))
		        this.$router.push('/index');

			  this.$axios.get(`/getUser/${this.$route.params.username}`).then((response) => {
			      this.user = response.data
			  })
			this.getLatestPosts(this.$route.params.username)
		},
		methods: {
			ToMyPost() {
				this.$router.push(
					'/myPost'
				)
			},
			getLatestPosts(username) {
				this.$axios
					.get(`findLatestPostsByAuthor`, {
						params: {
							author: username
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

	.pro-card {
		width: 400px;
		height: 400px;
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
