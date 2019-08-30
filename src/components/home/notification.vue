<template>
	<div>
		<el-card class="box-card">
			<div>
				<el-table :data="this.notiData" style="width: 100%" height="250" ref="filterTable" :row-class-name="tableRowClassName"
				 :default-sort="{prop: 'read', order: 'ascending'}">
					<el-table-column prop="username" label="通知" width="100" sortable>
					</el-table-column>
					<el-table-column prop="notifiDate" label="时间" width="200" :formatter="formatterDate" sortable>
					</el-table-column>
					<el-table-column prop="message" :formatter="formatterMessage">
					</el-table-column>
					<el-table-column prop="read" label="类型" :filter-method="filterType" :filters="[{ text: '点赞', value: 1 }, { text: '评论', value: 2 }]"
					 filter-placement="bottom-end">{{this.Read}}
					</el-table-column>
					<el-table-column fixed="right" label="操作" width="120">
						<template slot-scope="scope">
							<el-button @click.native.prevent="deleteRow(scope.$index, notiData)" type="text" size="small">
								标为已读
							</el-button>
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
		props: ['notiData','name'],
		methods: {
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
				if(row.message.length>27){
					let str = row.message.slice(0,27)+"...\"";
					return str;
				}
				return row.message;
			},
			formatterDate(row, column) {
				return dateFormat(row.notifiDate);
			},
			deleteRow(index, rows) {
				console.log(this.notiData);
				//rows.splice(index, 1);
				this.$axios.get('readNotifi', {
						params: {
							username: this.name,
							notiNo: this.notiData,
						}
					}).then(response => {
						//console.log(response.data.code);
						if (response.data.code == 200) {
							//console.log('success');
							location.reload()
						} else {
							//console.log(response);
						}
					})
					.catch(function(error) {
						console.log(error);
					})
				
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
