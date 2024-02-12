import axios from "axios";

export default {
    namespaced: true,
    state: {
      editedItem: {
        ID: 0,
        NOMBRE: '',
        RUT:0,
        DIRECCION: '',
        CONTACTO:'',
        CORREO:'',
        TELEFONO:0,
        COMENTARIOS:'',
        ADJUNTO:0,
        // ... otros campos
      },
      fields: [
        { label: 'NOMBRE', model: 'nombre' },
        { label: 'FECHA CREACIÓN', model: 'fecha_creacion' },
        { label: 'DIRECCIÓN ', model: 'direccion' },
        { label: 'CORREO', model: 'correo' },
        { label: 'CONTACTO', model: 'telefono' },
        { label: 'COMENTARIOS', model: 'comentarios' },
        // { label: 'TELEFONO', model: 'TELEFONO' },
        // { label: 'COMENTARIOS', model: 'COMENTARIOS' },
        // { label: 'ADJUTNO', model: 'ADJUNTO' },
        // // ... otros campos
      ],
      clientes:[],
      clientesHeaders:[
        { title: "NOMBRE", key: "nombre" },
        { title: "FECHA CREACION", key: "fecha_creacion" },
        { title: "DIRECCION", key: "direccion" },
        { title: "CONTACTO", key: "correo" },
        { title: "CONTACTO", key: "telefono" },
        { title: "COMENTARIOS", key: "comentarios" },
        // { title: "COMENTARIOS", key: "COMENTARIOS" },
        // { title: "Adjunto", key: "archivoAdjunto", sortable: false },
        { title: "Acción", key: "actions", sortable: false },
      ]
    },
    getters: {
      getClientes: state => state.clientes,
      getclientesHeaders: state => state.clientesHeaders
    },
    mutations:{
      SET_CLIENTES(state, data){
        state.clientes=data
      },
      UPDATE_DESSERT(state, { index, item }) {
        // Actualiza un elemento específico en el array de clientes
        state.clientes[index] = item;
      },
      CREATE_CLIENTE(state, {item }) {
        // Actualiza un elemento específico en el array de clientes
        state.clientes.push(item)
      },
      DELETE_CLIENTE(state, {index }) {
        // Actualiza un elemento específico en el array de clientes
        state.clientes.splice(index, 1)
      }
    },
    actions: {
      async leerClientes({ commit }){
        const url = "https://armor-vest-backend-fb07262d3ec2.herokuapp.com/api/clientes";
        const response = await axios.get(url);
        const clientesFormateados = response.data.map(idic => ({
          ...idic,
          fecha_creacion: formatearFecha(idic.fecha_creacion),
        }));
        commit("SET_CLIENTES", clientesFormateados);
      },
      async updateCliente({ dispatch }, payload) {
        console.log(payload.item)
        const url = `https://armor-vest-backend-fb07262d3ec2.herokuapp.com/api/clientes/${payload.item._id}`;
        payload.item.fecha_creacion = convertirDDMMYYYYaISO(payload.item.fecha_creacion);
        await axios.put(url, payload.item); // El segundo argumento es el cuerpo de la solicitud
        dispatch('leerClientes');
        // commit('UPDATE_DESSERT', payload.index,response.data);
      },
      async createCliente({ dispatch }, payload) {
        console.log(payload.item)
        const url= "https://armor-vest-backend-fb07262d3ec2.herokuapp.com/api/clientes"
        payload.item.fecha_creacion = convertirDDMMYYYYaISO(payload.item.fecha_creacion);
        await axios.post(url, payload.item);
        dispatch('leerClientes');
      },
      async deleteCliente({ dispatch }, payload) {
        console.log(payload.item._id)
        const url = `https://armor-vest-backend-fb07262d3ec2.herokuapp.com/api/clientes/${payload.item._id}`;
        await axios.delete(url);
        dispatch('leerClientes');
      },
      
    }
    
    // mutations y actions si las necesitas
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