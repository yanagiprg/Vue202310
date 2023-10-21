<template>
  <div class="bg-gray-100 min-h-screen py-6">
    <form
      @submit.prevent="handleUpdatePost"
      class="max-w-2xl mx-auto bg-white border border-blue-300 p-8"
    >
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
      <div class="mb-4">
        <label
          for="tagInput"
          class="block text-gray-600 text-sm font-medium mb-2"
          >タグ</label
        >
        <div class="flex items-center">
          <input
            v-model="tagInput"
            id="tagInput"
            name="tagInput"
            type="text"
            placeholder="タグを入力"
            class="w-10/12 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
          <button
            type="button"
            @click="addTag"
            class="ml-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            追加
          </button>
        </div>
      </div>
      <div class="mb-4">
        <span
          v-for="(tag, index) in post.tags"
          :key="index"
          class="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm mr-2"
        >
          {{ tag }}
          <span class="mx-1 cursor-pointer" @click="removeTag(index)">×</span>
        </span>
      </div>
      <div class="mb-4">
        <label for="image" class="block text-gray-600 text-sm font-medium mb-2"
          >画像</label
        >
        <input type="file" @change="onFileChange" />
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
  data(): any {
    return {
      post: {
        id: this.$route.params.id,
        title: "",
        content: "",
        imageUrl: "",
        updatedAt: new Date(),
        tags: [],
      },
      image: null,
      tagInput: "",
    };
  },
  async mounted() {
    await this.fetchPost();
  },
  methods: {
    ...mapActions("posts", ["updatePost", "getPostById"]),
    ...mapActions("utils", ["openDialog", "setLoading"]),
    async fetchPost() {
      this.post = await this.getPostById(this.post.id);
      this.tagInput = "";
    },
    async handleUpdatePost() {
      this.setLoading(true);
      const isUpdate = await this.updatePost({
        post: this.post,
        image: this.image,
      });
      this.setLoading(false);
      if (isUpdate) {
        this.openDialog({
          message: "投稿を更新しました",
          success: true,
          targetLocation: `/post/${this.post.id}`,
        });
      } else {
        this.openDialog({
          message: "投稿の更新に失敗しました。",
          success: false,
        });
      }
    },
    addTag() {
      if (this.tagInput.trim() !== "") {
        this.post.tags.push(this.tagInput.trim());
        this.tagInput = "";
      }
    },
    removeTag(index) {
      this.post.tags.splice(index, 1);
    },
    onFileChange(event) {
      this.image = event.target.files[0];
    },
  },
};
</script>
