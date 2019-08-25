<template>
	<div>
			<el-card shadow="hover" class="outPost" @click.native="ToContent">
				<el-col :span="1">
					<div class="avatar">
						<el-avatar icon="el-icon-user-solid"></el-avatar>
					</div>
				</el-col>
				<el-col :span="11">
					<div>标题: {{this.title}}</div>
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
					'/content'
				)
			},
		},
      props: [
          'title',
          'author',
          'replyNum',
          'createdDate'
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
