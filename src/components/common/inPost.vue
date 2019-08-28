<template>
	<div>
		<el-card>
			<el-row class="inPost">
				<el-col :span="4">
					<el-row>
						<el-avatar :src="this.con.avatarUrl" :size="60"></el-avatar>
					</el-row>
					<el-row>{{this.con.author}}</el-row>

				</el-col>
				<el-col :span="20">
					<div class='floor'><span>#{{this.con.no}}</span></div>
					<div class="reply" v-if="isReply"><span>回复@{{this.con.fatherNo}}</span></div>
					<div class="inner"><span>{{this.con.content}}</span></div>
					<div class="but">
						<span>{{formattedDate}}</span>
						<el-button size="mini">举报</el-button>
						<el-button size="mini" @click="replyDialogVisible=true">回复</el-button>
						<el-button size="mini" @click="like">点赞:{{this.con.likeNum}}</el-button>
					</div>
					<reply-dialog :postId="this.$route.params.id" :visible.sync="replyDialogVisible" :author="name" :avatarUrl="avatarUrl" :floor='this.con.no'></reply-dialog>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>

<script>
	import {dateFormat} from "../../assets/js/time.js";
import ReplyDialog from "../message/ReplyDialog";
  export default {
	    name: "InPost",
		components: {
			ReplyDialog,
		},
		data() {
			return {
				replyDialogVisible: false,
				isReply:false,
				father:{
					name:'',
					content:'',
				},
			}
		},
		created() {
			if(this.con.fatherNo!=0&&this.con.fatherNo!=-1){
				this.isReply=true;
			}
		},
      computed : {
	        formattedDate: function() {
	            return dateFormat(this.con.createdDate)
          }
      },
		methods: { //   时间格式化
			like(){
				this.$axios.post('addLike',{id:this.id}).then(res => {
						this.posts = res.data.content;
						//console.log(this.posts);
						this.totalPostNum = res.data.totalElements;
					})
					.catch(function(error) {
						console.log(error);
					})
			}
		},
		props: [
			'id',
			'con',
			'name',
			'avatarUrl',
		]
	}
</script>

<style>
	.inPost {
		margin-left: auto;
		margin-right: auto;
		margin-top: 1px;
	}

	.inner {
		text-align: left;
		padding: 20px 20px 0 0;
	}
	.reply{
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
