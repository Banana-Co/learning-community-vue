<template>
	<div>
		<span>{{this.postDetail.title}}</span>
		<el-divider></el-divider>
		<el-row>
			<el-col :span="4">
				<el-button @click="replyDialogVisible=true"> 发表回复 </el-button>
				<reply-dialog :post-id="this.$route.params.id" :visible.sync="replyDialogVisible" :author="name" :avatarUrl="avatarUrl" :floor="0"></reply-dialog>
				<navi @sort-change="handleSortChange">
				</navi>
			</el-col>
			<el-col :span="16">
				<in-post :content="postDetail.content" :author="postDetail.author" :avatarUrl='postDetail.avatarUrl'></in-post>
				<in-post v-for="reply in replies" :key="reply.createdDate" :content="reply.content" :author="reply.author"
				 :avatarUrl="reply.avatarUrl" :floor="reply"></in-post>
			</el-col>
		</el-row>

	</div>
</template>

<script>
	import InPost from "@/components/common/inPost.vue";
	import OutPost from "./outPost";
	import navi from "@/components/common/navi.vue";
	import ReplyDialog from "../message/ReplyDialog";
	import {
		setCookie,
		getCookie,
		delCookie
	} from '../../assets/js/cookie.js'
	export default {
		components: {
			OutPost,
			InPost,
			ReplyDialog,
			navi,
		},
		data() {
			return {
				postDetail: {},
				replies: [],
				replyDialogVisible: false,
				name: '',
				avatarUrl: '',
			}
		},
		methods: {
			getPostDetail() {
				this.$axios
					.get(`findPostById=${this.$route.params.id}`)
					.then(res => {
						console.log(res.data)
						this.postDetail = res.data;
					})
					.catch(function(error) {
						console.log(error);
					})
			},
			handleSortChange(val) {
				console.log("sort")
			},
			getReply() {
				this.$axios
					.get(`findCommentByFatherId=${this.$route.params.id}`)
					.then(res => {
						console.log(res.data)
						this.replies = res.data;
					})
					.catch(function(error) {
						console.log(error);
					})
			},
			handleClickReturn() {
				this.$router.push({
					path: "/forum"
				})
			}
		},
		created() {
			this.getPostDetail();
			this.getReply()
			let uname = getCookie('username')
			this.name = uname
			if (this.name != '') {
				this.$axios.get(`/getUser/${this.name}`).then((response) => {
					this.time = response.data.createdDate
					if (response.data.avatarUrl != '') {
						this.avatarUrl = response.data.avatarUrl
					}
				})
			}
		}
	}
</script>

<style>
</style>
