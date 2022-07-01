const authStore = {
  namespaced: true,
  state: () => ({
    isAuthenticated: false,
    user: {
      accessToken: '',
      email: '',
      id: 0,
    },
  }),
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
  },
  mutations: {
    setUser(state, user) {
      state.isAuthenticated = true;
      state.user.accessToken = user.accessToken;
      state.user.email = user.email;
      state.user.id = user.id;
    },
    clearUser(state) {
      state.isAuthenticated = false;
      state.user.accessToken = '';
      state.user.email = '';
      state.user.id = 0;
    },
  },
};

export default authStore;
