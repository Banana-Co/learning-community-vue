<template>
	<div>
		<el-card class="report-card">
			<div>
				<el-table :data="this.report" style="width: 100%" :default-sort="{prop: 'createdDate', order: 'descending'}"
				 @row-click="handleRowClick">
					<el-table-column prop="title" label="标题" width="400">
					</el-table-column>
					<el-table-column prop="createdDate" label="时间" width="250" :formatter="formatter">
					</el-table-column>
					<el-table-column prop="replyNum" label="回复数" width="100">
					</el-table-column>
				</el-table>
			</div>
		</el-card>
	</div>
</template>

<script>
	import {
		dateFormat
	} from "../../assets/js/time";
	
	export default {
		name: "mySimplePost",
		data() {
			return {
	
			}
		},
		props: ['report'],
		methods: {
			formatter(row, column) {
				return dateFormat(row.createdDate)
			},
			handleRowClick(row) {
				this.$router.push(`/content/${row.id}`)
			},
			toMyPost() {
				this.$router.push('/myPost')
			}
		}
	}
</script>

<style>
</style>
