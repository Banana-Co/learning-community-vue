<template>
	<div>

		<el-row>
			<el-col :span="4">





			</el-col>
			<el-col :span="16" :offset='4'>
				<outpost v-for="post in posts" :key="post.id" :id="post.id" :con='post'></outpost>
			</el-col>
			<el-col :span="4">
				<el-col :span="7">
				</el-col>
				<el-col :span="10" :offset='7'>
					<el-input placeholder="搜索" prefix-icon="el-icon-search" v-model="input" clearable>
					</el-input>
				</el-col>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import outpost from "@/components/common/outPost.vue";
	import navi from "@/components/common/navi.vue";
	import PostDialog from "@/components/message/PostDialog.vue"
	import {
		mapState,
		mapActions,
		mapGetters
	} from 'vuex';
	import {
		setCookie,
		getCookie,
		delCookie
	} from '../../assets/js/cookie.js'
	export default {
		components: {
			outpost,
			navi,
			PostDialog,
		},
		methods: {
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.getPostPage()
				console.log(`当前页: ${val}`);
			},
			handleSortChange(val) {
				this.sortedby = val.sortedby;
				this.order = val.order;
				this.currentPage = 1;
				this.getPostPage();
			},
			ToLogin() {
				this.$router.replace({
					path: '/login'
				})
			},
			getPostPage() {
					this.$axios.get(`MyPost=${this.name}`).then((res) => {
						this.posts = res.data;
						//console.log(this.posts);
						this.totalPostNum = res.data.totalElements;
					})
					.catch(function(error) {
						console.log(error);
					})
			},
		},
		data() {
			return {
				currentPage: 1,
				postDialogVisible: false,
				posts: [],
				totalPostNum: 1,
				sortedby: "createdDate",
				order: "desc",
				name: '',
				avatarUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
				isLogin: false,
				notLogin: true,
				input: '',
			};
		},
		created() {
			let uname = getCookie('username')
			this.name = uname
			this.getPostPage();
			if (this.name != '') {
				this.$axios.get(`/getUser/${this.name}`).then((response) => {
					this.time = response.data.createdDate
					if (response.data.avatarUrl != '') {
						this.avatarUrl = response.data.avatarUrl
					}
				})
				this.isLogin = true;
				this.notLogin = false;
				console.log('登陆状态：' + this.isLogin);
			} else {
				this.isLogin = false;
				this.notLogin = true;
				console.log('登陆状态：' + this.isLogin);
			}
		},
	};
</script>

<style>
</style>
