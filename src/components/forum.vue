<template>
	<div>
		<div>
			<el-carousel height="400px" type="card">
				<el-carousel-item v-for="item in items" :key="item">
					<el-image style="width: 700px; height: 400px" :src="item"></el-image>
				</el-carousel-item>
			</el-carousel>
			
		</div>
		<h3>监控量:{{count1}}</h3>
		<!-- <h3>计算:{{this.$store.getters.getStateCount}}</h3> -->
		<button @click="addFun">+</button>
		<button @click="minusFun">-</button>
		<el-row>
			<el-col :span="4">
				<el-button>发布帖子 </el-button>
			</el-col>
			<el-col :span="16">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
				 :page-size="20" layout="prev, pager, next, jumper" :total="1000" :hide-on-single-page="true"> </el-pagination>

			</el-col>
		</el-row>
		<el-row>
			<el-col :span="4">
				<navi></navi>
			</el-col>
			<el-col :span="16">
				<outpost></outpost>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import outpost from "@/components/common/outPost.vue";
	import navi from "@/components/common/navi.vue";
	import {mapState,mapActions,mapGetters} from 'vuex';
	export default {
		components: {
			outpost,
			navi
		},
		computed: {
			...mapState({
				count1:state=>state.count
			})
		},
		methods: {
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			addFun(){
				//this.$store.commit("add");
				this.$store.dispatch("addFun");
			},
			minusFun(){
				//this.$store.commit("reduction");
				this.$store.dispatch("reductionFun");
			}
		},
		data() {
			return {
				currentPage: 1,
				items: [require("@/assets/access.jpg"), require("@/assets/access1.jpg"), require("@/assets/default-8.png")]
			};
		}
	};
</script>

<style>
</style>
