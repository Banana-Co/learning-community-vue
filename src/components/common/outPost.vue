<template>
	<div>
		<el-card shadow="hover" class="outPost" @click.native="ToContent">
			<el-col :span="1">
				<div class="avatar">
					<el-avatar :src="avatarUrl" :size="60"></el-avatar>
				</div>
			</el-col>
			<el-col :span="11">
				<div>{{this.title}}</div>
			</el-col>
			<el-col :span="4">
				<div>作者: {{this.author}}</div>
			</el-col>
			<el-col :span="4">
				<div>回复数: {{this.replyNum}}</div>
			</el-col>
			<el-col :span="4">
				<div>发布时间: {{this.createdDate}}</div>
			</el-col>

		</el-card>


	</div>
</template>

<script>
	export default {
		methods: {
			ToContent() {
				this.$router.push(
					`/content/${this.id}`
				)
			},
		},
		props: [
			'id',
			'title',
			'author',
			'replyNum',
			'createdDate',
			'avatarUrl',
		]
	}
</script>

<style>
	.outPost {
		width: 1000px;
		margin-left: auto;
		margin-right: auto;
		margin-top: 15px;
		margin-bottom: 15px;
	}
</style>
