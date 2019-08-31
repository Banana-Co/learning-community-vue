<template>
	<div>
		<el-row>
			<el-col :span="4" :offset='3'>
				<el-button @click="$router.back(-1)" icon="el-icon-back"></el-button>
			</el-col>
			<!-- <el-col :span="10"><span class="postTitle" v-if="show3">&nbsp;</span><span class="postTitle" v-else> {{this.postDetail.title}}</span></el-col> -->
			<el-col :span="10"><span class="postTitle"> {{this.postDetail.title}}</span></el-col>
			<el-col :span="5">
				<el-button @click="deletePost" icon="el-icon-delete" v-if='showDelete'></el-button>
			</el-col >
		</el-row>
		<el-row>
			<el-col :span="4">
				<el-button @click="replyDialogVisible=true" :disabled="mute"> 发表回复 </el-button>
				<reply-dialog :postId="this.$route.params.id" :visible.sync="replyDialogVisible" :author="name" :avatarUrl="avatarUrl"
				 :floor='0'></reply-dialog>
				<navi :sortbys="sortbys" @sort-change="handleSortChange">
				</navi>
			</el-col>
			<el-col :span="16">
				<transition-group name="slide-fade">
					<in-post v-for="reply in replyPage" :key="reply.createdDate" :con="reply" :name='name' :avatarUrlm='avatarUrl'
					 :permission='permission'></in-post>
				</transition-group>
				<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="prev, pager, next, jumper"
				 :total="postDetail.replyNum" :hide-on-single-page="true">
				</el-pagination>
			</el-col>
		</el-row>

	</div>
</template>

<script>
	import InPost from "@/components/common/inPost.vue";
	import InQuestion from "@/components/common/inQuestion.vue";
	import OutPost from "./outPost";
	import navi from "@/components/common/navi.vue";
	import ReplyDialog from "../message/ReplyDialog";
	import {
		setCookie,
		getCookie,
		delCookie
	} from '../../assets/js/cookie.js';
	import {
		sortByField
	} from '../../assets/js/sort.js'
	export default {
		components: {
			OutPost,
			InPost,
			ReplyDialog,
			navi,
			InQuestion,
		},
		data() {
			return {
				postDetail: {},
				replies: [],
				replyDialogVisible: false,
				name: '',
				avatarUrl: '',
				currentPage: 1,
				sortedby: 'no',
				order: 'asc',
				sortbys: ['最早发布', '最晚发布', '最多点赞'],
				showDelete: false,
				permission: '',
				mute:false,
				// showTitle:true,
				// show1:true,
				// show2:false,
				// show3:false,
			}
		},
		computed: {
			replyPage: function() {
				return this.getPagedAndSortedReply(this.replies, this.currentPage, this.sortedby, this.order)
					.slice((this.currentPage - 1) * 10, this.currentPage * 10);
			}
		},
		methods: {
			deletePost() {
				this.$confirm('此操作将永久删除该贴, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios
						.get('removePost', {
							params: {
								id: this.postDetail.id,
								actionUsername:this.name,
							}
						})
						.then(res => {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.$router.push({
								path: "/forum/1"
							})
						})
						.catch(failResponse => {})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				})
			},
			getPostDetail() {
				this.$axios
					.get(`findPostById=${this.$route.params.id}`)
					.then(res => {
						this.postDetail = res.data;
					})
					.catch(function(error) {
						console.log(error);
					})
			},
			handleSortChange(val) {
				switch (val) {
					case '最早发布':
						this.sortedby = 'no';
						this.order = 'asc';
						break;
					case '最晚发布':
						this.sortedby = 'no';
						this.order = 'desc';
						break;
					case '最多点赞':
						this.sortedby = 'likeNum';
						this.order = 'desc';
						break;
				}
				this.currentPage = 1;
			},
			handleCurrentChange(val) {
				this.currentPage = val;
			},
			getReply() {
				this.$axios
					.get(`findCommentByFatherId=${this.$route.params.id}`)
					.then(res => {
						//console.log(res.data)
						this.replies = res.data;
					})
					.catch(function(error) {
						console.log(error);
					})
			},
			handleClickReturn() {
				this.$router.push({
					path: "/forum/1"
				})
			},
			getPagedAndSortedReply(replies, currentPage, sortedby, order) {
				return replies.sort(sortByField(sortedby, order));
			}
		},
		created() {
			// if(this.$store.state.threadId==1){
			// 	this.show1=true
			// 	this.show2=false
			// 	this.show3=false
			// }else if(this.$store.state.threadId==2){
			// 	this.show1=false
			// 	this.show2=true
			// 	this.show3=false
			// }else if(this.$store.state.threadId==3){
			// 	this.show1=false
			// 	this.show2=false
			// 	this.show3=true
			// }
			this.getPostDetail();
			this.getReply();
			let uname = getCookie('username');
			this.name = uname;
			this.$axios.get('getPermission', {
					params: {
						username: this.name,
					}
				})
				.then((response) => {
					this.permission = response.data;
					if (this.permission >= 2 || this.name == this.postDetail.author) {
						this.showDelete = true;
					}
					if(this.permission==0){
						this.mute=true
					}
				}).catch(function(error) {
					console.log(error);
				})
			this.$axios.get('getAvatarUrl', {
					params: {
						username: this.name,
					}
				})
				.then((response) => {
					this.avatarUrl = response.data;
				}).catch(function(error) {
					console.log(error);
				})
		}
	}
</script>

<style>
	.el-pagination {
		margin-top: 30px;
		margin-bottown: 100px
	}

	.postTitle {
		font-size: 26px;
	}

	.slide-fade-enter-active {
		transition: all .25s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}

	.slide-fade-leave-active {
		transition: all .10s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}

	.slide-fade-enter,
	.slide-fade-leave-to

	/* .slide-fade-leave-active for below version 2.1.8 */
		{
		transform: translateX(10px);
		opacity: 0;
	}
</style>
