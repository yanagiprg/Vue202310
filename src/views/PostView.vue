<template>
  <div>
    <post-detail :user="user" />
  </div>
</template>

<script lang="ts">
import PostDetail from "@/components/PostDetail.vue";
import { mapState } from "vuex";

export default {
  components: {
    PostDetail,
  },
  computed: {
    ...mapState("auth", ["user"]),
  },
};
</script>
