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
  </div>
</template>

<script lang="ts">
import { mapActions, mapGetters, mapState } from "vuex";
import TheHeader from "@/components/TheHeader.vue";
import DialogComponent from "@/components/shared/DialogComponent.vue";

export default {
  components: {
    TheHeader,
    DialogComponent,
  },
  computed: {
    ...mapState("auth", ["authUser"]),
    ...mapGetters("utils", [
      "showDialog",
      "dialogMessage",
      "dialogIsSuccess",
      "targetLocation",
    ]),
  },
  methods: {
    ...mapActions("utils", ["closeDialog"]),
    navigateToLocation() {
      if (this.targetLocation) {
        this.$router.push(this.targetLocation);
      }
      this.closeDialog();
    },
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

.mt-header {
  margin-top: 132px;
}
</style>
