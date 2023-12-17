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
        { label: 'ID', model: 'ID' },
        { label: 'NOMBRE', model: 'NOMBRE' },
        { label: 'RUT', model: 'RUT' },
        { label: 'DIRECCION', model: 'DIRECCION' },
        { label: 'CONTACTO', model: 'CONTACTO' },
        { label: 'CORREO', model: 'CORREO' },
        { label: 'TELEFONO', model: 'TELEFONO' },
        { label: 'COMENTARIOS', model: 'COMENTARIOS' },
        { label: 'ADJUTNO', model: 'ADJUNTO' },
        // ... otros campos
      ],
      clientes:[
        { ID: 1, NOMBRE: 'ARM 01 24', RUT: 1, DIRECCION: 'S', CONTACTO: '', CORREO: '', TELEFONO: 1, COMENTARIOS: '', ADJUNTO: 0 },
        { ID: 1, NOMBRE: 'ARM 01 24', RUT: 1, DIRECCION: 'S', CONTACTO: '', CORREO: '', TELEFONO: 1, COMENTARIOS: '', ADJUNTO: 0 },
        { ID: 1, NOMBRE: 'ARM 01 24', RUT: 1, DIRECCION: 'S', CONTACTO: '', CORREO: '', TELEFONO: 1, COMENTARIOS: '', ADJUNTO: 0 },
        { ID: 1, NOMBRE: 'ARM 01 24', RUT: 1, DIRECCION: 'S', CONTACTO: '', CORREO: '', TELEFONO: 1, COMENTARIOS: '', ADJUNTO: 0 },
        { ID: 1, NOMBRE: 'ARM 01 24', RUT: 1, DIRECCION: 'S', CONTACTO: '', CORREO: '', TELEFONO: 1, COMENTARIOS: '', ADJUNTO: 0 },
        { ID: 1, NOMBRE: 'ARM 01 24', RUT: 1, DIRECCION: 'S', CONTACTO: '', CORREO: '', TELEFONO: 1, COMENTARIOS: '', ADJUNTO: 0 },
        { ID: 1, NOMBRE: 'ARM 01 24', RUT: 1, DIRECCION: 'S', CONTACTO: '', CORREO: '', TELEFONO: 1, COMENTARIOS: '', ADJUNTO: 0 },
        { ID: 1, NOMBRE: 'ARM 01 24', RUT: 1, DIRECCION: 'S', CONTACTO: '', CORREO: '', TELEFONO: 1, COMENTARIOS: '', ADJUNTO: 0 },
        { ID: 1, NOMBRE: 'ARM 01 24', RUT: 1, DIRECCION: 'S', CONTACTO: '', CORREO: '', TELEFONO: 1, COMENTARIOS: '', ADJUNTO: 0 },
        { ID: 1, NOMBRE: 'ARM 01 24', RUT: 1, DIRECCION: 'S', CONTACTO: '', CORREO: '', TELEFONO: 1, COMENTARIOS: '', ADJUNTO: 0 },
        { ID: 1, NOMBRE: 'ARM 01 24', RUT: 1, DIRECCION: 'S', CONTACTO: '', CORREO: '', TELEFONO: 1, COMENTARIOS: '', ADJUNTO: 0 },
      
        ],
      clientesHeaders:[
        { title: "ID", key: "ID" },
        { title: "NOMBRE", key: "NOMBRE" },
        { title: "RUT", key: "RUT" },
        { title: "DIRECCION", key: "DIRECCION" },
        { title: "CONTACTO", key: "CONTACTO" },
        { title: "CORREO", key: "CORREO" },
        { title: "TELEFONO", key: "TELEFONO" },
        { title: "COMENTARIOS", key: "COMENTARIOS" },
        { title: "Adjunto", key: "archivoAdjunto", sortable: false },
        { title: "Acción", key: "actions", sortable: false },
      ]
    },
    getters: {
      getClientes: state => state.clientes,
      getclientesHeaders: state => state.clientesHeaders
    },
    mutations:{
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
      updateDessert({ commit }, payload) {
        commit('UPDATE_DESSERT', payload);
      },
      createCliente({ commit }, payload) {
        commit('CREATE_CLIENTE', payload);
      },
      deleteCliente({ commit }, payload) {
        commit('DELETE_CLIENTE', payload);
      },
      
    }
    
    // mutations y actions si las necesitas
  }