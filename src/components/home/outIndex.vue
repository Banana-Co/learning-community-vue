<template>
	<div class="outIndexCards">
		<el-row type="flex" align="top">
			<!-- <threadBlock id='1' title="课程推荐" url="http://localhost:8000/file/5d6a7b7cab54c8206c094926"></threadBlock>
				
				<threadBlock id='2' title="校园周边" url="http://localhost:8000/file/5d6a7b81ab54c8206c094927"></threadBlock>
		
				<threadBlock id='3' title="刷题" url="http://localhost:8000/file/5d6a7b87ab54c8206c094928"></threadBlock> -->
			<el-button type='text' @click='into1'>
				<el-card shadow='hover' class="threadBlock">
					<el-row>
						<img style="width: 250px; height: 250px" src="../../assets/t1.jpg"></img>
					</el-row>
					<br /><br /><br />
					<el-row><span><b>课程推荐</b></span></el-row>

				</el-card>
			</el-button>
			<el-button type='text' @click='into2'>
				<el-card shadow='hover' class="threadBlock">
					<el-row>
						<img style="width: 250px; height: 250px" src="../../assets/t2.jpg"></img>
					</el-row>
					<br /><br /><br />
					<el-row><span><b>校园周边</b></span></el-row>

				</el-card>
			</el-button>
			<el-button type='text' @click='into3'>
				<el-card shadow='hover' class="threadBlock">
					<el-row>
						<img style="width: 250px; height: 250px" src="../../assets/t3.jpg"></img>
					</el-row>
					<br /><br /><br />
					<el-row><span><b>刷题</b></span></el-row>

				</el-card>
			</el-button>
			<hot-posts></hot-posts>

		</el-row>
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
		methods: {
			into1() {
				this.$router.push(
					`/forum/1`
				)
			},
			into2() {
				this.$router.push(
					`/forum/2`
				)
			},
			into3() {
				this.$router.push(
					`/forum/3`
				)
			},
		},
	}
</script>

<style>
	.home-card {
		min-width: 300px;
	}

	.outIndexCards {
		width: 1320px;
		height: 340px;
		margin: 0 auto;
	}
	.threadBlock {
		width: 300px;
		height: 400px;
		margin-right: 40px;
	}
	.threadCard{
		margin-top: -12.5px;
	}
</style>
