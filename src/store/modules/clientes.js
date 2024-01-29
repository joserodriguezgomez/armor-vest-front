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
        { ID: 1, NOMBRE: 'Municipalidad la Cisterna', RUT: '99.999.999-9', DIRECCION: 'Av Providencia 2250', CONTACTO: 'Juan Perez', CORREO: 'juan.perez@gmail.com', TELEFONO: 569223344556, COMENTARIOS: '', ADJUNTO: 0 },
        { ID: 2, NOMBRE: 'Municipalidad Casa Blanca', RUT: '99.999.999-9', DIRECCION: 'Av Providencia 2250', CONTACTO: 'Juan Perez', CORREO: 'juan.perez@gmail.com', TELEFONO: 569223344556, COMENTARIOS: '', ADJUNTO: 0 },
        { ID: 3, NOMBRE: 'Banco de Chile', RUT: '99.999.999-9', DIRECCION: 'Av Providencia 2250', CONTACTO: 'Juan Perez', CORREO: 'juan.perez@gmail.com', TELEFONO: 569223344556, COMENTARIOS: '', ADJUNTO: 0 },
        { ID: 4, NOMBRE: 'Fibra Studio', RUT: '99.999.999-9', DIRECCION: 'Av Providencia 2250', CONTACTO: 'Juan Perez', CORREO: 'juan.perez@gmail.com', TELEFONO: 569223344556, COMENTARIOS: '', ADJUNTO: 0 },
        { ID: 5, NOMBRE: 'Cambio a M Capual', RUT: '99.999.999-9', DIRECCION: 'Av Providencia 2250', CONTACTO: 'Juan Perez', CORREO: 'juan.perez@gmail.com', TELEFONO: 569223344556, COMENTARIOS: '', ADJUNTO: 0 },
        { ID: 6, NOMBRE: 'Banco Ripley', RUT: '99.999.999-9', DIRECCION: 'Av Providencia 2250', CONTACTO: 'Juan Perez', CORREO: 'juan.perez@gmail.com', TELEFONO: 569223344556, COMENTARIOS: '', ADJUNTO: 0 },
        { ID: 7, NOMBRE: 'Pro Defense', RUT: '99.999.999-9', DIRECCION: 'Av Providencia 2250', CONTACTO: 'Juan Perez', CORREO: 'juan.perez@gmail.com', TELEFONO: 569223344556, COMENTARIOS: '', ADJUNTO: 0 },
        { ID: 8, NOMBRE: 'SEGES', RUT: '99.999.999-9', DIRECCION: 'Av Providencia 2250', CONTACTO: 'Juan Perez', CORREO: 'juan.perez@gmail.com', TELEFONO: 569223344556, COMENTARIOS: '', ADJUNTO: 0 },
        { ID: 9, NOMBRE: 'EFE VALPO', RUT: '99.999.999-9', DIRECCION: 'Av Providencia 2250', CONTACTO: 'Juan Perez', CORREO: 'juan.perez@gmail.com', TELEFONO: 569223344556, COMENTARIOS: '', ADJUNTO: 0 },
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