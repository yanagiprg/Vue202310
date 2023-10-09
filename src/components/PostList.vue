<template>
  <div class="bg-gray-100 min-h-screen py-6">
    <div class="max-w-2xl mx-auto">
      <h2 class="text-2xl font-semibold mb-4">ブログ一覧</h2>

      <!-- Filter & Sorting Controls -->
      <div class="flex justify-between items-center mb-4">
        <div>
          <button
            v-if="authUser"
            @click="filterByUser"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          >
            {{ showUserPosts ? "全ての投稿" : "自分の投稿" }}
          </button>
        </div>
        <div>
          <label>並べ替え:</label>
          <select v-model="sortOrder" class="ml-2">
            <option value="title">タイトル</option>
            <option value="updatedAt">更新時間</option>
            <option value="userName">作成者</option>
          </select>
        </div>
      </div>

      <!-- Posts List -->
      <div
        v-for="post in sortedPosts"
        :key="post.id"
        class="bg-white rounded-lg shadow-md p-4 mb-4"
      >
        <router-link :to="`/post/${post.id}`">
          <h2 class="text-xl font-semibold mb-2">{{ post.title }}</h2>
          <p class="text-gray-700">{{ post.content }}</p>
          <p class="text-gray-500 text-sm mt-2">作成者: {{ post.userName }}</p>
          <p class="text-gray-500 text-sm mt-2">
            更新時間: {{ formatTimestamp(post.updatedAt) }}
          </p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState, mapActions } from "vuex";
import { formatTimestamp } from "@/utils/formatTimestamp";

const SORT_ORDERS = {
  TITLE: "title",
  UPDATED_AT: "updatedAt",
  USER_NAME: "userName",
};

export default {
  data() {
    return {
      sortOrder: SORT_ORDERS.TITLE,
      showUserPosts: false,
    };
  },
  created() {
    this.getPosts();
  },
  computed: {
    ...mapState("posts", ["posts"]),
    ...mapState("auth", ["authUser"]),
    sortedPosts() {
      let sorted = [...this.posts];
      switch (this.sortOrder) {
        case SORT_ORDERS.TITLE:
          sorted.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case SORT_ORDERS.UPDATED_AT:
          sorted.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
          break;
        case SORT_ORDERS.USER_NAME:
          sorted.sort((a, b) => a.userName.localeCompare(b.userName));
          break;
        default:
          break;
      }
      if (this.showUserPosts) {
        sorted = sorted.filter((post) => post.userId === this.authUser.uid);
      }
      return sorted;
    },
  },
  methods: {
    ...mapActions("posts", ["getPosts"]),
    filterByUser() {
      this.showUserPosts = !this.showUserPosts;
    },
    formatTimestamp,
  },
};
</script>
