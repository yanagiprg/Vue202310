<template>
  <transition name="dialog-fade">
    <div
      v-if="visible"
      class="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
    >
      <div
        class="absolute top-0 left-0 w-full h-full bg-black opacity-50"
      ></div>
      <div :class="dialogClasses">
        <div
          :class="bgColorClass"
          class="w-full h-8 rounded-t-lg flex items-center justify-center p-4"
        ></div>
        <div>
          <p class="text-lg font-medium bold text-gray-500 mt-8">
            {{ message }}
          </p>
        </div>
        <div class="text-right p-4">
          <button @click="close" :class="buttonClasses">閉じる</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType, SetupContext } from "vue";

export default defineComponent({
  props: {
    message: {
      type: String as PropType<string>,
      default: "",
    },
    success: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    visible: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
  },
  emits: ["update:visible", "dialogClosed"],
  setup(props, context: SetupContext) {
    const dialogClasses = ref([
      "rounded-lg",
      "shadow-lg",
      "w-2/3",
      "max-w-md",
      "relative",
      "bg-white",
    ]);

    const bgColorClass = computed(() => {
      return props.success ? "bg-blue-600" : "bg-red-600";
    });

    const buttonClasses = computed(() => {
      return [
        "border",
        "px-3",
        "py-1",
        "rounded",
        props.success
          ? "border-blue-600 text-blue-500 hover:bg-blue-100 hover:text-blue-600"
          : "border-red-600 text-red-500 hover:bg-red-100 hover:text-red-600",
      ];
    });

    const close = () => {
      context.emit("update:visible", false);
      context.emit("dialogClosed");
    };

    return {
      dialogClasses,
      bgColorClass,
      buttonClasses,
      close,
    };
  },
});
</script>

<style scoped>
.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: opacity 0.5s;
}
.dialog-fade-enter,
.dialog-fade-leave-to {
  opacity: 0;
}
</style>
