import axios from "axios";
import moment from 'moment';


const state = {
  urlMode: "https://armor-vest-backend-b3be97e8ab51.herokuapp.com/api/",
  //urlMode: "http://127.0.0.1:8000/api/",
  productData: [
  ],
  chartData: {},
  lote_data:[]
};


const mutations = {
  SET_LOTE_DATA(state, { data, lote }) {
    if (lote === false) {
      console.log("se ejecuta el falso")
      state.lote_data = data;
    } else {
      console.log("se ejecuta el verdadero")

      state.lote_data = lote;
    }
  },
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
  async fetchProductData({ commit }, payload) {
    const url = state.urlMode + `products/${payload}`;
    const response = await axios.get(url);
    // Simulate fetching data from API
    commit("SET_PRODUCT_DATA", response.data);
  },
  async fetchLoteData({commit}, lote = false){
    const url = state.urlMode + `lote_summary`;
    
    const response = await axios.get(url);
    console.log("desde api:",lote)
    commit("SET_LOTE_DATA", { data: response.data, lote: lote });
  },
  async updateProduct({ dispatch, state }, payload) {
    console.log(payload._id)
    payload.updatedBy = "sin informacion"
    console.log(payload)
    const url = state.urlMode + `products/${payload._id}`;

    // payload.item.vencimientoPoliza = convertirDDMMYYYYaISO(payload.item.vencimientoPoliza);
    // payload.item.vencimientoPanel = convertirDDMMYYYYaISO(payload.item.vencimientoPanel)
    // payload.item.fechaVenta = convertirDDMMYYYYaISO(payload.item.fechaVenta)
    // payload.item.vencimiento_funda = convertirDDMMYYYYaISO(payload.item.vencimiento_funda)

    await axios.put(url, payload);
    dispatch('fetchProductData');

  },
  async addProduct({ dispatch, state }, payload) {
    console.log(payload)
    const url = state.urlMode + "products";
    await axios.post(url, payload);
    dispatch('fetchProductData');

  },
  async deleteProduct({ dispatch, state }, payload) {
    const url = state.urlMode + `products/${payload._id}`;
    await axios.delete(url);
    dispatch('fetchProductData');
  }
};

const getters = {
  productData: (state) => state.productData,
  topClientsChartData: (state) => {
    const salesByClient = {};

    state.productData.forEach((product) => {
      const cliente = product.cliente;
      if (salesByClient[cliente]) {
        salesByClient[cliente] += 1;
      } else {
        salesByClient[cliente] = 1;
      }
    });

    const sortedClients = Object.entries(salesByClient)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    const labels = sortedClients.map(client => client[0]);
    const data = sortedClients.map(client => client[1]);

    return {
      labels,
      datasets: [
        {
          label: 'Clientes',
          data,
          backgroundColor: "#f87979"
        }
      ]
    };
  },
  salesBySizeOverTime: (state) => {
    const salesBySize = {};

    state.productData.forEach((product) => {
      const talla = product.talla;
      const fechaVenta = moment(product.fechaVenta).format('MMM/YY');

      if (!salesBySize[talla]) {
        salesBySize[talla] = {};
      }

      if (salesBySize[talla][fechaVenta]) {
        salesBySize[talla][fechaVenta] += 1;
      } else {
        salesBySize[talla][fechaVenta] = 1;
      }
    });

    // Obtener todas las fechas únicas en formato ordenado
    const allDates = Array.from(new Set(state.productData.map(product => moment(product.fechaVenta).format('MMM/YY'))))
                          .sort((a, b) => moment(a, 'MMM/YY') - moment(b, 'MMM/YY'));

    const datasets = Object.entries(salesBySize).map(([talla, sales]) => {
      const data = allDates.map(date => sales[date] || 0);
      return {
        label: `Talla ${talla}`,
        data,
        borderColor: getColorForSize(talla),
        backgroundColor: getColorForSize(talla, true),
        fill: true
      };
    });

    return {
      labels: allDates,
      datasets
    };
  },
  expirationsByDate: (state) => {
    const expirations = {};

    state.productData.forEach((product) => {
      const fechaVencimiento = moment(product.vencimientoPoliza).format('MMM-YYYY');

      if (expirations[fechaVencimiento]) {
        expirations[fechaVencimiento] += 1;
      } else {
        expirations[fechaVencimiento] = 1;
      }
    });

    const labels = Object.keys(expirations).sort((a, b) => moment(a, 'MMM-YYYY') - moment(b, 'MMM-YYYY'));
    const data = labels.map(label => expirations[label]);

    return {
      labels,
      datasets: [
        {
          label: 'Cantidad',
          data,
          backgroundColor: "#f87979",
          hoverBackgroundColor: "#f88f8f"
        }
      ]
    };
  },
  expirationsByDatePanel: (state) => {
    const expirations = {};

    state.productData.forEach((product) => {
      const fechaVencimiento = moment(product.vencimientoPanel).format('MMM-YYYY');

      if (expirations[fechaVencimiento]) {
        expirations[fechaVencimiento] += 1;
      } else {
        expirations[fechaVencimiento] = 1;
      }
    });

    const labels = Object.keys(expirations).sort((a, b) => moment(a, 'MMM-YYYY') - moment(b, 'MMM-YYYY'));
    const data = labels.map(label => expirations[label]);

    return {
      labels,
      datasets: [
        {
          label: 'Cantidad',
          data,
          backgroundColor: "#f87979",
          hoverBackgroundColor: "#f88f8f"
        }
      ]
    };
  },
  expirationsByDateFunda: (state) => {
    const expirations = {};

    state.productData.forEach((product) => {
      const fechaVencimiento = moment(product.vencimiento_funda).format('MMM-YYYY');

      if (expirations[fechaVencimiento]) {
        expirations[fechaVencimiento] += 1;
      } else {
        expirations[fechaVencimiento] = 1;
      }
    });

    const labels = Object.keys(expirations).sort((a, b) => moment(a, 'MMM-YYYY') - moment(b, 'MMM-YYYY'));
    const data = labels.map(label => expirations[label]);

    return {
      labels,
      datasets: [
        {
          label: 'Cantidad',
          data,
          backgroundColor: "#f87979",
          hoverBackgroundColor: "#f88f8f"
        }
      ]
    };
  }
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


// Función para asignar colores según la talla
const getColorForSize = (size, background = false) => {
  const colors = {
    "L": "#f87979",
    "M": "#36a2eb",
    "S": "#ffcd56",
    "XL": "#00913f",
    "XXL": "#FF5733"
  };
  
  const color = colors[size] || "#000000";
  return background ? color.replace(')', ', 0.5)').replace('rgb', 'rgba') : color;
};
