<template>
  <div>
    <el-card shadow="hover">
    <el-row>当前热门</el-row>
    <el-rol>
    <el-table
    :data="post"
    :show-header="false"
    @row-click="handleRowClick"
    style="width: 100%">
    <el-table-column
      prop="title"
      label="标题"
      width="290">
    </el-table-column>
  </el-table>
    </el-rol>
    </el-card>
  </div>
</template>

<script>
    export default {
        name: "HotPosts",
        created() {
            this.getHotPosts()
        },
        data() {
            return {
                post: []
            }
        },
        methods: {
            getHotPosts() {
                this.$axios
                    .get('findPostWithFilterAndPaging', {
                        params: {
                            sortedby: 'replyNum',
                            order: 'desc',
                            days: 1,
                            page: 1,
                            size: 7
                        }
                    })
                    .then(res => {
                        console.log(res)
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

</style>
