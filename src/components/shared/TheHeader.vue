<template>
  <header class="bg-blue-500 opacity-90 p-4 shadow-md w-full fixed top-0">
    <nav
      class="container mx-auto text-white font-semibold flex justify-center items-center"
    >
      <router-link class="px-3 py-2 rounded hover:bg-blue-700" to="/"
        >Home</router-link
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

<script lang="ts" setup>
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();

const authUser = computed(() => store.state.auth.authUser);

const logoutUser = async () => {
  store.dispatch("utils/setLoading", true);
  const isLogout = await store.dispatch("auth/logout");
  store.dispatch("utils/setLoading", false);

  if (isLogout) {
    store.dispatch("utils/openDialog", {
      message: "ログアウトしました",
      success: true,
      targetLocation: "/login",
    });
  } else {
    store.dispatch("utils/openDialog", {
      message: "ログアウトに失敗しました。",
      success: false,
    });
  }
};
</script>

<style lang="scss" scoped>
.header-text {
  font-weight: bold;
  color: #2c3e50;
}
</style>
