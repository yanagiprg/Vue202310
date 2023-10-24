<template>
  <div v-if="pagedComments.length">
    <div class="mt-10 max-w-2xl mx-auto">
      <h3 class="text-xl font-semibold mb-4 border-b-2 border-gray-300 pb-2">
        コメント
      </h3>
      <comment-item
        v-for="comment in pagedComments"
        :key="comment.id"
        :comment="comment"
        :authUser="authUser"
        @deleteComment="emitDeleteComment"
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

<script lang="ts" setup>
import { ref, computed, defineProps, defineEmits, PropType } from "vue";
import CommentItem from "@/components/comment/CommentItem.vue";
import PaginationComponent from "../shared/PaginationComponent.vue";

import { Comment } from "@/types/types";

const props = defineProps({
  comments: Array as PropType<Comment[]>,
  authUser: Object,
});

const currentPage = ref(1);
const commentsPerPage = 5;

const sortedComments = computed(() => {
  const commentList = [...props.comments];
  commentList.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return commentList;
});

const pagedComments = computed(() => {
  const startIndex = (currentPage.value - 1) * commentsPerPage;
  const endIndex = currentPage.value * commentsPerPage;
  return sortedComments.value.slice(startIndex, endIndex);
});

const totalComments = computed(() => {
  return Math.ceil(props.comments.length / commentsPerPage);
});

const emit = defineEmits(["deleteComment"]);

const emitDeleteComment = (commentId) => {
  emit("deleteComment", commentId);
};

const nextPage = () => {
  if (currentPage.value < totalComments.value) {
    currentPage.value += 1;
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};
</script>
