<template>
	<div>
		<el-card class='threadBlock'>
			<el-row><el-image style="width: 100px; height: 100px" :src="url"></el-image></el-row>
			<el-row><span>{{title}}</span></el-row>
			
			
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: [
			'title',
			'url',
		]
	}
</script>

<style>
	.threadBlock{
		width: 300px;
		height: 500px;
	}
</style>
