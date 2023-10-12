import { auth } from "@/utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
// import {
//   addDoc,
//   collection,
//   deleteDoc,
//   doc,
//   getDoc,
//   getDocs,
//   setDoc,
// } from "firebase/firestore";
// import { User } from "@/types/types";

const state = {
  authUser: null,
  // users: [],
  // user: {},
};

const getters = {};
const mutations = {
  SET_AUTH_USER(state, authUser) {
    state.authUser = authUser;
  },
  // SET_USERS(state, users) {
  //   state.users = users;
  // },
  // UPDATE_USER(state, editedUser) {
  //   const index = state.users.findIndex((user) => user.id === editedUser.id);
  //   if (index !== -1) {
  //     state.users[index] = editedUser;
  //   }
  // },
  // DELETE_USER(state, userId) {
  //   state.users = state.users.filter((user: User) => user.id !== userId);
  // },
  // SET_USER(state, user) {
  //   state.user = user;
  // },
};
const actions = {
  async signup({ commit }, { displayName, email, password }) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: displayName,
      });
      commit("SET_AUTH_USER", userCredential.user);
      // dispatch("createUser", userCredential.user);
      // commit("SET_USER", userCredential.user);
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
      // commit("SET_USER", userCredential.user);
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
      // commit("SET_USER", {});
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
      // commit("SET_USER", {});
      return true;
    } catch (error) {
      console.error("Error logging in with Google:", error);
      return false;
    }
  },
  async updateAuthUser({ commit }, editedUser) {
    const authUser = auth.currentUser;
    try {
      await updateProfile(authUser, {
        displayName: editedUser.displayName,
      });
      commit("SET_AUTH_USER", authUser);
      // dispatch("updateUser", editedUser);
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
      // dispatch("deleteUser", userId);
      return true;
    } catch (error) {
      console.error("Error deleting user:", error);
      return false;
    }
  },
  // async getUsers({ commit }) {
  //   try {
  //     const querySnapshot = await getDocs(collection(db, "users"));
  //     const users: User[] = [];
  //     querySnapshot.forEach((doc) => {
  //       const user = {
  //         id: doc.id,
  //         ...doc.data(),
  //       } as User;
  //       users.push(user);
  //     });
  //     commit("SET_USERS", users);
  //   } catch (error) {
  //     console.error("Error fetching users: ", error);
  //   }
  // },
  // async createUser({ dispatch }, user: User) {
  //   try {
  //     const userData = {
  //       email: user.email,
  //       displayName: user.displayName,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     };
  //     await addDoc(collection(db, "users"), userData);
  //     dispatch("getUsers");
  //   } catch (error) {
  //     alert("ユーザーの作成に失敗しました。");
  //     console.error("Error adding user: ", error);
  //   }
  // },
  // async updateUser({ commit }, editedUser: User) {
  //   try {
  //     await setDoc(doc(db, "users", editedUser.id), editedUser);
  //     commit("UPDATE_USER", editedUser);
  //     alert("ユーザー情報を更新しました。");
  //   } catch (error) {
  //     alert("ユーザー情報の更新に失敗しました。");
  //     console.error("Error editing user: ", error);
  //   }
  // },
  // async deleteUser({ commit }, userId: string) {
  //   try {
  //     await deleteDoc(doc(db, "users", userId));
  //     commit("DELETE_USER", userId);
  //     alert("ユーザーを削除しました。");
  //   } catch (error) {
  //     alert("ユーザーの削除に失敗しました。");
  //     console.error("Error deleting user: ", error);
  //   }
  // },
  // async getUser({ commit }, userId: string) {
  //   try {
  //     const docRef = doc(db, "users", userId);
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       const user = {
  //         id: docSnap.id,
  //         ...docSnap.data(),
  //       } as User;
  //       commit("SET_USER", user);
  //     } else {
  //       alert("ユーザーが見つかりません。");
  //     }
  //   } catch (error) {
  //     alert("ユーザーの取得に失敗しました。");
  //     console.error("Error getting user: ", error);
  //   }
  // },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
