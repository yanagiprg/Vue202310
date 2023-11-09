import { auth } from "@/utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { AuthUser } from "@/types/types";
import {
  uploadBytesResumable,
  getDownloadURL,
  ref,
  getStorage,
} from "firebase/storage";

const state = {
  authUser: null,
};

const getters = {};
const mutations = {
  SET_AUTH_USER(state, authUser: AuthUser | null) {
    state.authUser = authUser;
  },
};
const actions = {
  async uploadImage(_, image: File) {
    const storage = getStorage();
    const storageRef = ref(storage, "auth_users/" + image.name);
    const uploadTask = uploadBytesResumable(storageRef, image);
    return new Promise<string>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Error uploading file: ", error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("File available at", downloadURL);
          resolve(downloadURL);
        }
      );
    });
  },
  async signup({ commit, dispatch }, authUser: AuthUser) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        authUser.email,
        authUser.password
      );
      if (authUser.photoURL) {
        await updateProfile(userCredential.user, {
          displayName: authUser.displayName,
          photoURL: await dispatch("uploadImage", authUser.photoURL),
        });
      } else {
        await updateProfile(userCredential.user, {
          displayName: authUser.displayName,
        });
      }
      commit("SET_AUTH_USER", userCredential.user);
      return true;
    } catch (error) {
      console.error("Error signup user:", error);
      return false;
    }
  },
  async login({ commit }, { email, password }) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      commit("SET_AUTH_USER", userCredential.user);
      return true;
    } catch (error) {
      console.error("Error logging in:", error);
      return false;
    }
  },
  async logout({ commit }) {
    try {
      await auth.signOut();
      commit("SET_AUTH_USER", null);
      return true;
    } catch (error) {
      console.error("Error logging out:", error);
      return false;
    }
  },
  async loginWithGoogle({ commit }) {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      commit("SET_AUTH_USER", userCredential.user);
      return true;
    } catch (error) {
      console.error("Error logging in with Google:", error);
      return false;
    }
  },
  async updateAuthUser({ commit }, editedUser) {
    const authUser = auth.currentUser;
    try {
      if (editedUser.photoURL) {
        await updateProfile(authUser, {
          displayName: editedUser.displayName,
          photoURL: editedUser.photoURL,
        });
      } else {
        await updateProfile(authUser, {
          displayName: editedUser.displayName,
        });
      }
      commit("SET_AUTH_USER", authUser);
      return true;
    } catch (error) {
      console.error("Error updating user:", error);
      return false;
    }
  },
  async deleteAuthUser({ commit }) {
    const authUser = auth.currentUser;
    try {
      await authUser.delete();
      commit("SET_AUTH_USER", null);
      return true;
    } catch (error) {
      console.error("Error deleting user:", error);
      return false;
    }
  },
  initAuth({ commit }) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        commit("SET_AUTH_USER", user);
      } else {
        commit("SET_AUTH_USER", null);
      }
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
