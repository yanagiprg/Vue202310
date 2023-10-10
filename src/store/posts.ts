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
    const index = state.posts.findIndex((post) => post.id === editedPost.id);
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
  async createPost({ dispatch }, post: Article) {
    try {
      await addDoc(collection(db, "posts"), post);
      dispatch("getPosts");
      alert("記事を投稿しました。");
    } catch (error) {
      alert("記事の投稿に失敗しました。");
      console.error("Error adding post: ", error);
    }
  },
  async updatePost({ commit }, post: Article) {
    if (!post.id) return;
    const postRef = doc(db, "posts", post.id);
    try {
      await setDoc(postRef, post);
      commit("EDIT_POST", post);
      alert("記事を更新しました。");
    } catch (error) {
      alert("記事の更新に失敗しました。");
      console.error("Error updating post: ", error);
    }
  },
  async removePost({ commit }, postId: string) {
    try {
      await deleteDoc(doc(db, "posts", postId));
      commit("DELETE_POST", postId);
      alert("記事を削除しました。");
    } catch (error) {
      alert("記事の削除に失敗しました。");
      console.error("Error deleting post: ", error);
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
  async addComment({ dispatch }, { postId, comment }) {
    try {
      const postRef = doc(db, "posts", postId);
      const commentsCollectionRef = collection(postRef, "comments");
      await addDoc(commentsCollectionRef, comment);
      dispatch("getComments", postId);
    } catch (error) {
      alert("コメントの投稿に失敗しました。");
      console.error("Error adding comment: ", error);
    }
  },
  async deleteComment({ dispatch }, { postId, commentId }) {
    try {
      const postRef = doc(db, "posts", postId);
      const commentRef = doc(postRef, "comments", commentId);
      await deleteDoc(commentRef);
      dispatch("getComments", postId);
      alert("コメントを削除しました。");
    } catch (error) {
      alert("コメントの削除に失敗しました。");
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
