<template>
  <header class="bg-blue-500 p-4 shadow-md">
    <nav
      class="container mx-auto text-white font-semibold flex justify-center items-center"
    >
      <router-link class="px-3 py-2 rounded hover:bg-blue-700" to="/"
        >Home</router-link
      >
      <router-link class="px-3 py-2 rounded hover:bg-blue-700" to="/about"
        >About</router-link
      >
      <router-link
        v-if="authUser"
        class="px-3 py-2 rounded hover:bg-blue-700"
        to="/post/create"
        >New Post</router-link
      >
      <router-link
        v-if="authUser"
        class="px-3 py-2 rounded hover:bg-blue-700"
        :to="`/user/${authUser.uid}`"
        >{{ authUser.displayName }}</router-link
      >
      <p
        v-if="authUser"
        @click.prevent="logoutUser"
        class="px-3 py-2 rounded hover:bg-blue-700 cursor-pointer inline-block"
      >
        Logout
      </p>
      <router-link
        v-if="!authUser"
        class="px-3 py-2 rounded hover:bg-blue-700"
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
