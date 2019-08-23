<template>
	<div>
		<el-card shadow="hover"class="post" >
			<el-col :span="1">
				<div class="avatar">
					<el-avatar icon="el-icon-user-solid"></el-avatar>
				</div>
			</el-col>
			<el-col :span="15">
				<div>标题</div>
			</el-col>
			<el-col :span="4">
				<div>作者</div>
			</el-col>
			<el-col :span="4">
				<div>回复数</div>
			</el-col>
		</el-card>
		
	</div>
</template>

<script>
</script>

<style>
	.post {
		width: 1000px;
		margin-left: auto;
		margin-right: auto;
		margin-top: 15px;
		margin-bottom: 15px;
	}
</style>
