import { createStore } from 'vuex';

export default createStore({
  state: {
    products: Array.from({ length: 300 }, (_, index) => ({
      id: index + 1,
      inStock: Math.random() > 0.5,
      selected: false,
      cliente: null,
      numeroFactura: null,
    })),
    currentPage: 1,
    pageSize: 150,
    lastSale: [],
    selectedProducts: []
  },
  getters: {
    paginatedProducts: (state) => {
      const start = (state.currentPage - 1) * state.pageSize;
      const end = start + state.pageSize;
      return state.products.slice(start, end);
    },
    totalPages: (state) => {
      return Math.ceil(state.products.length / state.pageSize);
    },
    selectedProducts: (state) => {
      return state.products.filter(product => product.selected);
    }
  },
  mutations: {
    setCurrentPage(state, page) {
      state.currentPage = page;
    },
    toggleSelection(state, product) {
      if (product.inStock) {
        product.selected = !product.selected;
        if (product.selected) {
          state.selectedProducts.push(product);
        } else {
          state.selectedProducts = state.selectedProducts.filter(p => p.id !== product.id);
        }
      }
    },
    sellSelectedProducts(state) {
      state.lastSale = state.selectedProducts.map(product => ({ ...product }));
      state.selectedProducts.forEach(product => {
        product.inStock = false;
        product.selected = false;
      });
      state.selectedProducts = [];
    },
    undoLastSale(state) {
      state.lastSale.forEach(soldProduct => {
        const originalProduct = state.products.find(product => product.id === soldProduct.id);
        if (originalProduct) {
          originalProduct.inStock = true;
        }
      });
      state.lastSale = [];
    },
    assignProductsToClient(state, { cliente, numeroFactura }) {
      state.selectedProducts.forEach(product => {
        product.cliente = cliente;
        product.numeroFactura = numeroFactura;
      });
      state.selectedProducts = [];
    }
  },
  actions: {
    setCurrentPage({ commit }, page) {
      commit('setCurrentPage', page);
    },
    toggleSelection({ commit }, product) {
      commit('toggleSelection', product);
    },
    sellSelectedProducts({ commit }) {
      commit('sellSelectedProducts');
    },
    undoLastSale({ commit }) {
      commit('undoLastSale');
    },
    assignProductsToClient({ commit }, { cliente, numeroFactura }) {
      commit('assignProductsToClient', { cliente, numeroFactura });
    }
  }
});
