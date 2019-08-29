<template>
    <el-row>
      <el-col :span="4"></el-col>
      <el-col :span="16" :offset="4">
        <el-alert v-if="noPostFound" type="info" :closable="false" title="不好意思，找不到你要的帖子"></el-alert>
        <el-alert v-if="!noPostFound" type="success" :closable="false" :title="'共找到关于' + keyword + '的帖子' + totalPostNum + '条'"></el-alert>
        <out-post v-for="post in postPage" :key="post.id" :id="post.id" :con='post' :name='name' :isPublish='isPublish' :isReply='isReply'></out-post>
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage"
                       :page-size="10" layout="prev, pager, next, jumper" :total="totalPostNum" :hide-on-single-page="true">
        </el-pagination>
      </el-col>
    </el-row>
</template>

<script>
    import OutPost from "./outPost";
    import {sortByField} from "../../assets/js/sort";
    export default {
        name: "SearchResult",
        components: {OutPost},
        created() {
          this.getPost();
        },
        computed: {
            postPage: function () {
                return this.posts.sort(sortByField(this.sortedby, this.order)).slice((this.currentPage - 1)*10, this.currentPage * 10)
            }
        },
        data() {
            return {
                keyword: this.$route.params.keyword,
                posts: [],
                sortedby: 'latestReplyDate',
                order: 'desc',
                currentPage: 1,
                totalPostNum: 0,
                noPostFound: false
            }
        },
        methods: {
            getPost() {
                this.$axios
                    .get(`findPostByKeyword=${this.keyword}`)
                    .then(res => {
                        this.posts = res.data
                        this.totalPostNum = this.posts.length
                        if (this.totalPostNum == 0)
                            this.noPostFound = true
                    })
                    .catch(function(err) {
                      console.log(err)
                    })
            },
            handleCurrentChange(val) {
                this.currentPage = val
            }
        }
    }
</script>

<style>
  .el-alert {
    margin-top: 10px;
    margin-bottom: 10px
  }
</style>
