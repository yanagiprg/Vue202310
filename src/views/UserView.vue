<template>
  <div class="profile p-8 bg-gray-100 rounded-md w-full max-w-lg mx-auto">
    <div class="mb-8 bg-white p-6 rounded-md shadow-sm">
      <div class="flex items-center justify-center mb-4">
        <img
          :src="authUser.photoURL"
          alt="User Avatar"
          class="w-24 h-24 rounded-full border border-gray-300 object-cover shadow"
        />
      </div>
      <div class="mb-4 flex items-center pl-4 border-b">
        <label class="block text-gray-700 font-medium mb-2 mr-4">
          {{ editMode ? "New Profile Image:" : "" }}
        </label>
        <input
          v-if="editMode"
          @change="onFileChange"
          type="file"
          class="border rounded w-full p-2"
        />
      </div>
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
        <button
          v-if="editMode"
          @click.prevent="updateProfile"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          更新
        </button>
        <button
          v-else
          @click="editUser"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          編集
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();

const editMode = ref(false);
const newDisplayName = ref("");
const newProfileImage = ref<File | null>(null);

const user = ref({
  authId: route.params.id,
  displayName: "",
  photoURL: null,
  updatedAt: new Date(),
});

const authUser = computed(() => store.state.auth.authUser);

watch(authUser, () => {
  user.value = authUser.value;
});

const updateAuthUser = async (user) => {
  await store.dispatch("auth/updateAuthUser", user);
  return true;
};
const deleteAuthUser = async () => {
  await store.dispatch("auth/deleteAuthUser");
  return true;
};
const openDialog = (options) => {
  store.dispatch("utils/openDialog", options);
};
const setLoading = (isLoading) => {
  store.dispatch("utils/setLoading", isLoading);
};

const editUser = () => {
  editMode.value = true;
  newDisplayName.value = user.value.displayName;
};

const updateProfile = async () => {
  if (newDisplayName.value) {
    setLoading(true);
    user.value.displayName = newDisplayName.value;
    if (newProfileImage.value) {
      const imageUrl = await store.dispatch(
        "auth/uploadImage",
        newProfileImage.value
      );
      user.value.photoURL = imageUrl;
    }
    const isUpdate = await updateAuthUser(user.value);
    setLoading(false);
    if (isUpdate) {
      openDialog({
        message: "ユーザー情報を更新しました",
        success: true,
        targetLocation: "",
      });
    } else {
      openDialog({
        message: "ユーザー情報の更新に失敗しました。",
        success: false,
      });
    }
    newDisplayName.value = "";
    newProfileImage.value = null;
    editMode.value = false;
  } else {
    alert("表示名を入力してください");
  }
};

const removeUser = async () => {
  setLoading(true);
  const isDelete = await deleteAuthUser();
  setLoading(false);
  if (isDelete) {
    openDialog({
      message: "ユーザーを削除しました",
      success: true,
      targetLocation: "/login",
    });
  } else {
    openDialog({
      message: "ユーザーの削除に失敗しました。",
      success: false,
    });
  }
};

const onFileChange = (event) => {
  newProfileImage.value = event.target.files[0];
};
</script>
