<template>
  <div class="signup p-8 bg-gray-100 rounded-md w-full max-w-md mx-auto mt-8">
    <table class="w-full">
      <tr>
        <th class="text-left pb-4">ユーザーネーム</th>
      </tr>
      <tr>
        <td>
          <input
            class="w-full p-2 border rounded-md"
            type="text"
            v-model="user.displayName"
          />
        </td>
      </tr>
      <tr>
        <th class="text-left py-4">メールアドレス</th>
      </tr>
      <tr>
        <td>
          <input
            class="w-full p-2 border rounded-md"
            type="email"
            v-model="user.email"
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
            v-model="user.password"
          />
        </td>
      </tr>
      <tr>
        <th class="text-left py-4">プロフィール画像</th>
      </tr>
      <tr>
        <td>
          <input type="file" @change="onFileChange" />
        </td>
      </tr>
    </table>
    <button
      class="mt-6 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
      @click.prevent="signupUser"
    >
      登録
    </button>
  </div>
</template>

<script lang="ts">
import { mapActions } from "vuex";

export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
        displayName: "",
        photoURL: null,
      },
    };
  },
  methods: {
    ...mapActions("auth", ["signup"]),
    ...mapActions("utils", ["openDialog", "setLoading"]),
    async signupUser() {
      this.setLoading(true);
      const isSignup = await this.signup(this.user);
      this.setLoading(false);
      if (isSignup) {
        this.openDialog({
          message: "ユーザー登録に成功しました",
          success: true,
          targetLocation: "/",
        });
      } else {
        this.openDialog({
          message: "ユーザー登録に失敗しました。",
          success: false,
        });
      }
    },
    async onFileChange(event) {
      this.user.photoURL = event.target.files[0];
    },
  },
};
</script>
