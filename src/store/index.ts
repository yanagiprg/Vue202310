import { createStore } from "vuex";
import auth from "./auth";
import posts from "./posts";
import utils from "./utils";

const store = createStore({
  modules: {
    auth,
    posts,
    utils,
  },
});

export default store;
