<template>
  <div class="signin p-8 bg-gray-100 rounded-md w-full max-w-md mx-auto mt-8">
    <table class="w-full">
      <tr>
        <th class="text-left pb-4">メールアドレス</th>
      </tr>
      <tr>
        <td>
          <input
            class="w-full p-2 border rounded-md"
            type="email"
            v-model="email"
          />
        </td>
      </tr>
      <tr>
        <th class="text-left py-4">パスワード</th>
      </tr>
      <tr>
        <td>
          <input
            class="w-full p-2 border rounded-md"
            type="password"
            v-model="password"
          />
        </td>
      </tr>
    </table>
    <button
      class="mt-6 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
      @click.prevent="signin"
    >
      ログイン
    </button>
    <button
      class="mt-6 w-full bg-white text-blue-500 p-2 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
      @click.prevent="signinWithGoogle"
    >
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
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["login", "loginWithGoogle"]),
    async signin() {
      await (this as any).login({
        email: this.email,
        password: this.password,
      });
      this.$router.push("/");
    },
    async signinWithGoogle() {
      await (this as any).loginWithGoogle();
      this.$router.push("/");
    },
  },
});
</script>
