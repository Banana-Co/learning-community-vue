<template>
	<div>
		<el-button type="text" @click="ToContent">
			<el-card shadow="hover" class="outPost">
				<el-col :span="1">
					<div class="avatar">
						<el-avatar icon="el-icon-user-solid"></el-avatar>
					</div>
				</el-col>
				<el-col :span="11">
					<div>标题</div>
				</el-col>
				<el-col :span="4">
					<div>作者</div>
				</el-col>
				<el-col :span="4">
					<div>回复数</div>
				</el-col>
				<el-col :span="4">
					<div>发布时间</div>
				</el-col>
				
			</el-card>
		</el-button>


	</div>
</template>

<script>
	export default {
		data() {

		},
		methods: {
			ToContent() {
				this.$router.push(
					'/content'
				)
			},
		}
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
