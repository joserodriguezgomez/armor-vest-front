import axios from "axios";


export default {
    namespaced: true,
    state: {
      urlMode : "http://127.0.0.1:8000/api/",
      // urlMode : "https://armor-vest-backend-fb07262d3ec2.herokuapp.com/api",
      showAlert: false,
      falertMessage: '',
      fields: [
        { label: 'LOTE', model: 'lote' },
        { label: 'SERIE', model: 'serie' },
        { label: 'IDIC', model: 'idic' },
        { label: 'NOMBRE', model: 'poliza_nombre' },
        { label: 'FECHA POLIZA', model: 'fecha_poliza' },
        { label: 'FECHA VENCIMIENTO', model: 'fecha_poliza_vencimiento' }
        // ... otros campos
      ],

      polizas:[],
    
  
      polizaHeaders:[
        { title: 'Id', key: 'id_idic' },
        { title: 'Lote', key: 'lote' },
        { title: 'Serie', key: 'serie' },
        // { title: 'Talla', key: 'talla' },
        { title: 'Idic', key: 'idic' },
        { title: 'Poliza', key: 'poliza_nombre' },
        { title: 'Fecha Creacion', key: 'fecha_poliza' },
        { title: 'Vencimiento', key: 'fecha_poliza_vencimiento' },
        { title: 'Actions', key: 'actions', sortable: false }
      ]
    },
    getters: {
      getPolizas: state => state.polizas,
      getPolizaHeaders: state => state.polizaHeaders
    },
    mutations:{
      SET_SHOW_ALERT(state, value) {
        state.showAlert = value;
      },
      SET_MSG_ALERT(state, value) {
        state.falertMessage = value;
      },
      SET_IDICS(state, data){
        state.polizas=data
      },

      UPDATE_DESSERT(state, { index, item }) {
        // Actualiza un elemento específico en el array de polizas
        state.polizas[index] = item;
      },
      CREATE_POLIZA(state, item ) {
        // Actualiza un elemento específico en el array de polizas
        state.polizas.push(item)
      },
      DELETE_POLIZA(state, {index }) {
        // Actualiza un elemento específico en el array de polizas
        state.polizas.splice(index, 1)
      }
    },
    actions: {
      async leerIdics({ commit, state }){
        const url = state.urlMode + "idic";
        const response = await axios.get(url);
        const idicsFormateados = response.data.map(idic => ({
          ...idic,
          fecha_poliza: formatearFecha(idic.fecha_poliza),
          fecha_poliza_vencimiento: formatearFecha(idic.fecha_poliza_vencimiento)
        }));
        commit("SET_IDICS", idicsFormateados);
      },

      async updateDessert({ dispatch, state }, payload) {
        const url = state.urlMode +`idic/${payload.item._id}`;
        payload.item.fecha_poliza = convertirDDMMYYYYaISO(payload.item.fecha_poliza);
        payload.item.fecha_poliza_vencimiento = convertirDDMMYYYYaISO(payload.item.fecha_poliza_vencimiento); // Incluye el ID en la URL
        await axios.put(url, payload.item); // El segundo argumento es el cuerpo de la solicitud
        dispatch('leerIdics');
        // commit('UPDATE_DESSERT', payload.index,response.data);
      },
      async createPoliza({ dispatch, state }, payload) {
        const url= state.urlMode + "idic"
        payload.item.fecha_poliza = convertirDDMMYYYYaISO(payload.item.fecha_poliza);
        payload.item.fecha_poliza_vencimiento = convertirDDMMYYYYaISO(payload.item.fecha_poliza_vencimiento);
        await axios.post(url, payload.item);
        dispatch('leerIdics');
      },
      async deletePoliza({ dispatch, state }, payload) {
        const url = state.urlMode +`idic/${payload.item._id}`;
        await axios.delete(url);
        dispatch('leerIdics');
      },
    }
    
  }


// Función de ayuda para formatear las fechas
function formatearFecha(fechaISO) {
  const fecha = new Date(fechaISO);
  const dia = fecha.getDate().toString().padStart(2, '0');
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // getMonth() es base-0
  const año = fecha.getFullYear();
  // const hora = fecha.getHours().toString().padStart(2, '0');
  // const minutos = fecha.getMinutes().toString().padStart(2, '0');
  return `${dia}-${mes}-${año}`;
}


function convertirDDMMYYYYaISO(fechaDDMMYYYY) {
  const [dia, mes, año] = fechaDDMMYYYY.split('-');
  const fecha = new Date(año, mes - 1, dia);
  return fecha.toISOString();
}