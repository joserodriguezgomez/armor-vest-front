export default {
    namespaced: true,
    state: {
      polizas:   [
        {
          _id: '61d5a3ef1234567890123456',
          numeroPoliza: "20230001",
          serie: "SERIE2023A",
          chalecos: [
            '61d5a3ef1234567890123457',
            '61d5a3ef1234567890123458'
          ]
        },
        {
          _id: '61d5a3ef1234567890123459',
          numeroPoliza: "20230002",
          serie: "SERIE2023B",
          chalecos: [
            '61d5a3ef1234567890123460'
          ]
        }
      ]
    },
    getters: {
      getPolizas: state => state.polizas
    },
    // mutations y actions si las necesitas
  };
  

