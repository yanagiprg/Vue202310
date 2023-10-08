<template>
  <div>
    <post-form :user="user" />
  </div>
</template>

<script lang="ts">
import PostForm from "@/components/PostForm.vue";
import { mapState } from "vuex";

export default {
  components: {
    PostForm,
  },
  computed: {
    ...mapState("auth", ["user"]),
  },
};
</script>
