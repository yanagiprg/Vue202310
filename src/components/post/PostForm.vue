<template>
  <form name="post-form" @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label for="title" class="block text-gray-600 text-sm font-medium mb-2"
        >タイトル</label
      >
      <input
        v-model="post.title"
        id="title"
        name="title"
        type="text"
        placeholder="タイトルを入力"
        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        required
      />
    </div>
    <div class="mb-4">
      <label for="content" class="block text-gray-600 text-sm font-medium mb-2"
        >内容</label
      >
      <textarea
        v-model="post.content"
        id="content"
        name="content"
        placeholder="内容を入力"
        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        rows="6"
        required
      ></textarea>
    </div>
    <div class="mb-4">
      <label for="tagInput" class="block text-gray-600 text-sm font-medium mb-2"
        >タグ</label
      >
      <div class="flex items-center">
        <input
          v-model="tagInput"
          id="tagInput"
          name="tagInput"
          type="text"
          placeholder="タグを入力"
          class="w-10/12 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          type="button"
          @click="addTag"
          class="ml-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          追加
        </button>
      </div>
      <div class="mt-2">
        <tag-list
          :tags="tags"
          :is-edit-tag="true"
          @removeTag="tags.splice($event, 1)"
        />
      </div>
    </div>
    <div class="mb-4">
      <label for="image" class="block text-gray-600 text-sm font-medium mb-2"
        >画像</label
      >
      <input id="image" type="file" @change="onFileChange" />
    </div>
    <div class="text-right">
      <button
        type="submit"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        {{ isEditMode ? "更新" : "投稿" }}
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import TagList from "../tag/TagList.vue";

export default {
  components: { TagList },
  props: {
    authUser: Object,
    initialPost: Object,
    initialTags: Array,
    isEditMode: {
      type: Boolean,
      default: false,
    },
  },
  data(): any {
    return {
      post: {
        title: "",
        content: "",
        imageUrl: "",
        userId: "",
        userName: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      tagInput: "",
      tags: [],
      image: null,
    };
  },
  created() {
    if (this.authUser) {
      this.post.userId = this.authUser.uid;
      this.post.userName = this.authUser.displayName;
    }
  },
  watch: {
    initialPost: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.post = { ...newVal };
        }
      },
    },
    initialTags: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.tags = [...newVal];
        }
      },
    },
  },
  methods: {
    addTag() {
      const newTag = this.tagInput.trim();
      if (newTag) {
        this.tags.push(newTag);
        this.tagInput = "";
      }
    },
    handleSubmit() {
      const payload = {
        post: this.post,
        tags: this.tags,
        image: this.image,
      };
      if (this.isEditMode) {
        this.$emit("update", payload);
      } else {
        this.$emit("submit", payload);
      }
    },
    onFileChange(event) {
      this.image = event.target.files[0];
    },
  },
};
</script>
