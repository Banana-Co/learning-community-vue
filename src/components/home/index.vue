<template>
	<div>
		<el-col :span="2">
		</el-col>
		<el-col :span="7" :offset='2'>
			<el-card class="self-card">
				<div slot="header" class="clearfix">
					<center><span>你好!</span></center>
				</div>
				<div>

					<el-tooltip class="item" effect="dark" content="点击修改头像" placement="top">
						<el-upload class="avatar-uploader" action="http://localhost:8000/uploadFile" :show-file-list="false" :on-success="handleAvatarSuccess"
						 :before-upload="beforeAvatarUpload">
							<img v-if="imageUrl" :src="imageUrl" class="avatar">
						</el-upload>
					</el-tooltip>
				</div>
				<div>
					<span><br />用户名:<br />{{name}}</span><br /><br />
					<span>注册日期:<br />{{time}}</span>
				</div>

				<br /><br /><br />
				<div>
					<el-button plain @click="ToChange">更改密码</el-button>
					<el-button plain @click="ToMyPost">我的帖子</el-button>
					<el-button plain @click="quit">注销</el-button>
					<!-- <el-button plain><el-upload class="avatar-uploader" action="http://localhost:8000/uploadFile" :show-file-list="false" :on-success="handleAvatarSuccess"
					 :before-upload="beforeAvatarUpload">修改头像</el-upload></el-button> -->
				</div>
				<div>
					<center>
						<el-button type=text @click="$router.back(-1)">返回</el-button>
					</center>
				</div>

			</el-card>
		</el-col>

		<el-col :span="15">
			<el-row>
				<el-card class="box-card">
					<div>
						<el-table :data="this.notiData" style="width: 100%" max-height="250" ref="filterTable" :row-class-name="tableRowClassName">
							<el-table-column prop="username" label="通知" width="120">
							</el-table-column>
							<el-table-column prop="notifiDate" label="时间" width="120" :formatter="formatter">
							</el-table-column>
							<el-table-column prop="message" label="类型" :filter-method="filterType" :filters="[{ text: '点赞', value: 1 }, { text: '评论', value: 2 }]"
							 filter-placement="bottom-end">
							</el-table-column>
							<el-table-column fixed="right" label="操作" width="120">
								<template slot-scope="scope">
									<el-button @click.native.prevent="deleteRow(scope.$index, notiData)" type="text" size="small">
										已读
									</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</el-card>
			</el-row>

			<el-row>
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<center><span>我的帖子</span></center>
					</div>
					<div>
					</div>
				</el-card>
			</el-row>
		</el-col>


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
				notiData: [],
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
				this.notiData = response.data.notifications
				console.log(this.notiData)
				this.time = response.data.createdDate
				if (response.data.avatarUrl != '') {
					this.imageUrl = response.data.avatarUrl
				}

			})
		},
		methods: {
			tableRowClassName({
				row,
				rowIndex
			}) {
				if (row.read === 0) {
					return 'unRead-row';
				} else if (row.read === 1) {
					return '';
				}
				return '';
			},
			formatter(row, column) {
				return dateFormat(row.notifiDate);
			},
			clearFilter() {
				this.$refs.filterTable.clearFilter();
			},
			deleteRow(index, rows) {
				//console.log(index);
				//rows.splice(index, 1);
				this.$axios.get('readNotifi', {
						params: {
							username: this.name,
							notiNo: index,
						}
					}).then(response => {
						//console.log(response.data.code);
						if (response.data.code == 200) {
							console.log('success');
						} else {
							console.log(response);
						}
					})
					.catch(function(error) {
						console.log(error);
					})
			},
			filterType(value, row) {
				return row.type === value;
			},
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
				this.$router.replace('/login')
			},
			handleAvatarSuccess(res, file) {
				if (res.code === 200) {
					this.url = res.message
					this.imageUrl = this.url
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
	.el-table .unRead-row {
		background: oldlace;
	}

	.el-table .success-row {
		background: #f0f9eb;
	}

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

	.self-card {
		width: 360px;
		height: 500px;
	}

	.box-card {
		width: 800px;
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
