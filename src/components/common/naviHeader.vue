<template>
	<div>
		<el-col :span="16" :offset="4">
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				<el-menu-item index="1"><i class="el-icon-document"></i>
					<span slot="title">课程推荐</span></el-menu-item>
				<el-menu-item index="2"><i class="el-icon-document"></i>
					<span slot="title">校园周边</span></el-menu-item>
				<el-menu-item index="3"><i class="el-icon-document"></i>
					<span slot="title">刷题</span></el-menu-item>
			</el-menu>
		</el-col>
	</div>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			handleSelect(key, keyPath) {
				this.$store.dispatch('changethreadId',key)
				this.$router.push(
					`/forum/${key}`
				)
				//location.reload()
			},
		},
		props: [
			'activeIndex',
		],
	}
</script>

<style>
</style>
