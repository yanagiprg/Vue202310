<template>
  <div class="mt-10 max-w-2xl mx-auto p-4 bg-white rounded shadow">
    <textarea
      v-model="newComment"
      class="w-full p-2 rounded mb-4 border"
      placeholder="コメントを入力..."
    ></textarea>
    <button
      @click="submitComment"
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
    >
      コメントする
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  authUser: Object,
});

const newComment = ref("");

const emit = defineEmits(["submitComment"]);

const submitComment = () => {
  if (!newComment.value.trim()) return;

  const comment = {
    content: newComment.value,
    userId: props.authUser.uid,
    userName: props.authUser.displayName,
    createdAt: new Date().toISOString(),
  };

  emit("submitComment", comment);
  newComment.value = "";
};
</script>
