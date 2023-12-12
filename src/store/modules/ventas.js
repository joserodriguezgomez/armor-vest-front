// ventas.js

const state = {
    desserts: [],
  };
  
  const mutations = {
    setDesserts(state, desserts) {
      state.desserts = desserts;
    },
  };
  
  const actions = {
    initialize({ commit }) {
      const desserts = [
        {
            name: "Muni Providencia",
            producto: "Chaleco",
            talla: "L",
            factura: 24,
            gd: 4.0,
            vencimiento: null,
            vendedor: "Veronica",
            comentarios: "",
            archivoAdjunto: null,
          },
          {
            name: "Banco Falabella",
            producto: "Chaleco",
            talla: "M",
            factura: 37,
            gd: 4.3,
            vencimiento: null,
            vendedor: "Mileydis",
            comentarios: "",
            archivoAdjunto: null,
          },
          {
            name: "Prosegur",
            producto: "Chaleco",
            talla: "L",
            factura: 23,
            gd: 6.0,
            vencimiento: null,
            vendedor: "Veronica",
            comentarios: "",
            archivoAdjunto: null,
          },
          {
            name: "Banco Ripley",
            producto: "Funda",
            talla: "S",
            factura: 67,
            gd: 4.3,
            vencimiento: null,
            vendedor: "Veronica",
            comentarios: "",
            archivoAdjunto: null,
          },
          {
            name: "Muni Las Condes",
            producto: "Funda",
            talla: "M",
            factura: 49,
            gd: 3.9,
            vencimiento: null,
            vendedor: "Mileydis",
            comentarios: "",
            archivoAdjunto: null,
          },
          {
            name: "Muni La Serena",
            producto: "Funda",
            talla: "XL",
            factura: 94,
            gd: 0.0,
            vencimiento: null,
            vendedor: "Mileydis",
            comentarios: "",
            archivoAdjunto: null,
          },
          {
            name: "Banco Ripley",
            producto: "Chaleco",
            talla: "M",
            factura: 98,
            gd: 0,
            vencimiento: null,
            vendedor: "Mileydis",
            comentarios: "",
            archivoAdjunto: null,
          },
          {
            name: "Prosegur",
            producto: "Chaleco",
            talla: "S",
            factura: 87,
            gd: 6.5,
            vencimiento: null,
            vendedor: "Veronica",
            comentarios: "",
            archivoAdjunto: null,
          },
          {
            name: "Banco Santander",
            producto: "Chaleco",
            talla: "L",
            factura: 51,
            gd: 4.9,
            vencimiento: null,
            vendedor: "Mileydis",
            comentarios: "",
            archivoAdjunto: null,
          },
          {
            name: "Muni Lo Ovalle",
            producto: "Chaleco",
            talla: "XL",
            factura: 65,
            gd: 7,
            vencimiento: null,
            vendedor: "Veronica",
            comentarios: "",
            archivoAdjunto: null,
          },
    ];
    commit('setDesserts', desserts);
  },
};

const getters = {
    allDesserts: (state) => state.desserts,
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  };