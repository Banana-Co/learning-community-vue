<template>
	<div class="inPost">
		<el-card>
			<el-row>
				<el-col :span="4">
					<el-row>
						<el-avatar :src="this.con.avatarUrl" :size="60"></el-avatar>
					</el-row>
					<el-row>{{this.con.author}}</el-row>

				</el-col>
				<el-col :span="20">
					<div class='floor'><span>#{{this.con.no}}</span></div>
					<div class="reply" v-if="isReply"><span>回复#{{this.con.fatherNo}}</span></div>
					<el-row>
						<div class="inner">
							<mavon-editor v-model="con.content" :subfield="false" :defaultOpen="defaultData" :toolbarsFlag="false"
							 :boxShadow="false" />
						</div>
					</el-row>
					<br />
					<el-row>
						<div class="but">
							<span>{{formattedDate}}</span>
							<el-button size="mini">举报</el-button>
							<el-button size="mini" @click="replyDialogVisible=true">回复</el-button>
							<el-button size="mini" @click="like" :icon="icon">{{this.con.likeNum}}</el-button>
						</div>
					</el-row>
					<reply-dialog :postId="this.$route.params.id" :visible.sync="replyDialogVisible" :author="name" :avatarUrl="avatarUrl"
					 :floor='this.con.no'></reply-dialog>


				</el-col>
			</el-row>
		</el-card>
	</div>
</template>

<script>
	import {
		dateFormat
	} from "../../assets/js/time.js";
	import ReplyDialog from "../message/ReplyDialog";
	export default {
		name: "InPost",
		components: {
			ReplyDialog,
		},
		data() {
			return {
				replyDialogVisible: false,
				isReply: false,
				father: {
					name: '',
					content: '',
				},
				defaultData: "preview",
				isLiked: false,
				icon: 'el-icon-star-off',
			}
		},
		created() {
			if (this.con.fatherNo != 0 && this.con.fatherNo != -1) {
				this.isReply = true;
			}
			this.$axios.get('haveLiked', {
					params: {
						fatherId: this.con.fatherId,
						no: this.con.no,
						username: this.name,
					}
				}).then(response => {
					//console.log(response.data.code);
					if (response.data.code == 203) {
						this.icon = 'el-icon-star-off';
						this.isLiked=false;
					} else if (response.data.code == 202) {
						this.icon = 'el-icon-star-on';
						this.isLiked=true;
					} else {
						console.log(response);
					}
				})
				.catch(function(error) {
					console.log(error);
				})
		},
		computed: {
			formattedDate() {
				return dateFormat(this.con.createdDate);
			}
		},
		methods: { //   时间格式化
			like() {
				this.$axios.get('addLike', {
						params: {
							fatherId: this.con.fatherId,
							no: this.con.no,
							username: this.name,
						}
				
					}).then(res => {
						if(this.isLiked==true){
							this.con.likeNum--;
							this.icon='el-icon-star-off';
							this.isLiked=false;
						}else{
							this.con.likeNum++;
							this.icon='el-icon-star-on';
							this.isLiked=true;
						}
						//console.log(res);
					})
					.catch(function(error) {
						console.log(error);
					})

			},
		},
		props: [
			'id',
			'con',
			'name',
			'avatarUrl',
		]
	}
</script>

<style>
	.inPost {
		margin-left: auto;
		margin-right: auto;
	}

	.right {
		border-left: 1px solid black;
	}

	.inner {
		text-align: left;
		padding: 20px 20px 0 0;
	}

	.reply {
		text-align: left;
	}

	.but {
		line-height: 20px;
		font-size: 12px;
		text-align: right;
		vertical-align: bottom;
		position: absolute;
		right: 0px;
		bottom: 0px;
	}

	.floor {
		position: absolute;
		right: 0px;
		top: 0px;
	}

	.postLeft {
		border-right: 1px solid black;
	}
</style>
