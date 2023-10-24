<template>
  <div class="bg-gray-100 min-h-screen py-6">
    <div class="max-w-2xl mx-auto bg-white border border-blue-300 p-8">
      <post-form
        :initialPost="post"
        :initialTags="post.tags"
        :isEditMode="true"
        @update="handleUpdatePost"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import PostForm from "@/components/post/PostForm.vue";
import { Article } from "@/types/types";
const route = useRoute();
const store = useStore();

const postId = route.params.id as string;
const post = ref<Article>({
  id: postId,
  title: "",
  content: "",
  imageUrl: "",
  updatedAt: new Date(),
  tags: [],
  image: undefined,
  userId: "",
  userName: "",
  createdAt: undefined,
});

onMounted(async () => {
  await fetchPost();
});

const fetchPost = async () => {
  const fetchedPost = await store.dispatch("posts/getPostById", postId);
  if (fetchedPost) {
    post.value = fetchedPost;
  }
};

const handleUpdatePost = async (payload: any) => {
  store.dispatch("utils/setLoading", true);
  const isUpdate = await store.dispatch("posts/updatePost", {
    post: {
      ...post.value,
      title: payload.post.title,
      content: payload.post.content,
      imageUrl: payload.post.imageUrl,
      updatedAt: new Date(),
      tags: payload.tags,
    },
    image: payload.image,
  });
  store.dispatch("utils/setLoading", false);

  if (isUpdate) {
    store.dispatch("utils/openDialog", {
      message: "投稿を更新しました",
      success: true,
      targetLocation: `/post/${post.value.id}`,
    });
  } else {
    store.dispatch("utils/openDialog", {
      message: "投稿の更新に失敗しました。",
      success: false,
    });
  }
};
</script>
