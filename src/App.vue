<template>
  <div id="app">
    <the-header :authUser="authUser" />
    <router-view class="mt-header" />
    <dialog-component
      v-if="showDialog"
      :success="dialogIsSuccess"
      :message="dialogMessage"
      @dialogClosed="navigateToLocation"
    />
    <loading-component v-if="isLoading" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import TheHeader from "@/components/shared/TheHeader.vue";
import DialogComponent from "@/components/shared/DialogComponent.vue";
import LoadingComponent from "@/components/shared/LoadingComponent.vue";

const store = useStore();
const router = useRouter();

const authUser = computed(() => store.state.auth.authUser);
const showDialog = computed(() => store.getters["utils/showDialog"]);
const dialogMessage = computed(() => store.getters["utils/dialogMessage"]);
const dialogIsSuccess = computed(() => store.getters["utils/dialogIsSuccess"]);
const targetLocation = computed(() => store.getters["utils/targetLocation"]);
const isLoading = computed(() => store.state.utils.isLoading);

onMounted(() => {
  store.dispatch("auth/initAuth");
});

const navigateToLocation = () => {
  if (targetLocation.value) {
    router.push(targetLocation.value);
  }
  store.dispatch("utils/closeDialog");
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    // color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

button {
  transition: all 0.3s;
}

button:hover {
  transform: translateY(-2px);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

router-link {
  transition: all 0.3s;
}

router-link:hover {
  transform: translateY(-2px);
}

.mt-header {
  margin-top: 132px;
}
</style>
