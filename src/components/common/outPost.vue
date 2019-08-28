<template>
	<div>
		<el-card shadow="hover" class="outPost" @click.native="ToContent">
      <el-row>
        <div class="top">
          <span>作者: {{this.con.author}}</span>
          <span>回复数: {{this.con.replyNum}}</span>
          <span>最新回复: {{formattedLatestReplyDate}}</span>
          <span>发布时间: {{formattedCreatedDate}}</span>
        </div>
      </el-row>
      <el-row>
			<el-col :span="4">
				<div class="avatar">
					<el-avatar :src="this.con.avatarUrl" :size="60"></el-avatar>
				</div>
			</el-col>
			<el-col :span="20">
				<div class="inner">{{this.con.title}}</div>
			</el-col>
      </el-row>
		</el-card>


	</div>
</template>

<script>
	import {dateFormat} from "../../assets/js/time";
  export default {
      computed: {
          formattedCreatedDate: function () {
              return dateFormat(this.con.createdDate)
          },
          formattedLatestReplyDate: function () {
              return dateFormat(this.con.latestReplyDate)
          }
      },
		methods: {
			ToContent() {
				this.$router.push(
					`/content/${this.id}`
				)
			},
		},
		props: [
			'id',
			'con',
		]
	}
</script>

<style>
	.outPost {
		height: 100px;
		margin-left: auto;
		margin-right: auto;
		margin-top: 15px;
		margin-bottom: 15px;
	}
  .inner {
    text-align: left;
    padding: 20px 20px 0 0;
  }
  .top {
    line-height: 20px;
    font-size: 12px;
    text-align: left;
    vertical-align: top;
    position: absolute;
    left: 0px;
    bottom: 0px;
  }
</style>
