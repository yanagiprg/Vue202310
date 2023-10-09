<template>
  <div>
    <post-detail :authUser="authUser" />
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
    ...mapState("auth", ["authUser"]),
  },
};
</script>
