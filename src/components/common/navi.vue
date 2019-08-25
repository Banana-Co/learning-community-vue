<template>
	<div>
		<h4>排序方式</h4>
		<el-menu default-active="activeIndex" class="el-menu-vertical-demo" @select="handleSelect">
			<el-menu-item index="1">
				<i class="el-icon-setting"></i>
				<span slot="title">最新发布</span>
			</el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-setting"></i>
        <span slot="title">最早发布</span>
      </el-menu-item>
			<el-menu-item index="3">
				<i class="el-icon-setting"></i>
				<span slot="title">最新回复</span>
			</el-menu-item>
		</el-menu>
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
				if (key == 1)
				    this.$emit('sort-change', {sortedby: 'createdDate', order: 'desc'});
				else if (key == 2)
				    this.$emit('sort-change', {sortedby: 'createdDate', order: 'asc'});
			}
		}
	}
</script>

<style>
</style>
