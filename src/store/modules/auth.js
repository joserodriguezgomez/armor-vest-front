import axios from 'axios';

const state = {
  token: localStorage.getItem('token') || '',
  user: JSON.parse(localStorage.getItem('user')) || {},
  status: '',
};

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
  user: state => state.user,
};

const actions = {
  async login({ commit }, user) {
    commit('auth_request');
    try {
      const response = await axios.post('https://armor-vest-backend-b3be97e8ab51.herokuapp.com/token', new URLSearchParams({
        username: user.username,
        password: user.password
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      const token = response.data.access_token;
      const userData = {
        username: response.data.username,
        role: response.data.role
      };
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      commit('auth_success', { token, userData });
    } catch (error) {
      commit('auth_error');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      throw error;
    }
  },
  logout({ commit }) {
    commit('logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  },
};

const mutations = {
  auth_request(state) {
    state.status = 'loading';
  },
  auth_success(state, { token, userData }) {
    state.status = 'success';
    state.token = token;
    state.user = userData;
  },
  auth_error(state) {
    state.status = 'error';
  },
  logout(state) {
    state.status = '';
    state.token = '';
    state.user = {};
  },
};


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  };