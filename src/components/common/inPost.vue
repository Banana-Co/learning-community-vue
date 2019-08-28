<template>
	<div>
		<el-card  class="inPost">
		<el-row>
			<el-col :span="4">
				<el-row><el-avatar  :src="this.con.avatarUrl"  :size="60"></el-avatar></el-row>
				<el-row>{{this.con.author}}</el-row>
			</el-col>
			<el-col :span="20">
					<div class="inner"><span>{{this.con.content}}</span></div>
					<div class="but">
						<span>{{this.con.no}}楼</span>
						<span>{{formattedDate}}</span>
						<span>举报</span>
						<span>回复</span>
						<span @click="like">点赞:{{this.con.likeNum}}</span>
					</div>
			</el-col>
		</el-row>
		</el-card>
	</div>
</template>

<script>
	import {dateFormat} from "../../assets/js/time.js";

  export default {
	    name: "InPost",
		data() {
			return {
			}
		},
		created() {
			console.log(this.con.id+':'+this.con.content)
		},
      computed : {
	        formattedDate: function() {
	            return dateFormat(this.con.createdDate)
          }
      },
		methods: { //   时间格式化
			like(){
				this.$axios.post('like',{id:this.id}).then(res => {
						this.posts = res.data.content;
						//console.log(this.posts);
						this.totalPostNum = res.data.totalElements;
					})
					.catch(function(error) {
						console.log(error);
					})
			}
		},
      props: [
          'id',
		  'con',
      ]
	}
</script>

<style>
	.inPost {
		margin-left: auto;
		margin-right: auto;
		margin-top: 1px;
		border: 1px solid gainsboro;
	}

	.inner {
		text-align: left;
		padding: 20px 20px 0 0;
	}

	.but {
		line-height: 20px;
		font-size: 12px;
		text-align: right;
		vertical-align: bottom;
		position:absolute;right:0px;bottom:0px;
	}
</style>
