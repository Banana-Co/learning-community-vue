<template>
	<div>
		<!-- <div>
			<el-carousel height="300px" type="card">
				<el-carousel-item v-for="item in items" :key="item">
					<el-image style="width: 500px; height: 300px" :src="item"></el-image>
				</el-carousel-item>
			</el-carousel>

		</div> -->
		<!-- <h3>监控量:{{count1}}</h3> -->
		<!-- <h3>计算:{{this.$store.getters.getStateCount}}</h3> -->
		<!-- <button @click="addFun">+</button>
		<button @click="minusFun">-</button> -->

		<el-row>
			<el-col :span="4">
				<el-button @click="showPost" v-show="isLogin">发布帖子 </el-button>
				<post-dialog :visible.sync="postDialogVisible" :author="name" :avatarUrl='avatarUrl'></post-dialog>
			</el-col>
			<el-col :span="16">
				<el-button @click="ToLogin" v-show="notLogin">登录</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="4">
				<navi @sort-change="handleSortChange">
				</navi>
			</el-col>
			<el-col :span="16">
				<outpost v-for="post in posts" :key="post.id" :id="post.id" :title="post.title" :author="post.author" :replyNum="post.replyNum"
				 :createdDate="post.createdDate"></outpost>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="4">
			</el-col>
			<el-col :span="16">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
				 :page-size="10" layout="prev, pager, next, jumper" :total="totalPostNum" :hide-on-single-page="true">
				</el-pagination>

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
	} from '../assets/js/cookie.js'
	export default {
		components: {
			outpost,
			navi,
			PostDialog,
		},
		// computed: {
		// 	...mapState({
		// 		count1: state => state.count
		// 	})
		// },

		mounted() {

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
				this.$axios
					.get('getPostByPage', {
						params: {
							page: this.currentPage,
							sortedby: this.sortedby,
							order: this.order
						}
					})
					.then(res => {
						this.posts = res.data.content;
						//console.log(this.posts);
						this.totalPostNum = res.data.totalElements;
					})
					.catch(function(error) {
						console.log(error);
					})
			},
			showPost() {
				this.postDialogVisible = true;
			},
		},
		data() {
			return {
				currentPage: 1,
				items: [require("@/assets/access.jpg"), require("@/assets/access1.jpg"), require("@/assets/default-8.png")],
				postDialogVisible: false,
				posts: [],
				totalPostNum: 1,
				sortedby: "createdDate",
				order: "desc",
				name: '',
				avatarUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
				isLogin: false,
				notLogin: true,
			};
		},
		created() {
			this.getPostPage();
			let uname = getCookie('username')
			this.name = uname
			if (this.name != '') {
				this.$axios.get(`/getUser/${this.name}`).then((response) => {
					this.time = response.data.createdDate
					if (response.data.avatarUrl != '') {
						this.avatarUrl = response.data.avatarUrl
					}
				})
				this.isLogin = true;
				this.notLogin = false;
				console.log('登陆状态：'+this.isLogin);
			} else {
				this.isLogin = false;
				this.notLogin = true;
				console.log('登陆状态：'+this.isLogin);
			}
		}
	};
</script>

<style>
</style>
