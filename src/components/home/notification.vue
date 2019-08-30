<template>
	<div>
		<el-card class="box-card">
			<div>
				<el-table :data="this.notiData" style="width: 100%" height="300" ref="filterTable" :row-class-name="tableRowClassName"
				 :default-sort="{prop: 'read', order: 'ascending'}" @row-click="handleRowClick">
					<el-table-column prop="username" label="通知" width="100">
					</el-table-column>
					<el-table-column prop="notifiDate" label="时间" width="200" :formatter="formatterDate" sortable>
					</el-table-column>
					<el-table-column prop="message" :formatter="formatterMessage" label="类型" :filter-method="filterType" :filters="[{ text: '点赞', value: 1 }, { text: '评论', value: 2 }]"
					 filter-placement="bottom-end">
					</el-table-column>
					<el-table-column prop="read" label="显示" :filter-method="filterRead" :filters="[{ text: '未读', value: 0 }, { text: '已读', value: 1 }]"
					 filter-placement="bottom-end">{{this.Read}}
					</el-table-column>
					<el-table-column fixed="right" width="120">
						<template slot="header" slot-scope="scope">
							<el-button size="mini" @click="readAllRow">全部已读</el-button>
						</template>
						<template slot-scope="scope">
							<el-button size="mini" @click.stop="readRow(scope.$index, scope.row)">标为已读</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-card>
	</div>
</template>

<script>
	import {
		dateFormat
	} from "../../assets/js/time.js";
	export default {
		data() {
			return {
				Read: '',
			}
		},
		props: ['notiData', 'name'],
		methods: {
			handleRowClick(row) {
				console.log(row.fatherId)
				this.$router.push(
					`/content/${row.fatherId}`
				)
			},
			tableRowClassName({
				row,
				rowIndex
			}) {
				if (row.read === 0) {
					return 'unRead-row';
				} else if (row.read === 1) {
					return '';
				}
				return '';
			},
			formatterMessage(row, column) {
				if (row.message.length > 27) {
					let str = row.message.slice(0, 27) + "...\"";
					return str;
				}
				return row.message;
			},
			formatterDate(row, column) {
				return dateFormat(row.notifiDate);
			},
			readAllRow() {
				//console.log(this.name)
				this.$axios.get('readAllNotification', {
						params: {
							username: this.name,
						}
					}).then(response => {
						if (response.data.code == 200) {
							location.reload()
						} else {
							console.log(response);
						}
					})
					.catch(function(error) {
						console.log(error);
					})
			
			},
			readRow(index, row) {
				this.$axios.get('readNotifi', {
						params: {
							username: this.name,
							notiNo: row.notifiNo,
						}
					}).then(response => {
						if (response.data.code == 200) {
							location.reload()
						} else {
							console.log(response);
						}
					})
					.catch(function(error) {
						console.log(error);
					})

			},
			filterRead(value, row) {
				return row.read === value;
			},
			filterType(value, row) {
				return row.type === value;
			},
		},
	}
</script>

<style>
	.el-table .unRead-row {
		background: aliceblue;
	}

	.el-table .success-row {
		background: #f0f9eb;
	}
</style>
