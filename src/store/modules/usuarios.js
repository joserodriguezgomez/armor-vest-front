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
        { label: 'ID', model: 'ID' },
        { label: 'NOMBRE', model: 'NOMBRE' },
        { label: 'CORREO', model: 'CORREO' },
        { label: 'PERFIL', model: 'PERFIL' },
        // ... otros campos
      ],
      usuarios:[
        { ID: 1, NOMBRE: 'Andres Aguayo', CORREO: 'andres@aguayo.legal', PERFIL: 'Administrador' },
        { ID: 2, NOMBRE: 'Valentina Mejias', CORREO: 'valentina.mejias@armorvest.cl', PERFIL: 'Operario' },
        { ID: 3, NOMBRE: 'Mileidys Sotolongo', CORREO: 'mily.sotolongo@armorvest.cl', PERFIL: 'Vendedor' },
        { ID: 4, NOMBRE: 'Claudio Miranda', CORREO: 'claudio.miranda@armorvest.cl', PERFIL: 'Operario' },
        { ID: 5, NOMBRE: 'Mario Sanhueza', CORREO: 'mario.sanhueza@armorvest.cl', PERFIL: 'Administrador' },
      ],
      usuariosHeaders:[
        { title: "ID USUARIO", key: "ID" },
        { title: "NOMBRE", key: "NOMBRE" },
        { title: "CORREO", key: "CORREO" },
        { title: "PERFIL", key: "PERFIL" },
        { title: "Acción", key: "actions", sortable: false },
      ]
    },
    getters: {
      getUsuarios: state => state.usuarios,
      getusuariosHeaders: state => state.usuariosHeaders
    },
    mutations:{
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
      updateDessert({ commit }, payload) {
        commit('UPDATE_DESSERT', payload);
      },
      createUsuario({ commit }, payload) {
        commit('CREATE_USUARIO', payload);
      },
      deleteUsuario({ commit }, payload) {
        commit('CREATE_USUARIO', payload);
      },
      
    }
    
    // mutations y actions si las necesitas
  }