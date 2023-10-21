<template>
  <div class="bg-gray-100 min-h-screen py-6">
    <div class="max-w-2xl mx-auto">
      <h2 class="text-2xl font-semibold mb-4">ブログ一覧</h2>
      <filter-sorting-controls
        :authUser="authUser"
        :sortOrder="sortOrder"
        :isShowUserPosts="isShowUserPosts"
        @filterByUser="filterByUser"
        @update:sortOrder="(newSortOrder) => (sortOrder = newSortOrder)"
      />
      <div class="mb-4">
        <p class="text-lg font-medium mb-4">
          記事の件数：{{
            isShowUserPosts || selectedTag
              ? paginatedPosts.length
              : posts.length
          }}
        </p>
        <tag-display
          v-if="selectedTag"
          :selectedTag="selectedTag"
          @clearTag="filterByTag(null)"
        />
      </div>
      <post-item
        v-for="post in paginatedPosts"
        :key="post.id"
        :post="post"
        :commentsCount="commentsCount"
        @filterByTag="filterByTag"
      />
      <pagination-controls
        :currentPage="currentPage"
        :totalPages="totalPages"
        @nextPage="next"
        @previousPage="previous"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { mapState, mapActions } from "vuex";

import PaginationControls from "./shared/PaginationComponent.vue";
import TagDisplay from "./TagDisplay.vue";
import FilterSortingControls from "./FilterSortingControls.vue";
import PostItem from "./PostItem.vue";

const SORT_ORDERS = {
  UPDATED_AT: "updatedAt",
  TITLE: "title",
  USER_NAME: "userName",
  COMMENTS_COUNT: "commentsCount",
};

export default {
  components: {
    TagDisplay,
    FilterSortingControls,
    PostItem,
    PaginationControls,
  },
  data(): any {
    return {
      sortOrder: SORT_ORDERS.UPDATED_AT,
      isShowUserPosts: false,
      currentPage: 1,
      postsPerPage: 5,
      selectedTag: null,
    };
  },
  async created() {
    await this.fetchInitialData();
  },
  computed: {
    ...mapState("posts", ["posts", "commentsCount"]),
    ...mapState("auth", ["authUser"]),
    filteredPosts() {
      let posts = this.isShowUserPosts
        ? this.posts.filter((post) => post.userId === this.authUser.uid)
        : this.posts;
      if (this.selectedTag) {
        posts = posts.filter((post) => post.tags?.includes(this.selectedTag));
      }
      return posts;
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
      this.selectedTag = null;
      this.isShowUserPosts = !this.isShowUserPosts;
    },
    filterByTag(tag) {
      this.selectedTag = tag;
    },
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
