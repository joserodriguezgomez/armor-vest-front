export default {
    namespaced: true,
    state: {
      editedItem: {
        ID: '',
        LOTE: '',
        SERIE:'',
        TALLA: 0,
        MODELO:'',
        IDIC:'',
        POLIZA:0,
        FACTURA:0,
        GD:0,
        CLIENTE:'',
        VEN_FUNDA:0,
        VEN_PANEL:0,
        VENDEDOR:0,
        COMENTARIOS:0,
        ADJUNTO:0,
        // ... otros campos
      },
      fields: [
        { label: 'ID', model: 'ID' },
        { label: 'LOTE', model: 'LOTE' },
        { label: 'SERIE', model: 'SERIE' },
        { label: 'TALLA', model: 'TALLA' },
        { label: 'MODELO', model: 'MODELO' },
        { label: 'IDIC', model: 'IDIC' },
        { label: 'POLIZA', model: 'POLIZA' },
        { label: 'FACTURA', model: 'FACTURA' },
        { label: 'GD', model: 'GD' },
        { label: 'CLIENTE', model: 'CLIENTE' },
        { label: 'VEN-FUNDA', model: 'VEN-FUNDA' },
        { label: 'VEN-PANEL', model: 'VEN-PANEL' },
        { label: 'VENDEDOR', model: 'VENDEDOR' },
        { label: 'COMENTARIOS', model: 'COMENTARIOS' },
        { label: 'ADJUTNO', model: 'ADJUNTO' },
        // ... otros campos
      ],
      devoluciones:[
        { ID: 1, LOTE: 'ARM 01 24', SERIE: 1, TALLA: 'S', MODELO: 'A', FACTURA: 123, GD: 256, CLIENTE: 'Municipalidad de La Cisterna', VEN_FUNDA: '01-10-2024', VEN_PANEL: '01-10-2024', VENDEDOR: 'MILEIDYS', COMENTARIOS: '', ADJUNTO: 1 },
        { ID: 2, LOTE: 'ARM 01 24', SERIE: 2, TALLA: 'S', MODELO: 'A', FACTURA: 123, GD: 256, CLIENTE: 'Municipalidad de La Cisterna', VEN_FUNDA: '01-10-2024', VEN_PANEL: '01-10-2024', VENDEDOR: 'MILEIDYS', COMENTARIOS: '', ADJUNTO: 1 },
        { ID: 3, LOTE: 'ARM 01 24', SERIE: 3, TALLA: 'S', MODELO: 'A', FACTURA: 123, GD: 256, CLIENTE: 'Municipalidad de La Cisterna', VEN_FUNDA: '01-10-2024', VEN_PANEL: '01-10-2024', VENDEDOR: 'MILEIDYS', COMENTARIOS: '', ADJUNTO: 1 },
        { ID: 4, LOTE: 'ARM 01 24', SERIE: 4, TALLA: 'S', MODELO: 'A', FACTURA: 123, GD: 256, CLIENTE: 'Muestra Municipalidad Casa Blanca', VEN_FUNDA: '01-10-2024', VEN_PANEL: '01-10-2024', VENDEDOR: 'MILEIDYS', COMENTARIOS: '', ADJUNTO: 1 },
        { ID: 5, LOTE: 'ARM 01 24', SERIE: 5, TALLA: 'S', MODELO: 'A', FACTURA: 123, GD: 256, CLIENTE: 'Cambio a M Capual', VEN_FUNDA: '01-10-2024', VEN_PANEL: '01-10-2024', VENDEDOR: 'MILEIDYS', COMENTARIOS: '', ADJUNTO: 1 },
        { ID: 6, LOTE: 'ARM 01 24', SERIE: 6, TALLA: 'S', MODELO: 'A', FACTURA: 123, GD: 256, CLIENTE: 'Municipalidad de Melipilla', VEN_FUNDA: '01-10-2024', VEN_PANEL: '01-10-2024', VENDEDOR: 'MILEIDYS', COMENTARIOS: '', ADJUNTO: 1 },
        { ID: 7, LOTE: 'ARM 01 24', SERIE: 7, TALLA: 'S', MODELO: 'A', FACTURA: 123, GD: 256, CLIENTE: 'Municipalidad de La Cisterna', VEN_FUNDA: '01-10-2024', VEN_PANEL: '01-10-2024', VENDEDOR: 'MILEIDYS', COMENTARIOS: '', ADJUNTO: 1 },
        { ID: 8, LOTE: 'ARM 01 24', SERIE: 8, TALLA: 'S', MODELO: 'A', FACTURA: 123, GD: 256, CLIENTE: 'Municipalidad de La Cisterna', VEN_FUNDA: '01-10-2024', VEN_PANEL: '01-10-2024', VENDEDOR: 'MILEIDYS', COMENTARIOS: '', ADJUNTO: 1 },
        { ID: 9, LOTE: 'ARM 01 24', SERIE: 9, TALLA: 'S', MODELO: 'A', FACTURA: 123, GD: 256, CLIENTE: 'Municipalidad de La Cisterna', VEN_FUNDA: '01-10-2024', VEN_PANEL: '01-10-2024', VENDEDOR: 'MILEIDYS', COMENTARIOS: '', ADJUNTO: 1 },
        { ID: 10, LOTE: 'ARM 01 24', SERIE: 10, TALLA: 'S', MODELO: 'A', FACTURA: 123, GD: 256, CLIENTE: 'Fibra Studio', VEN_FUNDA: '01-10-2024', VEN_PANEL: '01-10-2024', VENDEDOR: 'MILEIDYS', COMENTARIOS: '', ADJUNTO: 1 },
        { ID: 11, LOTE: 'ARM 01 24', SERIE: 11, TALLA: 'S', MODELO: 'A', FACTURA: 123, GD: 256, CLIENTE: 'Municipalidad de La Cisterna', VEN_FUNDA: '01-10-2024', VEN_PANEL: '01-10-2024', VENDEDOR: 'MILEIDYS', COMENTARIOS: '', ADJUNTO: 1 },
        { ID: 12, LOTE: 'ARM 01 24', SERIE: 12, TALLA: 'S', MODELO: 'A', FACTURA: 123, GD: 256, CLIENTE: 'Municipalidad de La Cisterna', VEN_FUNDA: '01-10-2024', VEN_PANEL: '01-10-2024', VENDEDOR: 'MILEIDYS', COMENTARIOS: '', ADJUNTO: 1 },
        { ID: 13, LOTE: 'ARM 01 24', SERIE: 13, TALLA: 'S', MODELO: 'A', FACTURA: 123, GD: 256, CLIENTE: 'Fibra Studio', VEN_FUNDA: '01-10-2024', VEN_PANEL: '01-10-2024', VENDEDOR: 'MILEIDYS', COMENTARIOS: '', ADJUNTO: 1 },
        { ID: 14, LOTE: 'ARM 01 24', SERIE: 14, TALLA: 'S', MODELO: 'A', FACTURA: 123, GD: 256, CLIENTE: 'Fibra Studio', VEN_FUNDA: '01-10-2024', VEN_PANEL: '01-10-2024', VENDEDOR: 'MILEIDYS', COMENTARIOS: '', ADJUNTO: 1 },
        { ID: 15, LOTE: 'ARM 01 24', SERIE: 15, TALLA: 'S', MODELO: 'A', FACTURA: 123, GD: 256, CLIENTE: 'Banco de Chile', VEN_FUNDA: '01-10-2024', VEN_PANEL: '01-10-2024', VENDEDOR: 'MILEIDYS', COMENTARIOS: '', ADJUNTO: 1 },
        ],
      devolucionesHeaders:[
        { title: "ID", key: "ID" },
        { title: "LOTE", key: "LOTE" },
        { title: "SERIE", key: "SERIE" },
        { title: "TALLA", key: "TALLA" },
        { title: "MODELO", key: "MODELO" },
        { title: "FACTURA", key: "FACTURA" },
        { title: "GD", key: "GD" },
        { title: "CLIENTE", key: "CLIENTE" },
        { title: "VEN-FUNDA", key: "VEN-FUNDA" },
        { title: "VEN-PANEL", key: "VEN-PANEL" },
        { title: "VENDEDOR", key: "VENDEDOR" },
        { title: "COMENTARIOS", key: "COMENTARIOS" },
        { title: "Adjunto", key: "archivoAdjunto", sortable: false },
        { title: "Acción", key: "actions", sortable: false },
      ]
    },
    getters: {
      getDevoluciones: state => state.devoluciones,
      getdevolucionesHeaders: state => state.devolucionesHeaders
    },
    mutations:{
      UPDATE_DESSERT(state, { index, item }) {
        // Actualiza un elemento específico en el array de devoluciones
        state.devoluciones[index] = item;
      },
      CREATE_DEVOLUCION(state, {item }) {
        // Actualiza un elemento específico en el array de devoluciones
        state.devoluciones.push(item)
      },
      DELETE_DEVOLUCION(state, {index }) {
        // Actualiza un elemento específico en el array de devoluciones
        state.devoluciones.splice(index, 1)
      }
    },
    actions: {
      updateDessert({ commit }, payload) {
        commit('UPDATE_DESSERT', payload);
      },
      createDevolucion({ commit }, payload) {
        commit('CREATE_DEVOLUCION', payload);
      },
      deleteDevolucion({ commit }, payload) {
        commit('DELETE_DEVOLUCION', payload);
      },
      
    }
    
    // mutations y actions si las necesitas
  }