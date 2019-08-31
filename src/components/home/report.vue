<template>
	<div>
		<el-card class="report-card">
			<div>
				<el-table :data="this.report" style="width: 100%" height="300" :default-sort="{prop: 'createdDate', order: 'descending'}"
				 @row-click="handleRowClick">
					<el-table-column prop="usernameReported" label="被举报人" width="150">
					</el-table-column>
					<el-table-column prop="createdDate" label="时间" width="200" :formatter="formatter" sortable>
					</el-table-column>
					<el-table-column prop="reportUsername" label="举报人" width="150">
					</el-table-column>
					<el-table-column fixed="right" width="200" label="处理意见">
						<template slot-scope="scope">
							<el-button size="mini" @click.stop="accecptRow(scope.$index, scope.row)">有价值</el-button>
							<el-button size="mini" @click.stop="deleteRow(scope.$index, scope.row)">删除</el-button>
						</template>
					</el-table-column>
					<!-- <el-table-column prop="reason" label="举报理由" width="200">
					</el-table-column> -->
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
		created() {
			//console.log(this.report)
		},
		props: ['report'],
		methods: {
			formatter(row, column) {
				return dateFormat(row.createdDate)
			},
			handleRowClick(row) {
				this.$router.push(`/content/${row.fatherId}`)
			},
			accecptRow(index, row) {
				console.log(row)
				this.$axios.get('valuableReport', {
						params: {
							reportId: row.id,
						}
					}).then(response => {
						console.log(response);
						
					})
					.catch(function(error) {
						console.log(error);
					})
			
			},
			deleteRow(index, row) {
				this.$axios.get('deleteReport', {
						params: {
							reportId: row.id,
						}
					}).then(response => {
						console.log(response);
						
					})
					.catch(function(error) {
						console.log(error);
					})
			
			},
		}
	}
</script>

<style>
	.report-card{
		width: 750px;
	}
</style>
