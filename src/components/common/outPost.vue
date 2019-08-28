<template>
	<div>
		<el-card shadow="hover" class="outPost" @click.native="ToContent">
			<el-col :span="1">
				<div class="avatar">
					<el-avatar :src="this.con.avatarUrl" :size="60"></el-avatar>
				</div>
			</el-col>
			<el-col :span="11">
				<div>{{this.con.title}}</div>
			</el-col>
			<el-col :span="4">
				<div>作者: {{this.con.author}}</div>
			</el-col>
			<el-col :span="4">
				<div>回复数: {{this.con.replyNum}}</div>
			</el-col>
			<el-col :span="4">
				<div>发布时间: {{formattedDate}}</div>
			</el-col>

		</el-card>


	</div>
</template>

<script>
	import {dateFormat} from "../../assets/js/time.js";
	export default {
		methods: {
			ToContent() {
				this.$router.push(
					`/content/${this.id}`
				)
			},
		},
		computed : {
		      formattedDate() {
		          return dateFormat(this.con.createdDate)
		    }
		},
		props: [
			'id',
			'con',
		]
	}
</script>

<style>
	.outPost {
		height: 100px;
		margin-left: auto;
		margin-right: auto;
		margin-top: 15px;
		margin-bottom: 15px;
	}
</style>
