import {createStore} from 'vuex';

export const store = createStore({
  state() {
    return {
      token: null,
      role: null
    };
  },

  getters: {
    isAuthenticated(state) {
      return state.token !== null && state.token !== undefined;
    },
    getToken(state) {
      return state.token;
    },
    getRole(state) {
      return state.role;
    }
  },

  mutations: {
    setAuthData(state,  token ) {
      state.token = token;
    },
    logout(state) {
      state.token = null;
    },
    setRole(state, role) {
      state.role = role;
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
