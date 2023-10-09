<template>
  <header class="bg-blue-500 p-4 shadow-md">
    <nav class="container mx-auto text-white font-bold inline-block">
      <router-link class="mr-4 hover:text-blue-200" to="/">Home</router-link>
      <router-link class="mr-4 hover:text-blue-200" to="/about"
        >About</router-link
      >
      <router-link
        v-if="authUser"
        class="mr-4 hover:text-blue-200"
        to="/post/create"
        >New Post</router-link
      >
      <router-link
        v-if="authUser"
        class="mr-4 hover:text-blue-200 cursor-pointer inline-block"
        :to="`/user/${authUser.uid}`"
      >
        {{ authUser.displayName }}
      </router-link>
      <p
        v-if="authUser"
        @click.prevent="logoutUser"
        class="hover:text-blue-200 cursor-pointer inline-block"
      >
        Logout
      </p>
      <router-link
        v-if="!authUser"
        class="hover:text-blue-200 cursor-pointer inline-block"
        to="/login"
        >Login</router-link
      >
    </nav>
  </header>
</template>

<script lang="ts">
import { mapActions } from "vuex";
import Vue from "vue";

export default Vue.extend({
  props: {
    authUser: Object,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    async logoutUser() {
      await this.logout();
      this.$router.push("/login");
    },
  },
});
</script>

<style lang="scss" scoped>
.header-text {
  font-weight: bold;
  color: #2c3e50;
}
</style>
