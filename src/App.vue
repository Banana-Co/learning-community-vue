<template>
  <div id="app">
    <blog-header></blog-header>
    <router-view/>
  </div>
	
</template>

<script>
import blogHeader from "@/components/common/BlogHeader.vue";
import post from "@/components/common/post.vue";
export default {
  name: "App",
  components: { blogHeader,post }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>
