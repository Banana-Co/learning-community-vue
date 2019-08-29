<template>
	<div>
		<el-card shadow="hover" class="outPost" @click.native="ToContent">
			<el-row :gutter="20">
				<el-col :span="4">
					<div class="avatar">
						<el-avatar :src="this.con.avatarUrl" :size="60"></el-avatar>
					</div>
				</el-col>
				<el-col :span="10">
					<div>{{this.con.title}}</div>
				</el-col>
				<el-col :span="4">
					<div>{{this.con.author}}</div>
				</el-col>
				<el-col :span="2">
					<div>{{this.con.replyNum}}</div>
				</el-col>
				<el-col :span="4">
					<div><span v-show='isPublish'>{{formattedcreatedDate}}</span> <span v-show='isReply'>{{formattedlatestReplyDate}}</span></div>
				</el-col>
			</el-row>
		</el-card>


	</div>
</template>

<script>
	import {
		dateFormat
	} from "../../assets/js/time.js";
	export default {
		methods: {
			ToContent() {
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
					this.$router.push(
						`/content/${this.id}`
					)
				}
			},
		},
		created() {
			//console.log(this.con);
		},
		computed: {
			formattedcreatedDate() {
				return dateFormat(this.con.createdDate);
			},
			formattedlatestReplyDate() {
				return dateFormat(this.con.latestReplyDate);
			}
		},
		props: [
			'id',
			'con',
			'name',
			'isPublish',
			'isReply',
		]
	}
</script>

<style>
	.outPost {
		height: 100px;
		margin-left: 10px;
		margin-right: 10px;
		margin-top: 15px;
		margin-bottom: 15px;
	}
</style>
