export default {
    namespaced: true,
    state: {
      isAuthenticated: false,
    },
    mutations: {
      setAuthenticated(state, value) {
        state.isAuthenticated = value;
      },
    },
    actions: {
      login({ commit }) {
        // Lógica de inicio de sesión aquí
        commit('setAuthenticated', true);
      },
      logout({ commit }) {
        // Lógica de cierre de sesión aquí
        commit('setAuthenticated', false);
      },
    },
  };