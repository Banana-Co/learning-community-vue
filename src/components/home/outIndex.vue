<template>
	<div>
		<center>
		<el-row>
			<el-col :span="5" :offset="1">
				<threadBlock id='1' title="课程推荐" url="http://localhost:8000/file/5d6a7b7cab54c8206c094926"></threadBlock>
				</transition>
			</el-col>
			<el-col :span="6">
				<threadBlock id='2' title="校园周边" url="http://localhost:8000/file/5d6a7b81ab54c8206c094927"></threadBlock>
			</el-col>
			<el-col :span="6">
				<threadBlock id='3' title="刷题" url="http://localhost:8000/file/5d6a7b87ab54c8206c094928"></threadBlock>
			</el-col>
			<el-col :span="5">
				<hot-posts></hot-posts>
			</el-col>
				
					
		</el-row>
		</center>
	</div>
</template>

<script>
	import threadBlock from "@/components/common/threadBlock.vue";
	import HotPosts from "./HotPosts";
	export default {
		components: {
			HotPosts,
			threadBlock,
		},
		data() {
			return {}
		},
	}
</script>

<style>
	.home-card{
		min-width: 300px;
	}
</style>
