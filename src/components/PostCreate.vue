<template>
  <div class="bg-gray-100 min-h-screen py-6">
    <div class="max-w-2xl mx-auto bg-white rounded shadow-md p-6">
      <h2 class="text-2xl font-semibold mb-4">記事投稿</h2>
      <post-form v-if="authUser" :authUser="authUser" @submit="addPost" />
    </div>
  </div>
</template>

<script lang="ts">
import { mapActions, mapState } from "vuex";
import PostForm from "./PostForm.vue";

export default {
  components: {
    PostForm,
  },
  data(): any {
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
    };
  },
  computed: {
    ...mapState("auth", ["authUser"]),
  },
  methods: {
    ...mapActions("posts", ["createPost"]),
    ...mapActions("utils", ["openDialog", "setLoading"]),
    async addPost({ post, tags, image }) {
      if (post.title && post.content && post.userId) {
        this.setLoading(true);
        post.tags = tags;
        const isPost = await this.createPost({
          post,
          image,
        });
        this.setLoading(false);
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
  },
};
</script>
