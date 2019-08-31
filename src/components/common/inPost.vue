<template>
	<div class="inPost">
		<el-card>
			<el-row>
				<el-col :span="4">
					<el-row>
						<div class="inPostAvatar">
						<el-avatar :src="this.author.avatarUrl" :size="60" @click.native="handleClickAvatar"></el-avatar>
						</div>
					</el-row>
					<el-row><span>{{this.con.author}}</span></el-row>
					<el-row><span>用户组:{{this.group}}</span></el-row>
					<el-row><span>声望:{{this.author.prestige}}</span></el-row>
				</el-col>
				<el-col :span="20">
					<div class='floor'><span>#{{this.con.no}}</span></div>
					<div class="reply" v-if="isReply"><span>回复#{{this.con.fatherNo}}</span></div>
					<el-row>
						<div class="inner">
							<mavon-editor v-model="con.content" :subfield="false" :defaultOpen="defaultData" :toolbarsFlag="false"
							 :boxShadow="false" />
						</div>
					</el-row>
					<br />
					<el-row>
						<div class="but">
							<span>{{formattedDate}}</span>
							<el-button size="mini" v-if='showForbid' @click='forbid' :disabled="disForbid">禁言</el-button>
							<el-button size="mini" v-if='showDelete' @click='deleteComment'>删除</el-button>
							<el-button size="mini" v-if='showReport' @click='report' :disabled="disReport">举报</el-button>
							<el-button size="mini" @click="replyDialogVisible=true" :disabled="mute">回复</el-button>
							<el-button size="mini" @click="like" :icon="icon">{{this.con.likeNum}}</el-button>
						</div>
					</el-row>
					<reply-dialog :postId="this.$route.params.id" :visible.sync="replyDialogVisible" :author="name" :avatarUrl="avatarUrlm"
					 :floor='this.con.no'></reply-dialog>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>

<script>
	import {
		dateFormat
	} from "../../assets/js/time.js";
	import ReplyDialog from "../message/ReplyDialog";
	export default {
		name: "InPost",
		components: {
			ReplyDialog,
		},
		data() {
			return {
				replyDialogVisible: false,
				isReply: false,
				father: {
					name: '',
					content: '',
				},
				defaultData: "preview",
				isLiked: false,
				icon: 'el-icon-star-off',
				showForbid: false,
				showDelete: false,
				showReport: true,
				permission: 1,
				group: '',
				author: '',
				disForbid: false,
				disReport: false,
				mute: false,
			}
		},
		created() {
			this.$axios.get('getPermission', {
					params: {
						username: this.name,
					}
				})
				.then((response) => {
					this.permission = response.data;
					if (this.permission >= 2) {
						this.showForbid = true
						this.showDelete = true
					} else if (this.permission === 0) {
						this.mute = true
					}
					if (this.name == this.con.author) {
						this.showDelete = true
						this.showForbid = false
						this.showReport = false
					}
				}).catch(function(error) {
					console.log(error);
				})
			this.$axios.get(`/getUser/${this.con.author}`)
				.then((res) => {
					this.author = res.data
					if (this.author.permission == 0) {
						this.group = '小黑屋'
						this.disForbid = true
					} else if (this.author.permission == 1) {
						this.group = '普通用户'
					} else if (this.author.permission == 2) {
						this.group = '管理员'
					} else {
						this.group = '其它'
					}
				}).catch(function(error) {
					console.log(error);
				})

			if (this.con.fatherNo != 0 && this.con.fatherNo != -1) {
				this.isReply = true;
			}
			this.$axios.get('haveLiked', {
					params: {
						fatherId: this.con.fatherId,
						no: this.con.no,
						username: this.name,
					}
				}).then(response => {
					//console.log(response.data.code);
					if (response.data.code == 203) {
						this.icon = 'el-icon-star-off';
						this.isLiked = false;
					} else if (response.data.code == 202) {
						this.icon = 'el-icon-star-on';
						this.isLiked = true;
					} else {
						console.log(response);
					}
				})
				.catch(function(error) {
					console.log(error);
				})
		},
		computed: {
			formattedDate() {
				return dateFormat(this.con.createdDate);
			}
		},
		methods: { //   时间格式化
			report() {
				this.$axios.post('reportComment', {
						reportUsername: this.name,
						usernameReported: this.con.author,
						fatherId: this.con.fatherId,
						no: this.con.no
					})
					.then((res) => {
						this.$message({
							type: 'success',
							message: '举报成功!'
						});
					}).catch(function(error) {
						console.log(error)
					})
				this.disReport = true
			},
			deleteComment() {
				this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios
						.get('deleteComment', {
							params: {
								fatherId: this.con.fatherId,
								no: this.con.no,
								actionUsername:this.con.no
							}
						})
						.then(res => {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							location.reload()
						})
						.catch(failResponse => {})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				})
			},
			forbid() {
				this.$confirm('此操作将禁言该用户, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios.get('muteUser', {
							params: {
								username: this.con.author,
							}
						}).then(res => {
							if (res.data.code == 200) {
								this.$message({
									type: 'success',
									message: '禁言成功!'
								})
							} else {
								this.$message({
									type: 'info',
									message: res.data.message
								});
							}
						})
						.catch(failResponse => {})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消禁言'
					});
				})
			},
			like() {
				this.$axios.get('addLike', {
						params: {
							fatherId: this.con.fatherId,
							no: this.con.no,
							username: this.name,
						}

					}).then(res => {
						if (this.isLiked == true) {
							this.con.likeNum--;
							this.icon = 'el-icon-star-off';
							this.isLiked = false;
						} else {
							this.con.likeNum++;
							this.icon = 'el-icon-star-on';
							this.isLiked = true;
						}
						//console.log(res);
					})
					.catch(function(error) {
						console.log(error);
					})
			},
        handleClickAvatar() {
			    this.$emit('click-avatar', this.con.author)
        }
		},
		props: [
			'id',
			'con',
			'name',
			'avatarUrlm',
		]
	}
</script>

<style>
	.inPostAvatar{
		margin-top : 30px
	}
	
	.inPost {
		margin-left: auto;
		margin-right: auto;
	}

	.right {
		border-left: 1px solid black;
	}

	.inner {
		text-align: left;
		padding: 20px 20px 0 0;
	}

	.reply {
		text-align: left;
	}

	.but {
		line-height: 20px;
		font-size: 12px;
		text-align: right;
		vertical-align: bottom;
		position: absolute;
		right: 0px;
		bottom: 0px;
	}

	.floor {
		position: absolute;
		right: 0px;
		top: 0px;
	}

	.postLeft {
		border-right: 1px solid black;
	}
</style>
