<template>
	<div>
		<div>测试</div>
		<el-col :span="4"></el-col>
		<el-col :span="16" :offset="4">
			<post></post>
			<post></post>
			<post></post>
			<post></post>
			<post></post>
			<post></post>
			<post></post>
			<post></post>
			<post></post>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
			 :page-size="20" layout="prev, pager, next, jumper" :total="1000" :hide-on-single-page="true"> </el-pagination>
		</el-col>






	</div>
</template>

<script>
	import post from "@/components/common/post.vue";
	export default {
		components: {
			post
		},
		methods: {
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			}
		},
		data() {
			return {
				currentPage: 1,
			};
		}
	};
</script>

<style>
</style>
