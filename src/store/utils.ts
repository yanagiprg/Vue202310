const state = {
  showDialog: false,
  dialogMessage: "",
  dialogIsSuccess: true,
  targetLocation: "",
  isLoading: false,
};
const getters = {
  showDialog: (state) => state.showDialog,
  dialogMessage: (state) => state.dialogMessage,
  dialogIsSuccess: (state) => state.dialogIsSuccess,
  targetLocation: (state) => state.targetLocation,
};
const mutations = {
  SET_DIALOG(state, { message, success, targetLocation }) {
    state.showDialog = true;
    state.dialogMessage = message;
    state.dialogIsSuccess = success;
    state.targetLocation = targetLocation;
  },
  CLOSE_DIALOG(state) {
    state.showDialog = false;
    state.dialogMessage = "";
    state.targetLocation = "";
  },
  SET_LOADING(state, isLoading) {
    state.isLoading = isLoading;
  },
};

const actions = {
  openDialog({ commit }, { message, success = true, targetLocation = "" }) {
    commit("SET_DIALOG", { message, success, targetLocation });
  },
  closeDialog({ commit }) {
    commit("CLOSE_DIALOG");
  },
  setLoading({ commit }, isLoading) {
    commit("SET_LOADING", isLoading);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
