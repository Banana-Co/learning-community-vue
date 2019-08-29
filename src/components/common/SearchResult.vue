<template>
    <el-row>
      <el-col :span="4"></el-col>
      <el-col :span="16" :offset="4">
        <h1 v-if="noPostFound"> 不好意思哈，找不到你要的帖子 </h1>
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
                    .get(`findPostByKeyword=${(this.$route).params.keyword}`)
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

</style>
