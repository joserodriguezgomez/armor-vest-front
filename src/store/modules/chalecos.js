import axios from "axios";


export default {
  namespaced: true,
  state: {
    urlMode : "http://127.0.0.1:8000/api/",
    // urlMode : "https://armor-vest-backend-fb07262d3ec2.herokuapp.com/api",
    fields: [
      // { label: 'ID CHALECO', model: 'ID_CHALECO' },
      // { label: 'ID POLIZA', model: 'ID_POLIZA' },
      { label: 'MODELO', model: 'modelo' },
      { label: 'ESTADO', model: 'status' },
      { label: 'TALLA', model: 'talla' },
      { label: 'ID IDIC', model: 'id_idic' },
      { label: 'VENCIMIENTO PANEL', model: 'vencimiento_chelco' },
      { label: 'VENCIMIENTO FUNDA', model: 'vencimiento_funda' },
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
      { title: 'DUP ESTADO', key: 'dup_status' },
      { title: 'VENC. PANEL', key: 'vencimiento_chelco' },
      { title: 'VENC. FUNDA', key: 'vencimiento_funda' },
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
    async leerChalecos({ commit, state }){
      const url = state.urlMode +"chalecos";
      const response = await axios.get(url);
      // const idicsFormateados = response.data.map(idic => ({
      //   ...idic,
      //   fecha_poliza: formatearFecha(idic.fecha_poliza),
      //   fecha_poliza_vencimiento: formatearFecha(idic.fecha_poliza_vencimiento)
      // }));
      commit("SET_CHALECOS", response.data);
    },
    async updateChaleco({ dispatch, state }, payload) {
      const url =  state.urlMode + `chalecos/${payload.item._id}`;
      await axios.put(url, payload.item); // El segundo argumento es el cuerpo de la solicitud
      dispatch('leerChalecos');
      // commit('UPDATE_DESSERT', payload.index,response.data);
    },
    async createChaleco({ dispatch, state }, payload) {
      const url= state.urlMode + "chalecos"
      await axios.post(url, payload.item);
      dispatch('leerChalecos');
    },
    async deleteChaleco({ dispatch, state }, payload) {
      const url =  state.urlMode + `chalecos/${payload.item._id}`;
      await axios.delete(url);
      dispatch('leerChalecos');
    },
  }
  
}
