<template>
	<div>
		<el-button type='text' @click='into'>
		<el-card shadow='hover' class="threadBlock">
			<el-row>
				<el-image style="width: 250px; height: 250px" :src="url"></el-image>
			</el-row>
			<br /><br /><br />
			<el-row><span><b>{{title}}</b></span></el-row>
			
		</el-card>
		</el-button>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			into() {
				this.$router.push(
					`/forum/${this.id}`
				)
			},
		},
		props: [
			'title',
			'url',
			'id',
		],
	}
</script>

<style>
	.threadBlock {
		width: 300px;
		height: 400px;
		margin-right: 40px;
	}
	.threadCard{
		margin-top: -12.5px;
	}
</style>
