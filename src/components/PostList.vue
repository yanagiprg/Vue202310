<template>
  <div class="bg-gray-100 min-h-screen py-6">
    <div class="max-w-2xl mx-auto">
      <h2 class="text-2xl font-semibold mb-4">ブログ一覧</h2>
      <!-- Filter & Sorting Controls -->
      <div
        class="flex justify-between items-center mb-4 bg-white p-4 rounded-lg shadow"
      >
        <div class="flex items-center space-x-4">
          <button
            v-if="authUser"
            @click="filterByUser"
            class="text-blue-500 border border-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white focus:outline-none transition-colors duration-200"
          >
            {{ isShowUserPosts ? "全ての投稿" : "自分の投稿" }}
          </button>
        </div>
        <div class="flex items-center space-x-2">
          <span class="text-gray-600">並べ替え:</span>
          <select v-model="sortOrder" class="ml-2 p-2 border rounded">
            <option value="updatedAt">更新順</option>
            <option value="commentsCount">コメント数順</option>
            <option value="title">タイトル順</option>
            <option value="userName">作成者名順</option>
          </select>
        </div>
      </div>
      <p class="text-lg font-medium mb-4">
        記事の件数：{{ isShowUserPosts ? paginatedPosts.length : posts.length }}
      </p>

      <!-- Posts List -->
      <div
        v-for="post in paginatedPosts"
        :key="post.id"
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
          <p class="text-gray-600 overflow-ellipsis overflow-hidden h-14">
            {{ post.content }}
          </p>
          <div class="mt-3">
            <span
              v-for="(tag, index) in post.tags"
              :key="index"
              class="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm mr-2"
            >
              {{ tag }}
            </span>
          </div>

          <div
            class="flex justify-between items-center mt-5 pt-5 border-t border-gray-200"
          >
            <div class="flex items-center">
              <span class="material-icons text-gray-500 mr-1"
                >mode_comment</span
              >
              <span class="text-gray-500 text-sm"
                >{{ commentsCount[post.id] || 0 }} コメント</span
              >
            </div>
            <div>
              <p class="text-gray-500 text-sm flex items-center">
                <span class="material-icons text-gray-500 mr-1"
                  >account_circle</span
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

      <!-- Pagination Controls -->
      <div class="flex justify-center mt-6 items-center">
        <button
          :disabled="currentPage === 1"
          @click="previous"
          class="mx-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >
          前へ
        </button>
        <span class="mx-2">{{ currentPage }}/{{ totalPages }}</span>
        <button
          :disabled="currentPage === totalPages"
          @click="next"
          class="mx-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >
          次へ
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState, mapActions } from "vuex";
import { formatTimestamp } from "@/utils/formatTimestamp";

const SORT_ORDERS = {
  UPDATED_AT: "updatedAt",
  COMMENTS_COUNT: "commentsCount",
  TITLE: "title",
  USER_NAME: "userName",
};

export default {
  data() {
    return {
      sortOrder: SORT_ORDERS.TITLE,
      isShowUserPosts: false,
      currentPage: 1,
      postsPerPage: 5,
    };
  },
  async created() {
    await this.fetchInitialData();
  },
  computed: {
    ...mapState("posts", ["posts", "commentsCount"]),
    ...mapState("auth", ["authUser"]),
    filteredPosts() {
      return this.isShowUserPosts
        ? this.posts.filter((post) => post.userId === this.authUser.uid)
        : this.posts;
    },
    sortedPosts() {
      return this.sortPosts(this.filteredPosts);
    },
    totalPages() {
      return Math.ceil(this.filteredPosts.length / this.postsPerPage);
    },
    paginatedPosts() {
      return this.paginatePosts(this.sortedPosts);
    },
  },
  methods: {
    ...mapActions("posts", ["getPosts", "countComments"]),
    async fetchInitialData() {
      await this.getPosts();
      await this.countComments();
    },
    sortPosts(posts) {
      let sorted = [...posts];
      switch (this.sortOrder) {
        case SORT_ORDERS.UPDATED_AT:
          return sorted.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
        case SORT_ORDERS.COMMENTS_COUNT:
          return sorted.sort(
            (a, b) =>
              (this.commentsCount[b.id] || 0) - (this.commentsCount[a.id] || 0)
          );
        case SORT_ORDERS.TITLE:
          return sorted.sort((a, b) => a.title.localeCompare(b.title));
        case SORT_ORDERS.USER_NAME:
          return sorted.sort((a, b) => a.userName.localeCompare(b.userName));
        default:
          return posts;
      }
    },
    paginatePosts(posts) {
      const start = (this.currentPage - 1) * this.postsPerPage;
      const end = this.currentPage * this.postsPerPage;
      return posts.slice(start, end);
    },
    filterByUser() {
      this.isShowUserPosts = !this.isShowUserPosts;
    },
    formatTimestamp,
    next() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    previous() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
};
</script>
