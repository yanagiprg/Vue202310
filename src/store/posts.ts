import { Article, Comment } from "@/types/types";
import db from "@/utils/firebase";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const storage = getStorage();

const state = {
  posts: [],
  post: {},
  comments: [],
  commentsCount: {},
};

const mutations = {
  SET_POSTS(state, posts) {
    state.posts = posts;
  },
  EDIT_POST(state, editedPost) {
    const index = state.posts.findIndex(
      (post: Article) => post.id === editedPost.id
    );
    if (index !== -1) {
      state.posts[index] = editedPost;
    }
  },
  DELETE_POST(state, postId) {
    state.posts = state.posts.filter((post: Article) => post.id !== postId);
  },
  SET_POST(state, post) {
    state.post = post;
  },
  SET_COMMENTS(state, comments) {
    state.comments = comments;
  },
  SET_COMMENTS_COUNT(state, counts) {
    state.commentsCount = counts;
  },
};

const actions = {
  async getPosts({ commit }) {
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const posts: Article[] = [];
      querySnapshot.forEach((doc) => {
        const post = {
          id: doc.id,
          ...doc.data(),
        } as Article;
        posts.push(post);
      });
      commit("SET_POSTS", posts);
    } catch (error) {
      console.error("Error fetching posts: ", error);
    }
  },
  async uploadImage(_, image: File) {
    const storageRef = ref(storage, "posts/" + image.name);
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
  async createPost({ dispatch }, postData: { post: Article; image: File }) {
    try {
      if (postData.image) {
        const imageUrl = await dispatch("uploadImage", postData.image);
        postData.post.imageUrl = imageUrl;
      }
      await addDoc(collection(db, "posts"), postData.post);
      dispatch("getPosts");
      return true;
    } catch (error) {
      console.error("Error adding post: ", error);
      return false;
    }
  },
  async updatePost(
    { commit, dispatch },
    postData: { post: Article; image: File }
  ) {
    if (!postData.post.id) return;
    const postRef = doc(db, "posts", postData.post.id);
    if (postData.image) {
      const imageUrl = await dispatch("uploadImage", postData.image);
      postData.post.imageUrl = imageUrl;
    }
    try {
      await setDoc(postRef, postData.post);
      commit("EDIT_POST", postData.post);
      return true;
    } catch (error) {
      console.error("Error updating post: ", error);
      return false;
    }
  },
  async removePost({ commit }, postId: string) {
    try {
      await deleteDoc(doc(db, "posts", postId));
      commit("DELETE_POST", postId);
      return true;
    } catch (error) {
      console.error("Error deleting post: ", error);
      return false;
    }
  },
  async getPostById({ commit }, postId) {
    try {
      const postRef = doc(db, "posts", postId);
      const postDoc = await getDoc(postRef);

      if (postDoc.exists) {
        const post = {
          id: postDoc.id,
          ...postDoc.data(),
        };
        commit("SET_POST", post);
        return post;
      }
    } catch (error) {
      console.error("Error fetching post: ", error);
    }
  },
  // コメント機能
  async getComments({ commit }, postId) {
    try {
      const postRef = doc(db, "posts", postId);
      const commentsCollectionRef = collection(postRef, "comments");
      const querySnapshot = await getDocs(commentsCollectionRef);
      const comments = [];
      querySnapshot.forEach((doc) => {
        const comment = {
          id: doc.id,
          ...doc.data(),
        };
        comments.push(comment);
      });
      commit("SET_COMMENTS", comments);
    } catch (error) {
      console.error("Error fetching comments: ", error);
    }
  },
  async addComment(
    { dispatch },
    { postId, comment }: { postId: string; comment: Comment }
  ) {
    try {
      const postRef = doc(db, "posts", postId);
      const commentsCollectionRef = collection(postRef, "comments");
      await addDoc(commentsCollectionRef, comment);
      dispatch("getComments", postId);
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  },
  async deleteComment({ dispatch }, { postId, commentId }) {
    try {
      const postRef = doc(db, "posts", postId);
      const commentRef = doc(postRef, "comments", commentId);
      await deleteDoc(commentRef);
      dispatch("getComments", postId);
    } catch (error) {
      console.error("Error deleting comment: ", error);
    }
  },
  async countComments({ commit }) {
    const counts = {};
    const postsSnapshot = await getDocs(collection(db, "posts"));
    for (const postDoc of postsSnapshot.docs) {
      const postRef = doc(db, "posts", postDoc.id);
      const commentsCollectionRef = collection(postRef, "comments");
      const commentsSnapshot = await getDocs(commentsCollectionRef);
      counts[postDoc.id] = commentsSnapshot.size;
    }
    commit("SET_COMMENTS_COUNT", counts);
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
