<template>
  <div>
    <span
      v-for="(tag, index) in tags"
      :key="index"
      class="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm mr-2 cursor-default"
      @click.prevent="filterByTag(tag)"
    >
      {{ tag }}
      <span
        v-if="isEditTag"
        class="mx-1 cursor-pointer"
        @click.prevent="removeTag(index)"
        >✖︎</span
      >
    </span>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  tags: Array,
  isEditTag: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["filterByTag", "removeTag"]);

const filterByTag = (tag) => {
  emits("filterByTag", tag);
};

const removeTag = (index) => {
  emits("removeTag", index);
};
</script>
