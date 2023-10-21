<template>
  <div class="bg-white p-4 mb-6 rounded-lg shadow relative">
    <div
      v-if="authUser && authUser.uid === comment.userId"
      class="absolute top-2 right-2"
    >
      <button
        @click.prevent="deleteComment()"
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
</template>

<script lang="ts">
import { formatJapaneseDate } from "@/utils/formatTimestamp";

export default {
  props: {
    comment: Object,
    authUser: Object,
  },
  methods: {
    formatJapaneseDate,
    deleteComment() {
      this.$emit("deleteComment", this.comment.id);
    },
  },
};
</script>
