import axios from "axios";
import moment from 'moment';


const state = {
  urlMode: "https://armor-vest-backend-b3be97e8ab51.herokuapp.com/api/",
  //urlMode: "http://127.0.0.1:8000/api/",
  userData: [
  ]
};


const mutations = {
  SET_USER_DATA(state, data) {
    state.userData = data;
  },
  UPDATE_USER(state, updatedUser) {
    const index = state.userData.findIndex(product => product.username === updatedUser.username);
    if (index !== -1) {
      state.userData.splice(index, 1, updatedUser);
    }
  },
  ADD_USER(state, newUser) {
    state.userData.push(newUser);
  }
};

const actions = {
  async fetchUserData({ commit }) {
    console.log("ejecutando api")
    const url = state.urlMode + `users/`;
    const response = await axios.get(url);
    // Simulate fetching data from API
    commit("SET_USER_DATA", response.data);
  },
  async fetchLoteData({commit}, lote = false){
    const url = state.urlMode + `lote_summary`;
    
    const response = await axios.get(url);
    console.log("desde api:",lote)
    commit("SET_LOTE_DATA", { data: response.data, lote: lote });
  },
  async updateUser({ dispatch, state }, payload) {
    const url = state.urlMode + `users/${payload._id}`;

    await axios.put(url, payload);
    dispatch('fetchUserData');

  },
  async addUser({ dispatch, state }, payload) {
    const url = state.urlMode + "users";
    await axios.post(url, payload);
    dispatch('fetchUserData');

  },
  async deleteUser({ dispatch, state }, payload) {
    const url = state.urlMode + `users/${payload._id}`;
    await axios.delete(url);
    dispatch('fetchUserData');
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};