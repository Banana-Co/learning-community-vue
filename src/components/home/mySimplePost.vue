<template>
	<div class="myPostCard">
		<el-card >
			<!--      <div slot="header" class="clearfix">
        <el-row type="flex" justify="middle">
          <el-col :span="4"> 我的帖子 </el-col>
          <el-col :span="4" :offset="16"> <el-button size="mini" @click="toMyPost">查看全部</el-button> </el-col>
        </el-row>
      </div> -->
			<div class="myPostList">
				<el-table :data="this.post" style="width: 100%" height="250" :default-sort="{prop: 'createdDate', order: 'descending'}"
				 @row-click="handleRowClick">
					<el-table-column prop="title" label="标题" width="250">
					</el-table-column>
					<el-table-column prop="createdDate" label="时间"  :formatter="formatter">
					</el-table-column>
					<el-table-column prop="replyNum" label="回复数" >
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
		props: ['post'],
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
	.myPostCard {
		margin-top: 20px;
		width: 793px;
		height: 270px;
	}
	.myPostList{
		margin-top: -10px;
		margin-left: 0px;
	}
</style>
