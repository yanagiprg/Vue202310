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
        <div class="mb-4">
          <label
            for="image"
            class="block text-gray-600 text-sm font-medium mb-2"
            >画像</label
          >
          <input type="file" @change="onFileChange" />
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
    authUser: Object,
  },
  data() {
    return {
      post: {
        title: "",
        content: "",
        imageUrl: "",
        userId: "",
        userName: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      image: null,
    };
  },
  created() {
    this.post.userId = this.authUser.uid;
    this.post.userName = this.authUser.displayName;
  },
  methods: {
    ...mapActions("posts", ["createPost"]),
    ...mapActions("utils", ["openDialog", "setLoading"]),
    resetPost() {
      this.post.title = "";
      this.post.content = "";
      this.image = null;
    },
    async addPost() {
      if (this.post.title && this.post.content && this.authUser) {
        this.setLoading(true);
        const isPost = await this.createPost({
          post: this.post,
          image: this.image,
        });
        this.setLoading(false);
        this.resetPost();
        if (isPost) {
          this.openDialog({
            message: "投稿しました",
            success: true,
            targetLocation: "/",
          });
        } else {
          this.openDialog({
            message: "投稿に失敗しました",
            success: false,
          });
        }
      } else {
        alert("タイトルと内容を入力してください");
      }
    },
    onFileChange(event) {
      this.image = event.target.files[0];
    },
  },
};
</script>
