<template>
	<div>
		<el-dialog title="发布题目" :visible.sync="formDialogVisible" :before-close="handleClose">
			<el-row>
				<el-button @click="handleshow1">题面工具栏</el-button><el-button @click="handleshow2">题解工具栏</el-button>
				
			</el-row>

			<el-row>
				<mavon-editor v-model="form.title" placeholder="请输入题面" defaultOpen="edit" :boxShadow="false" :toolbarsFlag="showbar1">
				</mavon-editor>
			</el-row>
			<el-row>
				<mavon-editor v-model="form.content" placeholder="请输入解题思路" defaultOpen="edit" :boxShadow="false" :toolbarsFlag="showbar2">
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
					content: '',
					content2: '',
				},
				formLabelWidth: '120px',
				formDialogVisible: this.visible,
				showbar1: false,
				showbar2: false,
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
			handleshow1() {
				this.showbar1 = !this.showbar1
			},
			handleshow2() {
				this.showbar2 = !this.showbar2
			},
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
						threadId: this.threadId,
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

			// mavonImgAdd(pos, file) {
			// 	// 上传图片
			// 	var formData = new FormData()
			// 	formData.append('image', file)
			// 	this.$axios({
			// 		url: "http://localhost:8000/uploadFile", //请求地址
			// 		method: 'post',
			// 		data: formData,
			// 		headers: {
			// 			'Content-Type': 'multipart/form-data'
			// 		}
			// 	}).then((res) => {
			// 		console.log(res)
			// 		// 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
			// 		/**
			// 		 * $vm 指为mavonEditor实例，可以通过如下两种方式获取
			// 		 * 1.  通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
			// 		 * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
			// 		 * 3. 由于vue运行访问的路径只能在static下，so，我就把图片保存到它这里了
			// 		 */
			// 		
			// 	})
			// },


		},
		props: ['visible',
			'author',
			'avatarUrl',
			'threadId',
		]
	}
</script>
