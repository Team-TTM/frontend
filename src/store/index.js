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
      localStorage.setItem("auth_token", token);
    },
    logout(state) {
      state.token = null;
      localStorage.removeItem("auth_token");
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
