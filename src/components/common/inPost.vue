<template>
	<div class="inPost">
		<el-row>
			<el-col :span="4">
				<el-avatar icon="el-icon-user-solid"></el-avatar></br>name
			</el-col>
			<el-col :span="20">
					<div class="inner"><span>监控量:{{this.$store.state.count}}</span></div>
					<div class="but">
						<span>举报</span>
						<span>楼层</span>
						<span>{{dateFormat(time)}}</span>
						<span>回复</span>
					</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	var t = new Date();
	export default {
		data() {
			return {
				time: t,
			}
		},
		methods: { //   时间格式化
			dateFormat: function(time) {
				var date = new Date(time);
				var year = date.getFullYear();
				/* 在日期格式中，月份是从0开始的，因此要加0
				 * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
				 * */
				var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
				var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
				var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
				var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
				var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				// 拼接
				return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
			},
		}
	}
</script>

<style>
	.inPost {
		width: 1000px;
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
		font-size: 1px;
		text-align: right;
		vertical-align: bottom;
		/* position:absolute;right:0px;bottom:0px; */
	}
</style>
