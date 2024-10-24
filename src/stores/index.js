import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      user: null,
      isAuthenticated: false,
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.isAuthenticated = !!user; // Set authentication status
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  actions: {
    login({ commit }, user) {
      // Simulate an API call
      setTimeout(() => {
        commit('setUser', user);
      }, 1000);
    },
    logout({ commit }) {
      commit('logout');
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    currentUser: (state) => state.user,
  },
});

export default store;
