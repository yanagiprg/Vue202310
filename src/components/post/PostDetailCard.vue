<template>
  <div class="max-w-2xl mx-auto bg-white p-8">
    <div class="mb-8">
      <img
        :src="post.imageUrl || `https://picsum.photos/seed/${post.id}/400`"
        alt="Article Image"
        class="w-full h-full object-cover mb-3"
      />
      <h2 class="text-2xl font-semibold mb-4">{{ post.title }}</h2>
      <p class="text-gray-700">{{ post.content }}</p>
      <p class="text-gray-500 text-sm mt-2">作成者: {{ post.userName }}</p>
      <p v-if="post.updatedAt" class="text-gray-500 text-sm mt-2">
        更新時間: {{ formatTimestamp(post.updatedAt) }}
      </p>
      <div class="mt-3">
        <tag-list :tags="post.tags" />
      </div>
    </div>
    <button
      v-if="isAuthor"
      @click="deletePost"
      class="mt-4 mr-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
    >
      削除
    </button>
    <router-link
      v-if="isAuthor"
      :to="`/post/${post.id}/edit`"
      class="mt-4 ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
    >
      編集
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed } from "vue";
import { formatTimestamp } from "@/utils/formatTimestamp";
import TagList from "../tag/TagList.vue";

const props = defineProps({
  authUser: Object,
  post: Object,
});

const isAuthor = computed(() => props.authUser?.uid === props.post.userId);

const emit = defineEmits(["deletePost"]);
const deletePost = () => {
  emit("deletePost", props.post.id);
};
</script>
