<template>
	<div>
		<div></div>
		<el-col :span="4"> <navi></navi> </el-col>
		<el-col :span="16">
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
	import navi from "@/components/common/navi.vue";
	export default {
		components: {
			post,navi
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
