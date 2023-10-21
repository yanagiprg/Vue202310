<template>
  <div
    class="bg-white rounded-lg shadow-lg p-5 mb-5 hover:shadow-xl transition-shadow duration-300"
  >
    <router-link :to="`/post/${post.id}`">
      <img
        :src="post.imageUrl || `https://picsum.photos/seed/${post.id}/400`"
        alt="Article Image"
        class="w-full h-48 object-contain mb-3"
      />
      <h2 class="text-3xl font-bold mb-3 text-gray-800">
        {{ post.title }}
      </h2>
      <p class="text-gray-600 overflow-ellipsis overflow-hidden h-8">
        {{ post.content }}
      </p>
      <div class="">
        <span
          v-for="(tag, index) in post.tags"
          :key="index"
          class="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm mr-2 cursor-default"
          @click.prevent="filterByTag(tag)"
        >
          {{ tag }}
        </span>
      </div>

      <div
        class="flex justify-between items-center mt-5 pt-5 border-t border-gray-200"
      >
        <div class="flex items-center">
          <span class="material-icons text-gray-500 mr-1">mode_comment</span>
          <span class="text-gray-500 text-sm"
            >{{ commentsCount[post.id] || 0 }} コメント</span
          >
        </div>
        <div>
          <p class="text-gray-500 text-sm flex items-center">
            <span class="material-icons text-gray-500 mr-1">account_circle</span
            >{{ post.userName }}
          </p>
          <p class="text-gray-400 text-xs mt-1 flex items-center">
            <span class="material-icons text-gray-400 mr-1">update</span
            >{{ formatTimestamp(post.updatedAt) }}
          </p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { formatTimestamp } from "@/utils/formatTimestamp";

export default {
  props: {
    post: Object,
    commentsCount: Object,
  },
  methods: {
    filterByTag(tag) {
      this.$emit("filterByTag", tag);
    },
    formatTimestamp,
  },
};
</script>
