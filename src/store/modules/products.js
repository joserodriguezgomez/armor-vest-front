import axios from "axios";



const state = {
  urlMode : "http://127.0.0.1:8000/api/",
  productData: [
  ]
};

const mutations = {
  SET_PRODUCT_DATA(state, data) {
    state.productData = data;
  },
  UPDATE_PRODUCT(state, updatedProduct) {
    const index = state.productData.findIndex(product => product.idChaleco === updatedProduct.idChaleco);
    if (index !== -1) {
      state.productData.splice(index, 1, updatedProduct);
    }
  },
  ADD_PRODUCT(state, newProduct) {
    state.productData.push(newProduct);
  },
  DELETE_PRODUCT(state, idChaleco) {
    state.productData = state.productData.filter(product => product.idChaleco !== idChaleco);
  }
};

const actions = {
  async fetchProductData({ commit }) {
    const url = state.urlMode +"products";
    const response = await axios.get(url);
    console.log(response)
    // Simulate fetching data from API
    commit("SET_PRODUCT_DATA", response.data);
  },
  async updateProduct({ dispatch, state }, payload) {
    console.log(payload)
    const url = state.urlMode +`products/${payload._id}`;

    // payload.item.vencimientoPoliza = convertirDDMMYYYYaISO(payload.item.vencimientoPoliza);
    // payload.item.vencimientoPanel = convertirDDMMYYYYaISO(payload.item.vencimientoPanel)
    // payload.item.fechaVenta = convertirDDMMYYYYaISO(payload.item.fechaVenta)
    // payload.item.vencimiento_funda = convertirDDMMYYYYaISO(payload.item.vencimiento_funda)

    await axios.put(url, payload);
    dispatch('fetchProductData');

  },
  async addProduct({ dispatch, state }, payload) {
    console.log(payload)
    const url = state.urlMode +"products";
    await axios.post(url, payload);
    dispatch('fetchProductData');
    
  },
  deleteProduct({ commit }, idChaleco) {
    commit("DELETE_PRODUCT", idChaleco);
  }
};

const getters = {
  productData: (state) => state.productData
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};


function convertirDDMMYYYYaISO(fechaDDMMYYYY) {
  const [dia, mes, año] = fechaDDMMYYYY.split('-');
  const fecha = new Date(año, mes - 1, dia);
  return fecha.toISOString();
}



