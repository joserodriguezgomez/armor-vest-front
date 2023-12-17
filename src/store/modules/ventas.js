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
    ventas:[
      { ID: 1, LOTE: 'ARM 01 24', SERIE: 1, TALLA: 'S', MODELO: '', FACTURA: 123, GD: 256, CLIENTE: '', VEN_FUNDA: 1, VEN_PANEL: 1, VENDEDOR: '', COMENTARIOS: '', ADJUNTO: 1 },
      { ID: 2, LOTE: 'ARM 01 24', SERIE: 1, TALLA: 'S', MODELO: '', FACTURA: 123, GD: 256, CLIENTE: '', VEN_FUNDA: 1, VEN_PANEL: 1, VENDEDOR: '', COMENTARIOS: '', ADJUNTO: 1 },
      { ID: 3, LOTE: 'ARM 01 24', SERIE: 1, TALLA: 'S', MODELO: '', FACTURA: 123, GD: 256, CLIENTE: '', VEN_FUNDA: 1, VEN_PANEL: 1, VENDEDOR: '', COMENTARIOS: '', ADJUNTO: 1 },
      { ID: 4, LOTE: 'ARM 01 24', SERIE: 1, TALLA: 'S', MODELO: '', FACTURA: 123, GD: 256, CLIENTE: '', VEN_FUNDA: 1, VEN_PANEL: 1, VENDEDOR: '', COMENTARIOS: '', ADJUNTO: 1 },
      { ID: 5, LOTE: 'ARM 01 24', SERIE: 1, TALLA: 'S', MODELO: '', FACTURA: 123, GD: 256, CLIENTE: '', VEN_FUNDA: 1, VEN_PANEL: 1, VENDEDOR: '', COMENTARIOS: '', ADJUNTO: 1 },
      { ID: 6, LOTE: 'ARM 01 24', SERIE: 1, TALLA: 'S', MODELO: '', FACTURA: 123, GD: 256, CLIENTE: '', VEN_FUNDA: 1, VEN_PANEL: 1, VENDEDOR: '', COMENTARIOS: '', ADJUNTO: 1 },
      { ID: 7, LOTE: 'ARM 01 24', SERIE: 1, TALLA: 'S', MODELO: '', FACTURA: 123, GD: 256, CLIENTE: '', VEN_FUNDA: 1, VEN_PANEL: 1, VENDEDOR: '', COMENTARIOS: '', ADJUNTO: 1 },
      { ID: 8, LOTE: 'ARM 01 24', SERIE: 1, TALLA: 'S', MODELO: '', FACTURA: 123, GD: 256, CLIENTE: '', VEN_FUNDA: 1, VEN_PANEL: 1, VENDEDOR: '', COMENTARIOS: '', ADJUNTO: 1 },
      { ID: 9, LOTE: 'ARM 01 24', SERIE: 1, TALLA: 'S', MODELO: '', FACTURA: 123, GD: 256, CLIENTE: '', VEN_FUNDA: 1, VEN_PANEL: 1, VENDEDOR: '', COMENTARIOS: '', ADJUNTO: 1 },
      { ID: 10, LOTE: 'ARM 01 24', SERIE: 1, TALLA: 'S', MODELO: '', FACTURA: 123, GD: 256, CLIENTE: '', VEN_FUNDA: 1, VEN_PANEL: 1, VENDEDOR: '', COMENTARIOS: '', ADJUNTO: 1 },
      { ID: 11, LOTE: 'ARM 01 24', SERIE: 1, TALLA: 'S', MODELO: '', FACTURA: 123, GD: 256, CLIENTE: '', VEN_FUNDA: 1, VEN_PANEL: 1, VENDEDOR: '', COMENTARIOS: '', ADJUNTO: 1 },
      { ID: 12, LOTE: 'ARM 01 24', SERIE: 1, TALLA: 'S', MODELO: '', FACTURA: 123, GD: 256, CLIENTE: '', VEN_FUNDA: 1, VEN_PANEL: 1, VENDEDOR: '', COMENTARIOS: '', ADJUNTO: 1 },
      { ID: 13, LOTE: 'ARM 01 24', SERIE: 1, TALLA: 'S', MODELO: '', FACTURA: 123, GD: 256, CLIENTE: '', VEN_FUNDA: 1, VEN_PANEL: 1, VENDEDOR: '', COMENTARIOS: '', ADJUNTO: 1 },
      { ID: 14, LOTE: 'ARM 01 24', SERIE: 1, TALLA: 'S', MODELO: '', FACTURA: 123, GD: 256, CLIENTE: '', VEN_FUNDA: 1, VEN_PANEL: 1, VENDEDOR: '', COMENTARIOS: '', ADJUNTO: 1 },
      { ID: 15, LOTE: 'ARM 01 24', SERIE: 1, TALLA: 'S', MODELO: '', FACTURA: 123, GD: 256, CLIENTE: '', VEN_FUNDA: 1, VEN_PANEL: 1, VENDEDOR: '', COMENTARIOS: '', ADJUNTO: 1 },

      ],
    ventasHeaders:[
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
    getVentas: state => state.ventas,
    getventasHeaders: state => state.ventasHeaders
  },
  mutations:{
    UPDATE_DESSERT(state, { index, item }) {
      // Actualiza un elemento específico en el array de ventas
      state.ventas[index] = item;
    },
    CREATE_VENTA(state, {item }) {
      // Actualiza un elemento específico en el array de ventas
      state.ventas.push(item)
    },
    DELETE_VENTA(state, {index }) {
      // Actualiza un elemento específico en el array de ventas
      state.ventas.splice(index, 1)
    }
  },
  actions: {
    updateDessert({ commit }, payload) {
      commit('UPDATE_DESSERT', payload);
    },
    createVenta({ commit }, payload) {
      commit('CREATE_VENTA', payload);
    },
    deleteVenta({ commit }, payload) {
      commit('DELETE_VENTA', payload);
    },
    
  }
  
  // mutations y actions si las necesitas
}