<template>
	<div>
		<el-card shadow="hover" class="outPost" @click.native="ToContent">
			<el-row :gutter="20">
				<el-col :span="4">
					<div class="avatar">
						<el-avatar :src="this.con.avatarUrl" :size="60"></el-avatar>
					</div>
				</el-col>
				<el-col :span="10">
					<div>{{this.con.title}}</div>
				</el-col>
				<el-col :span="4">
					<div>{{this.con.author}}</div>
				</el-col>
				<el-col :span="2">
					<div>{{this.con.replyNum}}</div>
				</el-col>
				<el-col :span="4">
					<div>{{formattedDate}}</div>
				</el-col>
			</el-row>
		</el-card>


	</div>
</template>

<script>
	import {
		dateFormat
	} from "../../assets/js/time.js";
	export default {
		methods: {
			ToContent() {
				this.$router.push(
					`/content/${this.id}`
				)
			},
		},
		computed: {
			formattedDate() {
				return dateFormat(this.con.createdDate)
			}
		},
		props: [
			'id',
			'con',
		]
	}
</script>

<style>
	.outPost {
		height: 100px;
		margin-left: 10px;
		margin-right: 10px;
		margin-top: 15px;
		margin-bottom: 15px;
	}
</style>
