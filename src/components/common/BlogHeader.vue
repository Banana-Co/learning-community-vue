<template>
	<div id="header" class="header">
		<el-row>

			<el-col :span="4">
				<el-button type="text"><img src="@/assets/logo2.png" alt="" @click="ToForum" height="40px"></el-button>
			</el-col>
			<el-col :span="6" :offset="14">
				<el-button type="text" @click="ToIndex">
					<el-avatar :src="avatarUrl" :size="60"></el-avatar>
				</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				<el-menu-item index="1"><i class="el-icon-document"></i>
					<span slot="title">课程推荐</span></el-menu-item>
				<el-menu-item index="2"><i class="el-icon-document"></i>
					<span slot="title">刷题</span></el-menu-item>
				<el-menu-item index="3"><i class="el-icon-document"></i>
					<span slot="title">校园周边</span></el-menu-item>
			</el-menu>
		</el-row>
	</div>
</template>

<style>
	.header {
		margin-left: 120px;
		margin-right: 120px;
	}
</style>

<script>
	import {
		setCookie,
		getCookie,
		delCookie
	} from '../../assets/js/cookie.js'
	export default {
		name: 'BlogHeader',
		data() {
			return {
				input: '',
				select: '',
				activeIndex: '1',
				avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
				name: '',
			}
		},
		created() {
			let uname = getCookie('username')
			this.name = uname
			if (this.name != '') {
				this.$axios.get(`/getUser/${this.name}`).then((response) => {
					this.time = response.data.createdDate
					if (response.data.avatarUrl != '') {
						this.avatarUrl = response.data.avatarUrl
					}
				})
			}
		},
		methods: {
			ToIndex() {
				if (this.name == '') {
					this.$router.push(
						'/login'
					)
				} else {
					this.$router.push(
						'/index'
					)
				}
			},
			ToForum() {
				this.$router.push({
					path: '/forum'
				})
			},
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
				this.$router.push({
					path: '/forum'
				})
			},
		}
	}
</script>
