<template>
	<div>
		<span>{{this.postDetail.title}}</span>
		<el-divider></el-divider>
		<el-row>
			<el-col :span="4">
				<el-button @click="replyDialogVisible=true"> 发表回复 </el-button>
				<reply-dialog :postId="this.$route.params.id" :visible.sync="replyDialogVisible" :author="name" :avatarUrl="avatarUrl" :floor='0'></reply-dialog>
				<navi :sortbys="sortbys" @sort-change="handleSortChange">
				</navi>
			</el-col>
			<el-col :span="16">
				<in-post v-for="reply in replyPage" :key="reply.createdDate"  :con="reply" :name='name' :avatarUrl='avatarUrl'></in-post>
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage"
                       :page-size="10" layout="prev, pager, next, jumper" :total="postDetail.replyNum" :hide-on-single-page="true">
        </el-pagination>
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
	} from '../../assets/js/cookie.js';
	import {sortByField} from '../../assets/js/sort.js'
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
          currentPage: 1,
          sortedby: 'no',
          order: 'asc',
          sortbys: ['最早发布','最晚发布','最多点赞']
			}
		},
      computed: {
		    replyPage: function() {
		        return this.getPagedAndSortedReply(this.replies, this.currentPage, this.sortedby, this.order)
                .slice((this.currentPage - 1)*10, this.currentPage*10);
        }
      },
		methods: {
			getPostDetail() {
				this.$axios
					.get(`findPostById=${this.$route.params.id}`)
					.then(res => {
						//console.log(res.data)
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
					path: "/forum"
				})
			},
      getPagedAndSortedReply(replies, currentPage, sortedby, order) {
        return replies.sort(sortByField(sortedby, order));
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
  .el-pagination {
    margin-top: 30px;
    margin-bottown: 100px
  }
</style>
