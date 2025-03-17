import { createStore } from "vuex";

export const store = createStore({
  state() {
    return {
      token: localStorage.getItem("auth_token") || null,
    };
  },

  getters: {
    isAuthenticated(state) {
      return state.token !== null && state.token !== undefined;
    },
    getToken(state) {
      return state.token;
    },

  },

  mutations: {
    setAuthData(state,  token ) {
      state.token = token;
    },
    logout(state) {
      state.token = null;
    },
  },

  actions: {
    login({ commit }, token) {
      commit("setAuthData", token);
    },
    logout({ commit }) {
      commit("logout");
    },
  },
});
