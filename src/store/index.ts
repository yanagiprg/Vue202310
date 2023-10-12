import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import posts from "./posts";
import utils from "./utils";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    posts,
    utils,
  },
});
