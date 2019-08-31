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
			<naviHeader :activeIndex='activeIndex'></naviHeader>
		</el-row>
		<el-row>
			<el-col :span="4">
				<el-row>
					<navi :sortbys="sortbys" @sort-change="handleSortChange">
					</navi>
				</el-row>
			</el-col>

			<el-col :span="16">
				<div>
					<el-row>
						<el-col :span="4">
						</el-col>
						<el-col :span="10" :offset='4'>
							<div><span>标题</span></div>
						</el-col>
						<el-col :span="4">
							<div><span>作者</span></div>
						</el-col>
						<el-col :span="2">
							<div><span>回复数</span></div>
						</el-col>
						<el-col :span="4">
							<div> <span v-show='isPublish'>发布时间</span> <span v-show='isReply'>回复时间</span> </div>
						</el-col>
					</el-row>
				</div>
				<div>
					<transition-group class="post-transist" name="slide-fade">
						<outpost v-for="post in announces" :key="post.id" :id="post.id" :con='post' :name='name' :isPublish='isPublish'
						 :isReply='isReply' v-if="reFresh"></outpost>
						<outpost v-for="post in posts" :key="post.id" :id="post.id" :con='post' :name='name' :isPublish='isPublish'
						 :isReply='isReply' v-if="reFresh" @click-avatar="handleClickAvatar"></outpost>
					</transition-group>
				</div>
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
				 :page-size="10" layout="prev, pager, next, jumper" :total="totalPostNum" :hide-on-single-page="true">
				</el-pagination>
			</el-col>
			<el-col :span="4">
				<el-row>
					<el-button @click="showPost" type="primary" :disabled="mute">发布帖子 </el-button>
					<post-dialog :visible.sync="postDialogVisible" :author="name" :avatarUrl='avatarUrl' :threadId='activeIndex'></post-dialog>
					<questionDialog :visible.sync="questionDialogVisible" :author="name" :avatarUrl='avatarUrl' :threadId='activeIndex'></questionDialog>
					<classDialog :visible.sync="classDialogVisible" :author="name" :avatarUrl='avatarUrl' :threadId='activeIndex'></classDialog>
				</el-row>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import outpost from "@/components/common/outPost.vue";
	import navi from "@/components/common/navi.vue";
	import naviHeader from "@/components/common/naviHeader.vue";
	import PostDialog from "@/components/message/PostDialog.vue";
	import questionDialog from "@/components/message/questionDialog.vue"
	import classDialog from "@/components/message/classDialog.vue"
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
			naviHeader,
			questionDialog,
			classDialog,
		},
		// computed: {
		// 	...mapState({
		// 		count1: state => state.count
		// 	})
		// },
		watch: {
			checkNavi(newd, old) {
				this.getPostPage()
			},
			checkSortNavi(newd, old) {
				this.getPostPage()
				this.reFresh = false
				this.$nextTick(() => {

					this.reFresh = true
				})
			}
		},
		computed: {
			checkNavi() {
				return this.$route.params.id;
			},
			checkSortNavi() {
				return this.sortId;
			}
		},
		methods: {
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.getPostPage()
				console.log(`当前页: ${val}`);
			},
			ToLogin() {
				this.$router.replace({
					path: '/login'
				})
			},
			getPostPage() {
				this.activeIndex = this.$route.params.id
				this.announceId = parseInt(this.activeIndex) + 3
				this.$axios
					.get('getThreadPostByPage', {
						params: {
							page: this.currentPage,
							sortedby: this.sortedby,
							order: this.order,
							threadId: this.activeIndex,
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
				this.$axios
					.get('getThreadPostByPage', {
						params: {
							page: this.currentPage,
							sortedby: this.sortedby,
							order: this.order,
							threadId: this.announceId,
						}
					})
					.then(res => {
						//console.log(res)
						this.announces = res.data.content;
						//console.log(this.announces);
						this.totalPostNum = this.totalPostNum + res.data.totalElements;
					})
					.catch(function(error) {
						console.log(error);
					})
			},
			showPost() {
				if (this.name == '') {
					this.$alert('请先登录', '提示', {
						confirmButtonText: '确定',
						callback: action => {
							this.$router.push(
								'/login'
							)
						}
					});
				} else {
					if (this.activeIndex == 3) {
						this.questionDialogVisible = true;
					} else if(this.activeIndex == 1){
						this.classDialogVisible= true;
					}
					else {
						this.postDialogVisible = true;
					}

				}
			},
			handleSortChange(val) {
				switch (val) {
					case '最新回复':
						this.sortedby = "latestReplyDate";
						this.order = "desc";
						this.isPublish = false;
						this.isReply = true;
						this.sortId = 1;
						break;
					case '最早回复':
						this.sortedby = "latestReplyDate";
						this.order = "asc";
						this.isPublish = false;
						this.isReply = true;
						this.sortId = 2;
						break;
					case '最新发布':
						this.sortedby = "createdDate";
						this.order = "desc";
						this.isPublish = true;
						this.isReply = false;
						this.sortId = 3;
						break;
					case '最早发布':
						this.sortedby = "createdDate";
						this.order = "asc";
						this.isPublish = true;
						this.isReply = false;
						this.sortId = 4;
						break;
				}
			},
        handleClickAvatar(val) {
			    this.$router.push(`/profile/${val}`)
        }
		},
		data() {
			return {
				currentPage: 1,
				// items: [require("@/assets/access.jpg"), require("@/assets/access1.jpg"), require("@/assets/default-8.png")],
				postDialogVisible: false,
				questionDialogVisible: false,
				classDialogVisible:false,
				posts: [],
				totalPostNum: 1,
				sortedby: "createdDate",
				order: "desc",
				name: '',
				avatarUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
				input: '',
				sortbys: ['最新回复', '最早回复', '最新发布', '最早发布'],
				isPublish: true,
				isReply: false,
				activeIndex: 1,
				sortId: 3,
				reFresh: true,
				mute: false,
				announces: [],
				announceId: 4,
			};
		},
		created() {
			this.getPostPage();
			let uname = getCookie('username')
			this.name = uname
			if (this.name != '') {
				this.$axios.get(`/getUser/${this.name}`).then((response) => {
					if (response.data.avatarUrl != '') {
						this.avatarUrl = response.data.avatarUrl
					}
					if (response.data.permission == 0) {
						this.mute = true
					}
				})
			}
		},
	};
</script>

<style>
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

	.postTransist {
		position: relative;
		overflow-y: hidden;

		outpost {
			position: absolute;
		}
	}
</style>
