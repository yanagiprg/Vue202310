<template>
  <div id="app">
    <the-header :authUser="authUser" />
    <router-view />
  </div>
</template>

<script lang="ts">
import TheHeader from "@/components/TheHeader.vue";
import { mapState } from "vuex";

export default {
  components: {
    TheHeader,
  },
  computed: {
    ...mapState("auth", ["authUser"]),
  },
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
</style>
