<template>
	<div>
		<h5>板块</h5>
		
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
			<el-menu-item index="1"><i class="el-icon-document"></i>
				<span slot="title">课程推荐</span></el-menu-item>
			<el-menu-item index="2"><i class="el-icon-document"></i>
				<span slot="title">刷题</span></el-menu-item>
			<el-menu-item index="3"><i class="el-icon-document"></i>
				<span slot="title">校园周边</span></el-menu-item>
				<el-menu-item index="4"><i class="el-icon-document"></i>
					<span slot="title">账户管理</span></el-menu-item>
		</el-menu>
<!-- <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
			<el-menu-item index="1">
				<i class="el-icon-document"></i>
				<span slot="title">课程推荐</span>
			</el-menu-item>
			<el-menu-item index="2">
				<i class="el-icon-document"></i>
				<span slot="title">刷题</span>
			</el-menu-item>
			<el-menu-item index="3">
				<i class="el-icon-document"></i>
				<span slot="title">校园周边</span>
			</el-menu-item> -->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: '1',
			};
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>

<style>
</style>
