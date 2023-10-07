import Vue from "vue";
import Vuex from "vuex";
import { auth } from "@/utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  getters: {},
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    async signup({ commit }, { email, password }) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        commit("SET_USER", userCredential.user);
        alert("User created!");
      } catch (error) {
        alert("Error creating user!");
        console.error("Error signup user:", error);
      }
    },
    async login({ commit }, { email, password }) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        commit("SET_USER", userCredential.user);
        alert("User logged in!");
      } catch (error) {
        alert("Error logging in!");
        console.error("Error logging in:", error);
      }
    },
    async logout({ commit }) {
      try {
        await auth.signOut();
        commit("SET_USER", null);
        alert("User logged out!");
      } catch (error) {
        alert("Error logging out!");
        console.error("Error logging out:", error);
      }
    },
    async loginWithGoogle({ commit }) {
      try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        commit("SET_USER", userCredential.user);
        alert("Logged in with Google!");
      } catch (error) {
        alert("Error logging in with Google!");
        console.error("Error logging in with Google:", error);
      }
    },
  },
  modules: {},
});
