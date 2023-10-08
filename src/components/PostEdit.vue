<template>
  <div class="bg-gray-100 min-h-screen py-6">
    <form @submit.prevent="handleUpdatePost" class="max-w-2xl mx-auto">
      <div class="mb-4">
        <input
          v-model="post.title"
          id="title"
          type="text"
          class="text-2xl font-semibold w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div class="mb-4">
        <textarea
          v-model="post.content"
          id="content"
          class="text-gray-700 w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          rows="6"
          required
        ></textarea>
      </div>
      <div class="text-right">
        <button
          type="submit"
          class="mt-4 mr-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          更新
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { mapActions } from "vuex";

export default {
  data() {
    return {
      post: {
        id: this.$route.params.id,
        title: "",
        content: "",
        updatedAt: new Date(),
      },
    };
  },
  async mounted() {
    await this.fetchPost();
  },
  methods: {
    ...mapActions("posts", ["updatePost", "getPostById"]),
    async fetchPost() {
      this.post = await (this as any).getPostById(this.post.id);
    },
    async handleUpdatePost() {
      await (this as any).updatePost(this.post);
      this.$router.push(`/post/${this.post.id}`);
    },
  },
};
</script>
