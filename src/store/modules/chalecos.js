import axios from "axios";


export default {
  namespaced: true,
  state: {

    fields: [
      // { label: 'ID CHALECO', model: 'ID_CHALECO' },
      // { label: 'ID POLIZA', model: 'ID_POLIZA' },
      { label: 'MODELO', model: 'modelo' },
      { label: 'ESTADO', model: 'status' },
      { label: 'TALLA', model: 'talla' },
      // { label: 'CLIENTE', model: 'CLIENTE' },
      // ... otros campos
    ],
    chalecos:[],
    chalecoHeaders:[
      { title: 'ID CHALECO', key: 'id_chaleco' },
      { title: 'ID IDIC', key: 'id_idic' },
      { title: 'MODELO', key: 'modelo' },
      { title: 'ESTADO', key: 'status' },
      { title: 'TALLA', key: 'talla' },
      // { title: 'CLIENTE', key: 'CLIENTE' },
      { title: 'Actions', key: 'actions', sortable: false }
      
    ]
  },
  mutations:{
    SET_CHALECOS(state, data){
      state.chalecos=data
    },
    UPDATE_CHALECO(state, { index, item }) {
      // Actualiza un elemento específico en el array de polizas
      state.chalecos[index] = item;
    },
    CREATE_CHALECO(state, {item }) {
      // Actualiza un elemento específico en el array de polizas
      state.chalecos.push(item)
    },
    DELETE_CHALECO(state, {index }) {
      // Actualiza un elemento específico en el array de polizas
      state.chalecos.splice(index, 1)
    }
  },
  actions: {
    async leerChalecos({ commit }){
      const url = "https://armor-vest-backend-fb07262d3ec2.herokuapp.com/api/chalecos";
      const response = await axios.get(url);
      // const idicsFormateados = response.data.map(idic => ({
      //   ...idic,
      //   fecha_poliza: formatearFecha(idic.fecha_poliza),
      //   fecha_poliza_vencimiento: formatearFecha(idic.fecha_poliza_vencimiento)
      // }));
      commit("SET_CHALECOS", response.data);
    },
    async updateChaleco({ dispatch }, payload) {
      const url = `https://armor-vest-backend-fb07262d3ec2.herokuapp.com/api/chalecos/${payload.item._id}`;
      await axios.put(url, payload.item); // El segundo argumento es el cuerpo de la solicitud
      dispatch('leerChalecos');
      // commit('UPDATE_DESSERT', payload.index,response.data);
    },
    async createChaleco({ dispatch }, payload) {
      const url= "https://armor-vest-backend-fb07262d3ec2.herokuapp.com/api/chalecos"
      await axios.post(url, payload.item);
      dispatch('leerChalecos');
    },
    async deleteChaleco({ dispatch }, payload) {
      const url = `https://armor-vest-backend-fb07262d3ec2.herokuapp.com/api/chalecos/${payload.item._id}`;
      await axios.delete(url);
      dispatch('leerChalecos');
    },
  }
  
}
