<template>
	<div>
		<div>
			<el-carousel height="400px" type="card">
				<el-carousel-item v-for="item in items" :key="item">
					<el-image style="width: 700px; height: 400px" :src="item"></el-image>
				</el-carousel-item>
			</el-carousel>

		</div>
		<!-- <h3>监控量:{{count1}}</h3> -->
		<!-- <h3>计算:{{this.$store.getters.getStateCount}}</h3> -->
		<!-- <button @click="addFun">+</button>
		<button @click="minusFun">-</button> -->
		<el-button @click="ToLogin">登录</el-button>
		<el-row>
			<el-col :span="4">
				<el-button @click="postDialogVisible=true">发布帖子 </el-button>
        <post-dialog :visible.sync="postDialogVisible"></post-dialog>
			</el-col>
			<el-col :span="16">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
				 :page-size="10" layout="prev, pager, next, jumper" :total="totalPostNum" :hide-on-single-page="true"> </el-pagination>

			</el-col>
		</el-row>
		<el-row>
			<el-col :span="4">
				<navi
          @sort-change="handleSortChange">
         </navi>
			</el-col>
			<el-col :span="16">
				<outpost
          v-for="post in posts"
          :key="1"
          :title="post.title"
          :author="post.author"
          :replyNum="post.replyNum"
          :createdDate="post.createdDate"></outpost>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import outpost from "@/components/common/outPost.vue";
	import navi from "@/components/common/navi.vue";
	import PostDialog from "@/components/message/PostDialog.vue"
	import {mapState,mapActions,mapGetters} from 'vuex';
	export default {
		components: {
			outpost,
			navi,
			PostDialog,
		},
		computed: {
			...mapState({
				count1:state=>state.count
			})
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
			// addFun(){
			// 	//this.$store.commit("add");
			// 	this.$store.dispatch("addFun");
			// },
			// minusFun(){
			// 	//this.$store.commit("reduction");
			// 	this.$store.dispatch("reductionFun");
			// },
			ToLogin() {
				this.$router.replace({
					path: '/login'
				})
			},
        getPostPage() {
            this.$axios
                .get('http://localhost:8000/api/post/getPostByPage', {
                    params: {
                        page: this.currentPage,
                        sortedby: this.sortedby,
                        order: this.order
                    }
                })
                .then(res => {
                    this.posts = res.data.content;
                    this.totalPostNum = res.data.totalElements;
                })
                .catch(function(error) {
                    console.log(error);
                })
        }
		},
		data() {
			return {
				currentPage: 1,
				items: [require("@/assets/access.jpg"), require("@/assets/access1.jpg"), require("@/assets/default-8.png")],
          postDialogVisible: false,
          posts: [],
          totalPostNum: 1,
          sortedby: "createdDate",
          order: "desc"
			};
		},
      created: function () {
          this.getPostPage();
      }
	};
</script>

<style>
</style>
