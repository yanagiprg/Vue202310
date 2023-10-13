<template>
  <div class="profile p-8 bg-gray-100 rounded-md w-full max-w-lg mx-auto mt-8">
    <div class="mb-8 bg-white p-6 rounded-md shadow-sm">
      <h2 class="text-xl font-semibold mb-4">
        {{ editMode ? "Edit Profile" : "User Profile" }}
      </h2>

      <div class="mb-4 flex items-center pl-4 border-b">
        <label class="block text-gray-700 font-medium mb-2 mr-4">{{
          editMode ? "New Display Name:" : "Display Name:"
        }}</label>
        <input
          v-if="editMode"
          v-model="newDisplayName"
          type="text"
          placeholder=""
          class="border rounded w-full p-2 h-6"
        />
        <p v-else class="pb-2">{{ authUser.displayName }}</p>
      </div>

      <div class="mb-4 flex items-center pl-4 border-b">
        <label class="block text-gray-700 font-medium mb-2 mr-4">Email:</label>
        <p class="pb-2">{{ authUser.email }}</p>
      </div>
      <div class="flex justify-between">
        <button
          v-if="editMode"
          @click.prevent="updateProfile"
          class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
        >
          更新
        </button>
        <button
          v-else
          @click="editMode = true"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          編集
        </button>
        <button
          v-if="editMode"
          @click="editMode = false"
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
        >
          キャンセル
        </button>
        <button
          v-else
          @click.prevent="removeUser"
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
        >
          削除
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      editMode: false,
      newDisplayName: "",
      user: {
        displayName: "",
        authId: this.$route.params.id,
        updatedAt: new Date(),
      },
    };
  },
  computed: mapState("auth", ["authUser"]),
  watch: {
    authUser() {
      this.user = this.authUser;
    },
  },
  methods: {
    ...mapActions("auth", ["updateAuthUser", "deleteAuthUser"]),
    ...mapActions("utils", ["openDialog", "setLoading"]),
    async updateProfile() {
      this.setLoading(true);
      this.user.displayName = this.newDisplayName;
      const isUpdate = await this.updateAuthUser(this.user);
      this.setLoading(false);
      if (isUpdate) {
        this.openDialog({
          message: "ユーザー情報を更新しました",
          success: true,
          targetLocation: "",
        });
      } else {
        this.openDialog({
          message: "ユーザー情報の更新に失敗しました。",
          success: false,
        });
      }
      this.editMode = false;
    },
    async removeUser() {
      this.setLoading(true);
      const isDelete = await this.deleteAuthUser();
      this.setLoading(false);
      if (isDelete) {
        this.openDialog({
          message: "ユーザーを削除しました",
          success: true,
          targetLocation: "/login",
        });
      } else {
        this.openDialog({
          message: "ユーザーの削除に失敗しました。",
          success: false,
        });
      }
    },
  },
};
</script>
