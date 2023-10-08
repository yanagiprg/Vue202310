<template>
  <div class="post-detail bg-gray-100 min-h-screen py-6">
    <div class="max-w-2xl mx-auto">
      <h2 class="text-2xl font-semibold mb-4">{{ post.title }}</h2>
      <p class="text-gray-700">{{ post.content }}</p>
      <p class="text-gray-500 text-sm mt-2">作成者: {{ post.userName }}</p>
      <router-link
        v-if="user && user.uid === post.userId"
        :to="`/post/${post.id}/edit`"
        class="mt-4 mr-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        編集
      </router-link>
      <button
        v-if="user && user.uid === post.userId"
        @click.prevent="deletePost"
        class="mt-4 ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
      >
        削除
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState, mapActions } from "vuex";

export default {
  props: {
    user: Object,
  },
  async created() {
    const postId = this.$route.params.id;
    await (this as any).getPostById(postId);
  },
  computed: {
    ...mapState("posts", ["post"]),
  },
  methods: {
    ...mapActions("posts", ["getPostById", "removePost"]),
    async deletePost() {
      const postId = this.$route.params.id;
      await (this as any).removePost(postId);
      this.$router.push("/");
    },
  },
};
</script>
