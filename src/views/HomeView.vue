<template>
  <div class="home">
    <post-list />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PostList from "@/components/PostList.vue";

export default Vue.extend({
  name: "HomeView",
  components: {
    PostList,
  },
});
</script>
