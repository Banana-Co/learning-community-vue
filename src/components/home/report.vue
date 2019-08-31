<template>
	<div class="report-card">
		<el-card>
			<div class="reportList">
				<el-table :data="this.report" style="width: 100%" height="300" :default-sort="{prop: 'createdDate', order: 'descending'}"
				 @row-click="handleRowClick">
					<el-table-column prop="usernameReported" label="被举报人" width="150">
					</el-table-column>
					<el-table-column prop="createdDate" label="时间" width="200" :formatter="formatter" sortable>
					</el-table-column>
					<el-table-column prop="reportUsername" label="举报人" width="140">
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
				this.$axios.get('postValidation', {
						params: {
							id: row.fatherId,
						}
					}).then(response => {
						if (response.data.code == 200) {
							this.$router.push(`/content/${row.fatherId}`)
						} else {
							this.$notify.info({
								title: '提示',
								message: '该帖已被删除'
							});
							this.$axios.get('deleteReport', {
									params: {
										reportId: row.id,
									}
								}).then(response => {
									//location.reload()
								})
								.catch(function(error) {
									console.log(error);
								})
						}
					})
					.catch(function(error) {
						console.log(error);
					})
				
			},
			accecptRow(index, row) {
				this.$axios.get('valuableReport', {
						params: {
							reportId: row.id,
						}
					}).then(response => {
						location.reload()
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
						location.reload()
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
		margin-top: 40px;
		width: 740px;
		height: 340px;
	}
	.reportList {
		margin-left: 200px;
		margin-top: -10px;
		margin-left: 0px;
	}
</style>
