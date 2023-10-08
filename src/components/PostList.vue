<template>
  <div class="bg-gray-100 min-h-screen py-6">
    <div class="max-w-2xl mx-auto">
      <h2 class="text-2xl font-semibold mb-4">ブログ一覧</h2>
      <div
        v-for="post in posts"
        :key="post.id"
        class="bg-white rounded-lg shadow-md p-4 mb-4"
      >
        <router-link :to="`/post/${post.id}`">
          <h2 class="text-xl font-semibold mb-2">{{ post.title }}</h2>
          <p class="text-gray-700">{{ post.content }}</p>
          <p class="text-gray-500 text-sm mt-2">作成者: {{ post.userName }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState, mapActions } from "vuex";

export default {
  computed: mapState("posts", ["posts"]),
  methods: {
    ...mapActions("posts", ["getPosts"]),
  },
  created() {
    (this as any).getPosts();
  },
};
</script>
