<template>
  <div class="signin p-8 bg-white shadow-lg rounded-lg w-full max-w-md mx-auto">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="email"
        >メールアドレス</label
      >
      <input
        class="w-full p-2 border rounded-md"
        type="email"
        v-model="email"
        id="email"
      />
    </div>

    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password"
        >パスワード</label
      >
      <input
        class="w-full p-2 border rounded-md"
        type="password"
        v-model="password"
        id="password"
      />
    </div>

    <button
      class="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
      @click.prevent="signin"
    >
      ログイン
    </button>
    <button
      class="mt-4 w-full bg-white text-blue-500 p-2 rounded hover:bg-gray-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
      @click.prevent="signinWithGoogle"
    >
      <span class="material-icons mr-2">account_circle</span>
      Login with Google
    </button>
    <p class="mt-4 text-center">
      新しいアカウントを作成しますか？
      <router-link class="text-blue-500 hover:underline" to="/signup"
        >新規登録</router-link
      >
    </p>
  </div>
</template>

<script lang="ts">
import { mapActions } from "vuex";

export default {
  data(): any {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions("auth", ["login", "loginWithGoogle"]),
    ...mapActions("utils", ["openDialog", "setLoading"]),
    async signin() {
      this.setLoading(true);
      const isLogin = await this.login({
        email: this.email,
        password: this.password,
      });
      this.setLoading(false);
      if (isLogin) {
        this.openDialog({
          message: "ログインに成功しました！",
          success: true,
          targetLocation: "/",
        });
      } else {
        this.openDialog({
          message: "ログインに失敗しました。",
          success: false,
        });
      }
    },
    async signinWithGoogle() {
      this.setLoading(true);
      const isLogin = await this.loginWithGoogle();
      this.setLoading(false);
      if (isLogin) {
        this.openDialog({
          message: "Googleアカウントでのログインに成功しました！",
          success: true,
          targetLocation: "/",
        });
      } else {
        this.openDialog({
          message: "Googleアカウントでのログインに失敗しました。",
          success: false,
        });
      }
    },
  },
};
</script>
