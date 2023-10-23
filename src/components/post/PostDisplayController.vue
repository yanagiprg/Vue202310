<template>
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
      <select
        v-model="localSortOrder"
        @change="updateSortOrder"
        class="ml-2 p-2 border rounded"
      >
        <option value="updatedAt">更新順</option>
        <option value="commentsCount">コメント数順</option>
        <option value="title">タイトル順</option>
        <option value="userName">作成者名順</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, watch, defineEmits } from "vue";

const props = defineProps({
  authUser: Object,
  sortOrder: String,
  isShowUserPosts: Boolean,
});

const emits = defineEmits(["filterByUser", "update:sortOrder"]);

const localSortOrder = ref(props.sortOrder);

watch(
  () => props.sortOrder,
  (newVal) => {
    localSortOrder.value = newVal;
  }
);

const filterByUser = () => {
  emits("filterByUser");
};

const updateSortOrder = () => {
  emits("update:sortOrder", localSortOrder.value);
};
</script>
