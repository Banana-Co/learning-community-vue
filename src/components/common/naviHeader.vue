<template>
	<div>
		<el-col :span="2"></el-col>
		<el-col :span="18" :offset='2'>
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				<el-menu-item index="1"><i class="el-icon-document"></i>
					<span slot="title">课程推荐</span></el-menu-item>
				<el-menu-item index="2"><i class="el-icon-document"></i>
					<span slot="title">校园周边</span></el-menu-item>
				<el-menu-item index="3"><i class="el-icon-document"></i>
					<span slot="title">刷题</span></el-menu-item>

			</el-menu>
		</el-col>
		<el-col :span="4"></el-col>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: '1',
			}
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
				this.$router.push({
					path: '/forum'
				})
			},
		}
	}
</script>

<style>
</style>
