// store/modules/clientes.js

const state = {
    clientes: [],
  };
  
  const mutations = {
    setClientes(state, clientes) {
      state.clientes = clientes;
    },
  };
  
  const actions = {
    initialize({ commit }) {
      const clientes = [
        {
            name: "Muni Providencia",
            rut: 188600999,
            direccion: "av el bosque 1234",
            contacto: "juan perez",
            correo: "juan.perez@gmail.com",
            telefono: +56911223344,
            comentarios: "",
          },
          {
            name: "Banco Falabella",
            rut: 192316549,
            direccion: "av las condes 1234",
            contacto: "Pedro perez",
            correo: "pedro.perez@gmail.com",
            telefono: +56911223344,
            comentarios: "",
          },
          {
            name: "Prosegur",
            rut: 188600999,
            direccion: "av el bosque 1234",
            contacto: "juan perez",
            correo: "juan.perez@gmail.com",
            telefono: +56911223344,
            comentarios: "",
          },
          {
            name: "Banco Ripley",
            rut: 188600999,
            direccion: "av el bosque 1234",
            contacto: "juan perez",
            correo: "juan.perez@gmail.com",
            telefono: +56911223344,
            comentarios: "",
          },
          {
            name: "Muni viña del mar",
            rut: 188600999,
            direccion: "av el bosque 1234",
            contacto: "juan perez",
            correo: "juan.perez@gmail.com",
            telefono: +56911223344,
            comentarios: "",
          },
          {
            name: "Muni Las Condes",
            rut: 188600999,
            direccion: "av el bosque 1234",
            contacto: "juan perez",
            correo: "juan.perez@gmail.com",
            telefono: +56911223344,
            comentarios: "",
          },
          {
            name: "Muni La Serena",
            rut: 188600999,
            direccion: "av el bosque 1234",
            contacto: "juan perez",
            correo: "juan.perez@gmail.com",
            telefono: +56911223344,
            comentarios: "",
          },
          {
            name: "Muni Lo Ovalle",
            rut: 188600999,
            direccion: "av el bosque 1234",
            contacto: "juan perez",
            correo: "juan.perez@gmail.com",
            telefono: +56911223344,
            comentarios: "",
          },
          {
            name: "La polar",
            rut: 188600999,
            direccion: "av el bosque 1234",
            contacto: "juan perez",
            correo: "juan.perez@gmail.com",
            telefono: +56911223344,
            comentarios: "",
          },
          {
            name: "Scotiabanck",
            rut: 188600999,
            direccion: "av el bosque 1234",
            contacto: "juan perez",
            correo: "juan.perez@gmail.com",
            telefono: +56911223344,
            comentarios: "",
          },
      ];
      commit('setClientes', clientes);
    },
  };
  
  const getters = {
    allClientes: (state) => state.clientes,
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  };