import {createStore} from 'vuex';

export const store = createStore({
  state() {
    return {
      token: sessionStorage.getItem('token') || null,
      role: sessionStorage.getItem('role') || null,
    };
  },

  getters: {
    isAuthenticated(state) {
      return state.token !== null && state.role !== null;
    },
    getToken(state) {
      return state.token;
    },
    getRole(state) {
      return state.role;
    }
  },

  mutations: {
    setAuthData(state, token) {
      state.token = token;
      sessionStorage.setItem('token', token);
    },
    logout() {
      sessionStorage.setItem('token', null);
      sessionStorage.setItem('role', null);
    },
    setRole(state, role) {
      state.role = role;
      sessionStorage.setItem('role', role);
    }
  },

  actions: {
    login({ commit }, token) {
      commit("setAuthData", token);
    },
    setUser({commit}, user) {
      commit('setRole', user);
    },
    logout({ commit }) {
      commit("logout");
    },

  },
});
