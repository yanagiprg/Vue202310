<template>
  <div class="post-detail bg-gray-100 min-h-screen py-6">
    <post-detail-card
      v-if="post"
      :post="post"
      :authUser="authUser"
      @deletePost="deletePost"
    />
    <comment-list
      v-if="comments"
      :comments="comments"
      :authUser="authUser"
      @deleteComment="removeComment"
    />
    <comment-create
      v-if="authUser"
      :authUser="authUser"
      @submitComment="submitComment"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import CommentList from "@/components/comment/CommentList.vue";
import CommentCreate from "@/components/comment/CommentCreate.vue";
import PostDetailCard from "@/components/post/PostDetailCard.vue";

const store = useStore();
const route = useRoute();
const postId = ref(route.params.id as string);

const authUser = computed(() => store.state.auth.authUser);
const post = computed(() => store.state.posts.post);
const comments = computed(() => store.state.posts.comments);

const getPostById = async (id) => {
  await store.dispatch("posts/getPostById", id);
};

const getComments = async (id) => {
  await store.dispatch("posts/getComments", id);
};

getPostById(postId.value);
getComments(postId.value);

const removePost = async (id) => {
  store.commit("utils/setLoading", true);
  const isDelete = await store.dispatch("posts/removePost", id);
  store.commit("utils/setLoading", false);

  if (isDelete) {
    store.dispatch("utils/openDialog", {
      message: "投稿を削除しました",
      success: true,
      targetLocation: "/",
    });
  } else {
    store.dispatch("utils/openDialog", {
      message: "投稿の削除に失敗しました。",
      success: false,
    });
  }
};

const addComment = (comment) => {
  store.dispatch("posts/addComment", { postId: postId.value, comment });
};

const deleteComment = (commentId) => {
  store.dispatch("posts/deleteComment", { postId: postId.value, commentId });
};

const deletePost = (id) => removePost(id);
const submitComment = (comment) => addComment(comment);
const removeComment = (commentId) => deleteComment(commentId);
</script>
