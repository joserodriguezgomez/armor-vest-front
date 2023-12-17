export default {
  namespaced: true,
  state: {

    fields: [
      { label: 'ID CHALECO', model: 'ID_CHALECO' },
      { label: 'ID POLIZA', model: 'ID_POLIZA' },
      { label: 'MODELO', model: 'MODELO' },
      { label: 'VENCIMIENTO FUNDA', model: 'VENCIMIENTO_FUNDA' },
      { label: 'VENCIMIENTO PANEL', model: 'VENCIMIENTO_PANEL' },
      { label: 'CLIENTE', model: 'CLIENTE' },
      // ... otros campos
    ],
    chalecos:[
      { ID_CHALECO: '1', ID_POLIZA: '1', MODELO: "A", TALLA: 'S', VENCIMIENTO_FUNDA: '01-10-2023', VENCIMIENTO_PANEL: '01-11-2023',CLIENTE:"Municipalidad de La Cisterna"},
      { ID_CHALECO: '2', ID_POLIZA: '2', MODELO: "A", TALLA: 'S', VENCIMIENTO_FUNDA: '01-10-2023', VENCIMIENTO_PANEL: '01-11-2023',CLIENTE:"Municipalidad de La Cisterna"},
      { ID_CHALECO: '3', ID_POLIZA: '3', MODELO: "A", TALLA: 'S', VENCIMIENTO_FUNDA: '01-10-2023', VENCIMIENTO_PANEL: '01-11-2023',CLIENTE:"Municipalidad de La Cisterna"},
      { ID_CHALECO: '4', ID_POLIZA: '4', MODELO: "A", TALLA: 'S', VENCIMIENTO_FUNDA: '01-10-2023', VENCIMIENTO_PANEL: '01-11-2023',CLIENTE:"Muestra Municipalidad Casa Blanca"},
      { ID_CHALECO: '5', ID_POLIZA: '5', MODELO: "A", TALLA: 'S', VENCIMIENTO_FUNDA: '01-10-2023', VENCIMIENTO_PANEL: '01-11-2023',CLIENTE:"Cambio a M Capual"},
      { ID_CHALECO: '6', ID_POLIZA: '6', MODELO: "A", TALLA: 'S', VENCIMIENTO_FUNDA: '01-10-2023', VENCIMIENTO_PANEL: '01-11-2023',CLIENTE:"Municipalidad de Melipilla"},
      { ID_CHALECO: '7', ID_POLIZA: '7', MODELO: "A", TALLA: 'S', VENCIMIENTO_FUNDA: '01-10-2023', VENCIMIENTO_PANEL: '01-11-2023',CLIENTE:"Municipalidad de La Cisterna"},
      { ID_CHALECO: '8', ID_POLIZA: '8', MODELO: "A", TALLA: 'S', VENCIMIENTO_FUNDA: '01-10-2023', VENCIMIENTO_PANEL: '01-11-2023',CLIENTE:"Municipalidad de La Cisterna"},
      { ID_CHALECO: '9', ID_POLIZA: '9', MODELO: "A", TALLA: 'S', VENCIMIENTO_FUNDA: '01-10-2023', VENCIMIENTO_PANEL: '01-11-2023',CLIENTE:"Municipalidad de La Cisterna"},
      { ID_CHALECO: '10', ID_POLIZA: '10', MODELO: "A", TALLA: 'S', VENCIMIENTO_FUNDA: '01-10-2023', VENCIMIENTO_PANEL: '01-11-2023',CLIENTE:"Fibra Studio"},
      { ID_CHALECO: '11', ID_POLIZA: '11', MODELO: "A", TALLA: 'S', VENCIMIENTO_FUNDA: '01-10-2023', VENCIMIENTO_PANEL: '01-11-2023'},
      { ID_CHALECO: '12', ID_POLIZA: '12', MODELO: "A", TALLA: 'S', VENCIMIENTO_FUNDA: '01-10-2023', VENCIMIENTO_PANEL: '01-11-2023',CLIENTE:"Municipalidad de La Cisterna"},
      { ID_CHALECO: '13', ID_POLIZA: '13', MODELO: "A", TALLA: 'S', VENCIMIENTO_FUNDA: '01-10-2023', VENCIMIENTO_PANEL: '01-11-2023',CLIENTE:"Municipalidad de La Cisterna"},
      { ID_CHALECO: '14', ID_POLIZA: '14', MODELO: "A", TALLA: 'S', VENCIMIENTO_FUNDA: '01-10-2023', VENCIMIENTO_PANEL: '01-11-2023',CLIENTE:"Fibra Studio"},
      { ID_CHALECO: '15', ID_POLIZA: '15', MODELO: "A", TALLA: 'S', VENCIMIENTO_FUNDA: '01-10-2023', VENCIMIENTO_PANEL: '01-11-2023',CLIENTE:"Fibra Studio"},
      { ID_CHALECO: '16', ID_POLIZA: '16', MODELO: "A", TALLA: 'S', VENCIMIENTO_FUNDA: '01-10-2023', VENCIMIENTO_PANEL: '01-11-2023',CLIENTE:"Banco de Chile"},

      { ID_CHALECO: '17', ID_POLIZA: '1', MODELO: "A", TALLA: 'S', VENCIMIENTO_FUNDA: '01-10-2023', VENCIMIENTO_PANEL: '01-11-2023',CLIENTE:"Casablanca"},
      { ID_CHALECO: '18', ID_POLIZA: '2', MODELO: "A", TALLA: 'S', VENCIMIENTO_FUNDA: '01-10-2023', VENCIMIENTO_PANEL: '01-11-2023',CLIENTE:"Casablanca"},
      { ID_CHALECO: '19', ID_POLIZA: '3', MODELO: "A", TALLA: 'S', VENCIMIENTO_FUNDA: '01-10-2023', VENCIMIENTO_PANEL: '01-11-2023',CLIENTE:"Casablanca"},
      { ID_CHALECO: '20', ID_POLIZA: '4', MODELO: "A", TALLA: 'S', VENCIMIENTO_FUNDA: '01-10-2023', VENCIMIENTO_PANEL: '01-11-2023',CLIENTE:"Banco Ripley"},
      { ID_CHALECO: '21', ID_POLIZA: '5', MODELO: "A", TALLA: 'S', VENCIMIENTO_FUNDA: '01-10-2023', VENCIMIENTO_PANEL: '01-11-2023',CLIENTE:"Casablanca"},
      { ID_CHALECO: '22', ID_POLIZA: '6', MODELO: "A", TALLA: 'S', VENCIMIENTO_FUNDA: '01-10-2023', VENCIMIENTO_PANEL: '01-11-2023',CLIENTE:"Casablanca"},
      { ID_CHALECO: '23', ID_POLIZA: '7', MODELO: "A", TALLA: 'S', VENCIMIENTO_FUNDA: '01-10-2023', VENCIMIENTO_PANEL: '01-11-2023',CLIENTE:"Banco Ripley"},
      { ID_CHALECO: '24', ID_POLIZA: '8', MODELO: "A", TALLA: 'S', VENCIMIENTO_FUNDA: '01-10-2023', VENCIMIENTO_PANEL: '01-11-2023',CLIENTE:"Banco Ripley"},
      { ID_CHALECO: '25', ID_POLIZA: '9', MODELO: "A", TALLA: 'S', VENCIMIENTO_FUNDA: '01-10-2023', VENCIMIENTO_PANEL: '01-11-2023',CLIENTE:"Banco Ripley"},
      { ID_CHALECO: '26', ID_POLIZA: '12', MODELO: "A", TALLA: 'S', VENCIMIENTO_FUNDA: '01-10-2023', VENCIMIENTO_PANEL: '01-11-2023',CLIENTE:"EFE VALPO"},

      { ID_CHALECO: '27', ID_POLIZA: '16', MODELO: "A", TALLA: 'S', VENCIMIENTO_FUNDA: '01-10-2023', VENCIMIENTO_PANEL: '01-11-2023',CLIENTE:"Pro Defense"},
      { ID_CHALECO: '28', ID_POLIZA: '16', MODELO: "A", TALLA: 'S', VENCIMIENTO_FUNDA: '01-10-2023', VENCIMIENTO_PANEL: '01-11-2023',CLIENTE:"SEGES"},
      { ID_CHALECO: '29', ID_POLIZA: '16', MODELO: "A", TALLA: 'S', VENCIMIENTO_FUNDA: '01-10-2023', VENCIMIENTO_PANEL: '01-11-2023',CLIENTE:"EFE VALPO"},

    ],
    chalecoHeaders:[
      { title: 'ID CHALECO', key: 'ID_CHALECO' },
      { title: 'ID POLIZA', key: 'ID_POLIZA' },
      { title: 'MODELO', key: 'MODELO' },
      { title: 'VENCIMIENTO FUNDA', key: 'VENCIMIENTO_FUNDA' },
      { title: 'VENCINIENTO PANEL', key: 'VENCIMIENTO_PANEL' },
      { title: 'CLIENTE', key: 'CLIENTE' },
      { title: 'Actions', key: 'actions', sortable: false }
      
    ]
  },
  mutations:{
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
    updateChaleco({ commit }, payload) {
      commit('UPDATE_CHALECO', payload);
    },
    createChaleco({ commit }, payload) {
      commit('CREATE_CHALECO', payload);
    },
    deleteChaleco({ commit }, payload) {
      commit('DELETE_CHALECO', payload);
    },
  }
  
}
