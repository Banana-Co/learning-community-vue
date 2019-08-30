<template>
	<div>
		<center>
		<el-row>
			<el-col :span="6">
				<threadBlock title="课程推荐" url="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567164884629&di=f0664d1d183e7ea9d51b68842a832d90&imgtype=0&src=http%3A%2F%2Fwww.360sok.com%2FschoolImg%2Fimages%2F3381%2Fimages%2Fbozhi%2Fimages%2F201908071115194.png"></threadBlock>
			</el-col>
			<el-col :span="6">
				<threadBlock title="校园周边" url="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567759989&di=2d91753cb24ea2e74c878a2e14e0a8a6&imgtype=jpg&er=1&src=http%3A%2F%2Fimg45.chem17.com%2F8%2F20110426%2F634394321941595468.jpg"></threadBlock>
			</el-col>
			<el-col :span="6">
				<threadBlock title="刷题" url=""></threadBlock>
			</el-col>
			<el-col :span="6">
				<el-card class='threadBlock'>
					当前热门
					
					
				</el-card>
			</el-col>
				

		</el-row>
		</center>
	</div>
</template>

<script>
	import threadBlock from "@/components/common/threadBlock.vue";
	export default {
		components: {
			threadBlock,
		},
		data() {
			return {}
		},
	}
</script>

<style>
</style>
