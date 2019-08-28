<template>
	<div>
		<el-dialog title="发布回复" :visible.sync="formDialogVisible" :before-close="handleClose">
			<el-row>
				<mavon-editor v-model="form.content" placeholder="请输入回复内容" defaultOpen="edit" :boxShadow="false">
				</mavon-editor>
			</el-row>
			<div slot="footer" class="dialog-footer">
				<el-button @click="handleClose">取 消</el-button>
				<el-button type="primary" @click="addReply">确 定</el-button>
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
					content: ''
				},
				formLabelWidth: '120px',
				formDialogVisible: this.visible
			}
		},
		created() {
			//console.log(this.floor);
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
			addReply() {
				if (this.form.content == '')
					this.$alert('内容不能为空')
				else {
					this.$confirm('是否发布回复?', '', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
					}).then(() => {
						this.postToBackEnd();
					}).catch(() => {});
				}
			},
			postToBackEnd() {
				this.$axios
					.post('addComment', {
						fatherId: this.postId,
						content: this.form.content,
						author: this.author,
						avatarUrl: this.avatarUrl,
						fatherNo:this.floor,
					})
					.then(res => {
						if (res.status == 200) {
							this.closeDialog();
							this.$alert('回复发布成功');
							this.form.content = '';
						} else {
							this.$alert('遇到错误，帖子未发布成功');
						}
					})
					.catch(function(error) {
						console.log(error);
					});
				location.reload()
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						this.closeDialog();
					})
					.catch(_ => {});
			}
		},
		props: ['visible', 'postId',
			'author',
			'avatarUrl', 
			'floor',
		]
	}
</script>
