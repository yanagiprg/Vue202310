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
import PostForm from "@/components/post/PostForm.vue";

export default {
  components: {
    PostForm,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("auth", ["authUser"]),
  },
  methods: {
    ...mapActions("posts", ["createPost"]),
    ...mapActions("utils", ["openDialog", "setLoading"]),
    async addPost(payload) {
      if (!payload || !payload.post) {
        console.error("無効なペイロード:", payload);
        return;
      }
      if (!payload.post.title || !payload.post.content) {
        console.error("必要な投稿プロパティが不足しています:", payload.post);
        alert("タイトルと内容を入力してください");
        return;
      }
      if (!payload.post.userId) {
        console.error("ユーザーIDがありません:", payload.post);
        return;
      }

      this.setLoading(true);
      payload.post.tags = payload.tags;
      const isPost = await this.createPost({
        post: payload.post,
        image: payload.image,
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
    },
  },
};
</script>
