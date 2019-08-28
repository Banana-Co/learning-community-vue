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
					<div class="inner"><span>{{this.con.content}}</span></div>
					<div class="but">
						<span>{{this.con.createdDate}}</span>
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
	var t = new Date();
	import ReplyDialog from "../message/ReplyDialog";
	export default {
		name: "InPost",
		components: {
			ReplyDialog,
		},
		data() {
			return {
				time: t,
				replyDialogVisible: false,
			}
		},
		methods: { //   时间格式化
			dateFormat: function(time) {
				var date = new Date(time);
				var year = date.getFullYear();
				/* 在日期格式中，月份是从0开始的，因此要加0
				 * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
				 * */
				var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
				var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
				var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
				var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
				var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				// 拼接
				return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
			},
			like() {
				console.log(this.con)
				this.$axios.post('addLike', this.con).then((response) => {
						console.log(response)
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

	.but {
		line-height: 20px;
		font-size: 1px;
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
