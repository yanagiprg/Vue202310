<template>
  <div v-if="pagedComments?.length">
    <div class="mt-10 max-w-2xl mx-auto">
      <h3 class="text-xl font-semibold mb-4 border-b-2 border-gray-300 pb-2">
        コメント
      </h3>
      <!-- コメント作成順(desc)の表示にする -->
      <comment-item
        v-for="comment in pagedComments"
        :key="comment.id"
        :comment="comment"
        :authUser="authUser"
        @deleteComment="deleteComment"
      />
    </div>
    <pagination-component
      :currentPage="currentPage"
      :totalPages="totalComments"
      @nextPage="nextPage"
      @previousPage="previousPage"
    />
  </div>
</template>

<script lang="ts">
import CommentItem from "@/components/CommentItem.vue";
import PaginationComponent from "./shared/PaginationComponent.vue";

export default {
  components: {
    CommentItem,
    PaginationComponent,
  },
  props: {
    comments: Array,
    authUser: Object,
  },
  data(): any {
    return {
      newComment: "",
      currentPage: 1,
      commentsPerPage: 5,
    };
  },
  computed: {
    sortedComments() {
      const commentList = this.comments;
      commentList.sort((a, b) => {
        return a.createdAt < b.createdAt ? 1 : -1;
      });
      return commentList;
    },
    pagedComments() {
      const startIndex = (this.currentPage - 1) * 5;
      const endIndex = this.currentPage * 5;
      return this.sortedComments.slice(startIndex, endIndex);
    },
    totalComments() {
      return Math.ceil(this.comments.length / this.commentsPerPage);
    },
  },
  methods: {
    deleteComment(commentId) {
      this.$emit("deleteComment", commentId);
    },
    nextPage() {
      if (this.currentPage < this.totalComments) {
        this.currentPage += 1;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
      }
    },
  },
};
</script>
