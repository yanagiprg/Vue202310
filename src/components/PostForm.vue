<template>
  <div class="bg-gray-100 min-h-screen py-6">
    <div class="max-w-2xl mx-auto bg-white rounded shadow-md p-6">
      <h2 class="text-2xl font-semibold mb-4">記事投稿</h2>
      <form @submit.prevent="addPost">
        <div class="mb-4">
          <label
            for="title"
            class="block text-gray-600 text-sm font-medium mb-2"
            >タイトル</label
          >
          <input
            v-model="post.title"
            id="title"
            name="title"
            type="text"
            placeholder="タイトルを入力"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div class="mb-4">
          <label
            for="content"
            class="block text-gray-600 text-sm font-medium mb-2"
            >内容</label
          >
          <textarea
            v-model="post.content"
            id="content"
            name="content"
            placeholder="内容を入力"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            rows="6"
            required
          ></textarea>
        </div>
        <div class="text-right">
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            保存
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="">
import { mapActions } from "vuex";

export default {
  props: {
    user: Object,
  },
  data() {
    return {
      post: {
        title: "",
        content: "",
        userId: "",
        userName: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };
  },
  created() {
    this.post.userId = this.user.uid;
    this.post.userName = this.user.email;
  },
  methods: {
    ...mapActions("posts", ["createPost"]),
    resetPost() {
      this.post.title = "";
      this.post.content = "";
    },
    addPost() {
      if (this.post.title && this.post.content && this.user) {
        this.createPost(this.post);
        this.resetPost();
        this.$router.push("/");
      } else {
        alert("タイトルと内容を入力してください");
      }
    },
  },
};
</script>
