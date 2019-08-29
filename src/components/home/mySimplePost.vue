<template>
	<div>
		<el-card class="box-card">
			<div>
				<el-table :data="this.notiData" style="width: 100%" max-height="250" ref="filterTable" :row-class-name="tableRowClassName"
				 :default-sort="{prop: 'read', order: 'ascending'}">
					<el-table-column prop="username" label="通知" width="100" sortable>
					</el-table-column>
					<el-table-column prop="notifiDate" label="时间" width="200" :formatter="formatter" sortable>
					</el-table-column>
					<el-table-column prop="message">
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
</script>

<style>
</style>
