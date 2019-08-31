<template>
	<div>
		<el-button type='text' @click='into'>
		<transition name = "el-fade-in">
		<el-card class='threadBlock' shadow='hover'>
			
			<el-row>
				<el-image style="width: 250px; height: 250px" :src="url"></el-image>
			</el-row>
			<br /><br /><br />
			<el-row><span>{{title}}</span></el-row>
			
		</el-card>
		</transition>
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
		margin-top: 0px;
		height: 400px;
		padding: 0px;
	}
</style>
