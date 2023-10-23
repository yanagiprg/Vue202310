<template>
  <div class="bg-gray-100 min-h-screen py-6">
    <div class="max-w-2xl mx-auto">
      <h2 class="text-2xl font-semibold mb-4">ブログ一覧</h2>
      <post-display-controller
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
      <pagination-component
        :currentPage="currentPage"
        :totalPages="totalPages"
        @nextPage="next"
        @previousPage="previous"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import PaginationComponent from "@/components/shared/PaginationComponent.vue";
import TagDisplay from "@/components/tag/TagDisplay.vue";
import PostDisplayController from "@/components/post/PostDisplayController.vue";
import PostItem from "@/components/post/PostItem.vue";

const store = useStore();

const SORT_ORDERS = {
  UPDATED_AT: "updatedAt",
  TITLE: "title",
  USER_NAME: "userName",
  COMMENTS_COUNT: "commentsCount",
};

const sortOrder = ref(SORT_ORDERS.UPDATED_AT);
const isShowUserPosts = ref(false);
const currentPage = ref(1);
const postsPerPage = ref(5);
const selectedTag = ref(null);

onMounted(async () => {
  await store.dispatch("posts/getPosts");
  await store.dispatch("posts/countComments");
});

const posts = computed(() => store.state.posts.posts);
const commentsCount = computed(() => store.state.posts.commentsCount);
const authUser = computed(() => store.state.auth.authUser);

const filteredPosts = computed(() => {
  let filtered = isShowUserPosts.value
    ? posts.value.filter((post) => post.userId === authUser.value.uid)
    : posts.value;
  if (selectedTag.value) {
    filtered = filtered.filter((post) =>
      post.tags?.includes(selectedTag.value)
    );
  }
  return filtered;
});

const sortedPosts = computed(() => {
  let sorted = [...filteredPosts.value];
  switch (sortOrder.value) {
    case SORT_ORDERS.UPDATED_AT:
      return sorted.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
    case SORT_ORDERS.COMMENTS_COUNT:
      return sorted.sort(
        (a, b) =>
          (commentsCount.value[b.id] || 0) - (commentsCount.value[a.id] || 0)
      );
    case SORT_ORDERS.TITLE:
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case SORT_ORDERS.USER_NAME:
      return sorted.sort((a, b) => a.userName.localeCompare(b.userName));
    default:
      return filteredPosts.value;
  }
});

const totalPages = computed(() =>
  Math.ceil(filteredPosts.value.length / postsPerPage.value)
);

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage.value;
  const end = currentPage.value * postsPerPage.value;
  return sortedPosts.value.slice(start, end);
});

const filterByUser = () => {
  selectedTag.value = null;
  isShowUserPosts.value = !isShowUserPosts.value;
};

const filterByTag = (tag) => {
  selectedTag.value = tag;
};

const next = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const previous = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>
