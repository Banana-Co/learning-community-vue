<template>
	<div>
		<el-card class='threadBlock'>
			<el-row><el-image style="width: 200px; height: 200px" :src="url"></el-image></el-row>
			<br /><br /><br />
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
		height: 400px;
	}
</style>
