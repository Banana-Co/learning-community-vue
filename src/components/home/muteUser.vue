<template>
	<div>
		<el-card class="mute-card">
			<div>
				<el-table :data="this.user" style="width: 100%" height="300" :default-sort="{prop: 'createdDate', order: 'descending'}"
				 >
					<el-table-column prop="username" label="禁言人" width="150">
					</el-table-column>
					<el-table-column prop="prestige" label="声望">
					</el-table-column>
					<el-table-column fixed="right" width="200" label="处理意见">
						<template slot-scope="scope">
							<el-button size="mini" @click.stop="accecptRow(scope.$index, scope.row)">取消禁言</el-button>
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
		props: ['user'],
		methods: {
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
		}
	}
</script>

<style>
	.mute-card{
		width: 500px;
	}
</style>
