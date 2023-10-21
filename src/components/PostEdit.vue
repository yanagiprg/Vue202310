<template>
  <div class="bg-gray-100 min-h-screen py-6">
    <div class="max-w-2xl mx-auto bg-white border border-blue-300 p-8">
      <post-form
        :initialPost="post"
        :initialTags="post.tags"
        :isEditMode="true"
        @update="handleUpdatePost"
      />
    </div>
  </div>
</template>

<script lang="ts">
import PostForm from "@/components/PostForm.vue";
import { mapActions } from "vuex";

export default {
  components: {
    PostForm,
  },
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
    };
  },
  async mounted() {
    await this.fetchPost();
  },
  methods: {
    ...mapActions("posts", ["updatePost", "getPostById"]),
    ...mapActions("utils", ["openDialog", "setLoading"]),
    async fetchPost() {
      const fetchedPost = await this.getPostById(this.post.id);
      if (fetchedPost) {
        this.post = fetchedPost;
      }
    },
    async handleUpdatePost(payload) {
      this.setLoading(true);
      const isUpdate = await this.updatePost({
        post: {
          ...this.post,
          title: payload.post.title,
          content: payload.post.content,
          imageUrl: payload.post.imageUrl,
          updatedAt: new Date(),
          tags: payload.tags,
        },
        image: payload.image,
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
  },
};
</script>
