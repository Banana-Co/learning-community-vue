<template>
	<div>
		<div>测试</div>
		<el-col :span="4"></el-col>
		<el-col :span="16" :offset="4"><post></post>
			<post></post>
			<post></post>
			<post></post>
			<post></post>
			<post></post>
			<post></post>
			<post></post>
			<post></post></el-col>
		
		
		
			
		
	</div>
</template>

<script>
	import post from "@/components/common/post.vue";
	import navi from "@/components/common/navi.vue"
	export default {
		components: {
			post,navi
		}
	};
</script>

<style>
</style>
