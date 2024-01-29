import axios from "axios";


export default {
    namespaced: true,
    state: {
      fields: [
        { label: 'ID', model: 'ID' },
        { label: 'LOTE', model: 'LOTE' },
        { label: 'SERIE', model: 'SERIE' },
        { label: 'TALLA', model: 'TALLA' },
        { label: 'IDIC', model: 'IDIC' },
        { label: 'POLIZA', model: 'POLIZA' }
        // ... otros campos
      ],
    //   polizas:[ { ID: '1', LOTE: 'ARM 01 24', SERIE: 1, TALLA: 'S', IDIC: 'DJS 01 235', POLIZA: 123548 },
    //   { ID: '2', LOTE: 'ARM 01 24', SERIE: 2, TALLA: 'S', IDIC: 'DJS 01 235', POLIZA: 123548 },
    //   { ID: '3', LOTE: 'ARM 01 24', SERIE: 3, TALLA: 'S', IDIC: 'DJS 01 235', POLIZA: 123548  },
    //   { ID: '4', LOTE: 'ARM 01 24', SERIE: 4, TALLA: 'M', IDIC: 'DJS 01 235', POLIZA: 123548 },
    //   { ID: '5', LOTE: 'ARM 01 24', SERIE: 5, TALLA: 'M', IDIC: 'DJS 01 235', POLIZA: 123548},
    //   { ID: '6', LOTE: 'ARM 01 24', SERIE: 6, TALLA: 'M', IDIC: 'DJS 01 235', POLIZA: 123548 },
    //   { ID: '7', LOTE: 'ARM 01 24', SERIE: 7, TALLA: 'M', IDIC: 'DJS 01 235', POLIZA: 123548 },
    //   { ID: '8', LOTE: 'ARM 01 24', SERIE: 8, TALLA: 'L', IDIC: 'DJS 01 235', POLIZA: 123548 },
    //   { ID: '9', LOTE: 'ARM 01 24', SERIE: 9, TALLA: 'L', IDIC: 'DJS 01 235', POLIZA: 123548},
    //   { ID: '10', LOTE: 'ARM 01 24', SERIE: 10, TALLA: 'L', IDIC: 'DJS 01 235', POLIZA: 123548 },
    //   { ID: '11', LOTE: 'ARM 01 24', SERIE: 11, TALLA: 'L', IDIC: 'DJS 01 235', POLIZA: 123548 },
    //   { ID: '12', LOTE: 'ARM 01 24', SERIE: 12, TALLA: 'XL', IDIC: 'DJS 01 235', POLIZA: 123548 },
    //   { ID: '13', LOTE: 'ARM 01 24', SERIE: 13, TALLA: 'XL', IDIC: 'DJS 01 235', POLIZA: 123548 },
    //   { ID: '14', LOTE: 'ARM 01 24', SERIE: 14, TALLA: 'XL', IDIC: 'DJS 01 235', POLIZA: 123548 },
    //   { ID: '15', LOTE: 'ARM 01 24', SERIE: 15, TALLA: 'XL', IDIC: 'DJS 01 235', POLIZA: 123548  },
    //   { ID: '16', LOTE: 'ARM 01 24', SERIE: 16, TALLA: 'XL', IDIC: 'DJS 01 235', POLIZA: 123548 }
    // ],

      polizas:[],
    
    

      polizaHeaders:[
        { title: 'Id', key: 'id_poliza' },
        { title: 'Lote', key: 'lote' },
        { title: 'Serie', key: 'serie' },
        { title: 'Talla', key: 'talla' },
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

      SET_IDICS(state, data){
        state.polizas=data
      },

      UPDATE_DESSERT(state, { index, item }) {
        // Actualiza un elemento específico en el array de polizas
        state.polizas2[index] = item;
      },
      CREATE_POLIZA(state, {item }) {
        // Actualiza un elemento específico en el array de polizas
        state.polizas.push(item)
      },
      DELETE_POLIZA(state, {index }) {
        // Actualiza un elemento específico en el array de polizas
        state.polizas.splice(index, 1)
      }
    },
    actions: {
      async leerIdics({ commit }){
        const url= "https://armor-vest-backend-fb07262d3ec2.herokuapp.com/api/idic"
        const response = await axios.get(url)
        commit("SET_IDICS", response.data)
      },

      updateDessert({ commit }, payload) {
        commit('UPDATE_DESSERT', payload);
      },
      createPoliza({ commit }, payload) {
        commit('CREATE_POLIZA', payload);
      },
      deletePoliza({ commit }, payload) {
        commit('DELETE_POLIZA', payload);
      },
    }
    
  }


