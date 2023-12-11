export default {
    namespaced: true,
    state: {
      chalecos:   [
        {
          _id: '61d5a3ef1234567890123457',
          polizaId: '61d5a3ef1234567890123456',
          fechaElaboracion: "2023-01-10",
          fechaVencimiento: "2028-01-10",
          talla: "M",
          cliente: {
            nombre: "Ana Martínez",
            contacto: "ana.martinez@example.com"
          }
        },
        {
          _id: '61d5a3ef1234567890123458',
          polizaId: '61d5a3ef1234567890123456',
          fechaElaboracion: "2023-01-15",
          fechaVencimiento: "2028-01-15",
          talla: "L"
        },
        {
          _id: '61d5a3ef1234567890123460',
          polizaId: '61d5a3ef1234567890123459',
          fechaElaboracion: "2023-02-01",
          fechaVencimiento: "2028-02-01",
          talla: "S",
          cliente: {
            nombre: "Carlos López",
            contacto: "carlos.lopez@example.com"
          }
        }
      ]
    },
    getters: {
      getChalecos: state => state.chalecos
    },
    // mutations y actions si las necesitas
  };