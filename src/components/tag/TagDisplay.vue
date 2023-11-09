<template>
  <span class="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm mr-2">
    タグ: {{ selectedTag }}
    <span class="mx-1 cursor-pointer" @click.prevent="$emit('clearTag')"
      >✖︎</span
    >
  </span>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

defineProps({
  selectedTag: String,
});
</script>
