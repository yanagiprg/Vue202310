<template>
  <div class="post-detail bg-gray-100 min-h-screen py-6">
    <div class="max-w-2xl mx-auto">
      <h2 class="text-2xl font-semibold mb-4">{{ post.title }}</h2>
      <p class="text-gray-700">{{ post.content }}</p>
      <p class="text-gray-500 text-sm mt-2">作成者: {{ post.userName }}</p>
      <p v-if="post.updatedAt" class="text-gray-500 text-sm mt-2">
        更新時間: {{ formatTimestamp(post.updatedAt) }}
      </p>
      <router-link
        v-if="authUser && authUser.uid === post.userId"
        :to="`/post/${post.id}/edit`"
        class="mt-4 mr-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        編集
      </router-link>
      <button
        v-if="authUser && authUser.uid === post.userId"
        @click.prevent="deletePost"
        class="mt-4 ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
      >
        削除
      </button>
    </div>
    <div v-if="pagedComments?.length">
      <!-- Comments Section -->
      <div class="mt-10 max-w-2xl mx-auto">
        <h3 class="text-xl font-semibold mb-4 border-b-2 border-gray-300 pb-2">
          コメント
        </h3>
        <div
          v-for="comment in pagedComments"
          :key="comment.id"
          class="bg-white p-4 mb-6 rounded-lg shadow relative"
        >
          <div
            v-if="authUser && authUser.uid === comment.userId"
            class="absolute top-2 right-2"
          >
            <button
              @click.prevent="removeComment(comment.id)"
              class="text-red-500 hover:text-red-600"
            >
              <span class="material-icons">delete</span>
            </button>
          </div>

          <p class="text-gray-700 mb-2 border-b pb-2">{{ comment.content }}</p>
          <div class="flex justify-between items-center mt-2">
            <div class="flex">
              <span class="material-icons text-gray-500 mr-2">ユーザ名：</span>
              <p class="text-gray-500 text-sm mr-4">{{ comment.userName }}</p>
            </div>
            <p class="text-gray-500 text-sm">
              {{ formatJapaneseDate(comment.createdAt) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Pagination Controls for Comments -->
      <div class="flex justify-center mt-6 items-center">
        <button
          :disabled="commentPage === 1"
          @click="prevCommentPage"
          class="mx-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >
          前へ
        </button>
        <span class="mx-2">{{ commentPage }}/{{ totalCommentPages }}</span>
        <button
          :disabled="commentPage === totalCommentPages"
          @click="nextCommentPage"
          class="mx-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >
          次へ
        </button>
      </div>
    </div>
    <!-- Add Comment Form -->
    <div
      v-if="authUser"
      class="mt-10 max-w-2xl mx-auto p-4 bg-white rounded shadow"
    >
      <textarea
        v-model="newComment"
        class="w-full p-2 rounded mb-4 border"
        placeholder="コメントを入力..."
      ></textarea>
      <button
        @click.prevent="submitComment"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
      >
        コメントする
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState, mapActions } from "vuex";
import { formatTimestamp, formatJapaneseDate } from "@/utils/formatTimestamp";

export default {
  props: {
    authUser: Object,
  },
  data() {
    return {
      newComment: "",
      commentPage: 1,
      commentsPerPage: 5,
    };
  },
  async created() {
    const postId = this.$route.params.id;
    await this.getPostById(postId);
    await this.getComments(postId);
  },
  computed: {
    ...mapState("posts", ["post", "comments"]),
    pagedComments() {
      const start = (this.commentPage - 1) * this.commentsPerPage;
      const end = start + this.commentsPerPage;
      return this.comments.slice(start, end);
    },
    totalCommentPages() {
      return Math.ceil(this.comments.length / this.commentsPerPage);
    },
  },
  methods: {
    ...mapActions("posts", [
      "getPostById",
      "removePost",
      "getComments",
      "addComment",
      "deleteComment",
    ]),
    ...mapActions("utils", ["openDialog"]),
    async deletePost() {
      const postId = this.$route.params.id;
      const isDelete = await this.removePost(postId);
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
    submitComment() {
      if (!this.newComment.trim()) return;

      const comment = {
        content: this.newComment,
        userId: this.authUser.uid,
        userName: this.authUser.displayName,
        createdAt: new Date().toISOString(),
      };

      this.addComment({ postId: this.$route.params.id, comment });
      this.newComment = "";
    },
    removeComment(commentId) {
      this.deleteComment({ postId: this.$route.params.id, commentId });
    },
    formatTimestamp,
    formatJapaneseDate,
    nextCommentPage() {
      if (this.commentPage < this.totalCommentPages) {
        this.commentPage += 1;
      }
    },
    prevCommentPage() {
      if (this.commentPage > 1) {
        this.commentPage -= 1;
      }
    },
  },
};
</script>
