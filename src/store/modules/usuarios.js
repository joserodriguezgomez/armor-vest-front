import axios from "axios";

export default {
    namespaced: true,
    state: {
      editedItem: {
        ID: '',
        NOMBRE: '',
        CORREO:'',
        PERFIL: 0,
       
        // ... otros campos
      },
      fields: [
        { label: 'USUARIO', model: 'user' },
        { label: 'CORREO', model: 'rol' },
        // ... otros campos
      ],
      usuarios:[],
      usuariosHeaders:[
        { title: "ID", key: "id_user" },
        { title: "USUARIO", key: "user" },
        { title: "FECHA CREACIÓN", key: "fecha_creacion" },
        { title: "CONTRASEÑA", key: "password" },
        { title: "ROL", key: "rol" },
        { title: "Acción", key: "actions", sortable: false },
      ]
    },
    getters: {
      getUsuarios: state => state.usuarios,
      getusuariosHeaders: state => state.usuariosHeaders
    },
    mutations:{
      SET_USUARIOS(state, data){
        state.usuarios=data
      },
      UPDATE_DESSERT(state, { index, item }) {
        // Actualiza un elemento específico en el array de usuarios
        state.usuarios[index] = item;
      },
      CREATE_USUARIO(state, {item }) {
        // Actualiza un elemento específico en el array de usuarios
        state.usuarios.push(item)
      },
      DELETE_USUARIO(state, {index }) {
        // Actualiza un elemento específico en el array de usuarios
        state.usuarios.splice(index, 1)
      }
    },
    actions: {
      async leerUsuarios({ commit }){
        const url = "https://armor-vest-backend-fb07262d3ec2.herokuapp.com/api/usuarios";
        const response = await axios.get(url);
        const clientesFormateados = response.data.map(idic => ({
          ...idic,
          fecha_creacion: formatearFecha(idic.fecha_creacion),
        }));
        commit("SET_USUARIOS", clientesFormateados);
      },
    
      async updateUsuario({ dispatch }, payload) {
        console.log(payload.item)
        const url = `https://armor-vest-backend-fb07262d3ec2.herokuapp.com/api/usuarios/${payload.item._id}`;
        payload.item.fecha_creacion = convertirDDMMYYYYaISO(payload.item.fecha_creacion);
        await axios.put(url, payload.item); // El segundo argumento es el cuerpo de la solicitud
        dispatch('leerUsuarios');
        // commit('UPDATE_DESSERT', payload.index,response.data);
      },
      async createUsuario({ dispatch }, payload) {
        console.log(payload.item)
        const url= "https://armor-vest-backend-fb07262d3ec2.herokuapp.com/api/usuarios"
        payload.item.fecha_creacion = convertirDDMMYYYYaISO(payload.item.fecha_creacion);
        await axios.post(url, payload.item);
        dispatch('leerUsuarios');
      },
      async deleteUsuario({ dispatch }, payload) {
        console.log(payload.item)
        const url = `https://armor-vest-backend-fb07262d3ec2.herokuapp.com/api/usuarios/${payload.item._id}`;
        await axios.delete(url);
        dispatch('leerUsuarios');
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