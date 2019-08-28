<template>
  <div>
    <span>{{this.postDetail.title}}</span>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="4">
        <navi></navi>
      </el-col>
      <el-col :span="16">
<!--        <in-post :content="postDetail.content" :author="postDetail.author"></in-post>-->
        <in-post v-for="reply in replies" :key="reply.createdDate" :content="reply.content" :author="reply.author" :createdDate="reply.createdDate"></in-post>
      </el-col>
    </el-row>
  <el-row>
    <el-button @click="replyDialogVisible=true"> 发表回复 </el-button>
    <reply-dialog :post-id="this.$route.params.id" :visible.sync="replyDialogVisible"></reply-dialog>
  </el-row>
  </div>
</template>

<script>
	import InPost from "@/components/common/inPost.vue";
  import OutPost from "./outPost";
  import ReplyDialog from "../message/ReplyDialog";
  import navi from "@/components/common/navi.vue"
	export default {
      components: {
          OutPost,
          InPost,
          ReplyDialog,
          navi
      },
      data() {
        return {
            postDetail: {},
            replies: [],
            replyDialogVisible: false
        }
      },
      methods: {
          getPostDetail() {
              this.$axios
                  .get(`findPostById=${this.$route.params.id}`)
                  .then(res => {
                      console.log(res.data)
                      this.postDetail = res.data;
                  })
                  .catch(function (error) {
                      console.log(error);
                  })
          },
          getReply() {
              this.$axios
                  .get(`findCommentByFatherId=${this.$route.params.id}`)
                  .then(res => {
                      console.log(res.data)
                      this.replies = res.data;
                  })
                  .catch(function (error) {
                      console.log(error);
                  })
          },
          handleClickReturn() {
              this.$router.push({
                  path: "/forum"
              })
          }
      },
      created: function () {
          this.getPostDetail();
          this.getReply()
      }
  }
</script>

<style>
</style>
