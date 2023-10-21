<template>
  <div class="post-detail bg-gray-100 min-h-screen py-6">
    <post-detail-card
      v-if="post"
      :post="post"
      :authUser="this.authUser"
      @deletePost="deletePost"
    />
    <comment-list
      v-if="comments"
      :comments="comments"
      :authUser="this.authUser"
      @deleteComment="removeComment"
    />
    <comment-create
      v-if="this.authUser"
      :authUser="this.authUser"
      @submitComment="submitComment"
    />
  </div>
</template>

<script lang="ts">
import { mapState, mapActions } from "vuex";
import { formatTimestamp } from "@/utils/formatTimestamp";
import CommentList from "@/components/comment/CommentList.vue";
import CommentCreate from "@/components/comment/CommentCreate.vue";
import PostDetailCard from "@/components/post/PostDetailCard.vue";

export default {
  components: { CommentList, CommentCreate, PostDetailCard },
  data(): any {
    return {
      postId: this.$route.params.id,
    };
  },
  async created() {
    await this.getPostById(this.postId);
    await this.getComments(this.postId);
  },
  computed: {
    ...mapState("auth", ["authUser"]),
    ...mapState("posts", ["post", "comments"]),
  },
  methods: {
    ...mapActions("posts", [
      "getPostById",
      "removePost",
      "getComments",
      "addComment",
      "deleteComment",
    ]),
    ...mapActions("utils", ["openDialog", "setLoading"]),
    async deletePost(id) {
      this.setLoading(true);
      const isDelete = await this.removePost(id);
      this.setLoading(false);
      if (isDelete) {
        this.openDialog({
          message: "投稿を削除しました",
          success: true,
          targetLocation: "/",
        });
      } else {
        this.openDialog({
          message: "投稿の削除に失敗しました。",
          success: false,
        });
      }
    },
    submitComment(comment) {
      this.addComment({ postId: this.postId, comment });
    },
    removeComment(commentId) {
      this.deleteComment({ postId: this.postId, commentId });
    },
    formatTimestamp,
  },
};
</script>
