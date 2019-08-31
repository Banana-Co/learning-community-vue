<template>
	<div class="hotPostDiv">
		<el-card shadow="hover" class="hotPostCard">
			<el-row>公 告 区</el-row>
      <el-row>
			<el-table :data="announce" :show-header="false" @row-click="handleRowClick" style="width: 100%">
				<el-table-column prop="title" label="标题" width="250">
				</el-table-column>
			</el-table>
      </el-row>
      <el-row>当前热门 🔥</el-row>
			<!-- <el-divider class = hotpostDivider></el-divider> -->
			<el-row>
      <el-table :data="post" :show-header="false" @row-click="handleRowClick" style="width: 100%">
				<el-table-column prop="title" label="标题" width="250">
				</el-table-column>
			</el-table>
      </el-row>
		</el-card>
	</div>
</template>

<script>
	export default {
		name: "HotPosts",
		created() {
			this.getAnnounce()
			this.getHotPosts()
		},
		data() {
			return {
				post: [],
				announce:[],
			}
		},
		methods: {
			getAnnounce(){
				this.$axios
					.get('getThreadPostByPage', {
						params: {
							page: 1,
							sortedby: 'replyNum',
							order: 'desc',
							days: 1,
							threadId: 0
						}
					})
					.then(res => {
						this.announce = res.data.content
					})
					.catch(function(err) {
						console.log(err)
					})
			},
			getHotPosts() {
				this.$axios
					.get('findPostWithFilterAndPaging', {
						params: {
							sortedby: 'replyNum',
							order: 'desc',
							days: 1,
							page: 1,
							size: 4
						}
					})
					.then(res => {
						//console.log(res)
						this.post = res.data.content
					})
					.catch(function(err) {
						console.log(err)
					})
			},
			handleRowClick(row) {
				console.log(row.id)
				this.$router.push(`content/${row.id}`)
			}
		}
	}
</script>

<style scoped>

	.el-row {
    margin-bottom: 20px;
    &:last-child {
     margin-bottom: 0;
   }
	}
  .hotPostDiv{
	 margin-top: 13px;
	 height: 400px;
	 width: 300px;
  }
  .hotPostCard{
	  height: 400px;
	  width: 300px;
  }

  .hotpostDivider{
	  height: 3px;
	  margin-bottom: 10px;
	  margin-top: 10px
  }

</style>
