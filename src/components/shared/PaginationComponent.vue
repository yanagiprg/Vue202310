<template>
  <div class="flex justify-center mt-6 items-center">
    <button
      :disabled="currentPage === 1"
      @click="$emit('previousPage')"
      class="mx-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
    >
      前へ
    </button>
    <span class="mx-2">{{ currentPage }}/{{ totalPages }}</span>
    <button
      :disabled="currentPage === totalPages"
      @click="$emit('nextPage')"
      class="mx-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
    >
      次へ
    </button>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

defineProps({
  currentPage: Number,
  totalPages: Number,
});
</script>
