<template>
  <div
    v-if="authUser"
    class="mt-10 max-w-2xl mx-auto p-4 bg-white rounded shadow"
  >
    <textarea
      v-model="newComment"
      class="w-full p-2 rounded mb-4 border"
      placeholder="コメントを入力..."
    ></textarea>
    <button
      @click.prevent="submitComment"
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
    >
      コメントする
    </button>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    authUser: Object,
  },
  data(): any {
    return {
      newComment: "",
    };
  },
  methods: {
    submitComment() {
      if (!this.newComment.trim()) return;

      const comment = {
        content: this.newComment,
        userId: this.authUser.uid,
        userName: this.authUser.displayName,
        createdAt: new Date().toISOString(),
      };
      this.$emit("submitComment", comment);
      this.newComment = "";
    },
  },
};
</script>
