<template>
	<div>
		<el-dialog title="推荐课程" :visible.sync="formDialogVisible" :before-close="handleClose">
			<el-row>
				<el-input v-model="form.title" placeholder="请输入推荐课程名" autocomplete="off"></el-input>
			</el-row>
			<el-row>
				<mavon-editor 
					v-model="form.content" 
					placeholder="请输入推荐理由" 
					defaultOpen="edit" 
					:boxShadow="false">
				</mavon-editor>
			</el-row>
			<div slot="footer" class="dialog-footer">
				<el-button @click="handleClose">取 消</el-button>
				<el-button type="primary" @click="addPost">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<style>
	.el-row {
		margin-bottom: 20px;

		&:last-child {
			margin-bottom: 0;
		}
	}
</style>

<script>
	export default {
		data() {
			return {
				form: {
					title: '',
					content: ''
				},
				formLabelWidth: '120px',
				formDialogVisible: this.visible
			}
		},
		watch: {
			formDialogVisible(val) {
				this.$emit('update:visible', val)
			},
			visible(val) {
				this.formDialogVisible = val
			}
		},
		methods: {
			closeDialog() {
				this.formDialogVisible = false;
			},
			addPost() {
				if (this.form.title == '' || this.form.content == '')
					this.$alert('标题或内容不能为空')
				else {
					this.$confirm('是否发布帖子?', '', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
					}).then(() => {
						this.postToBackEnd();
					}).catch(() => {});
				}
			},
			postToBackEnd() {
				this.$axios
					.post('addPost', {
						title: this.form.title,
						content: this.form.content,
						author: this.author,
						replyNum: 0,
						likeNum: 0,
						avatarUrl: this.avatarUrl,
						no: 0,
						threadId:this.threadId,
					})
					.then(res => {
						if (res.status == 200) {
							this.closeDialog();
							this.$alert('帖子发布成功');
							this.form.title = '';
							this.form.content = '';
						} else {
							this.$alert('遇到错误，帖子未发布成功');
						}
					})
					.catch(function(error) {
						console.log(error);
					});
				location.reload();
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						this.closeDialog();
					})
					.catch(_ => {});
			},
			
			
		},
		props: ['visible',
			'author',
			'avatarUrl',
			'threadId',
		]
	}
</script>
