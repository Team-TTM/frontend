import {createStore} from 'vuex';

export const store = createStore({
  state() {
    return {
      token: localStorage.getItem('token') || null,
      role: localStorage.getItem('role') || null,
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
      localStorage.setItem('token', token);
    },
    logout(state) {
      localStorage.setItem('token', null);
      localStorage.setItem('role', null);
      state.role = null;
      state.token = null;
    },
    setRole(state, role) {
      state.role = role;
      localStorage.setItem('role', role);
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
