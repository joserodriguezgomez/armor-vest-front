const polizas = [
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
  
  
  const chalecos = [
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
  
  
  function resumenPolizas() {
    return polizas.map(poliza => {
      const cantidadDeChalecos = chalecos.filter(chaleco => chaleco.polizaId === poliza._id).length;
      return {
        numeroPoliza: poliza.numeroPoliza,
        serie: poliza.serie,
        cantidadDeChalecos: cantidadDeChalecos
      }
    })
  }
  
  
  function buscarChalecosPorPolizaYSerie(idPoliza, serie) {
    // Primero, encuentra la póliza que coincide con el ID y la serie proporcionados
    const polizaEncontrada = polizas.find(poliza => poliza._id === idPoliza && poliza.serie === serie);
  
    // Si no se encuentra la póliza, retorna un array vacío
    if (!polizaEncontrada) {
      console.log("no se encontro la poliza")
      return [];
    }
  
    // Filtra y devuelve los chalecos que están asociados con la póliza encontrada
    return chalecos.filter(chaleco => chaleco.polizaId === idPoliza);
  }
  

  const result = buscarChalecosPorPolizaYSerie('61d5a3ef1234567890123456', 'SERIE2023A');
  console.log(result);
  