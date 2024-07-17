import axios from "axios";

export default {
    namespaced: true,
    state: {
      urlMode : "http://127.0.0.1:8000/api/",
      // urlMode : "https://armor-vest-backend-fb07262d3ec2.herokuapp.com/api",
      fields: [
        { label: 'FACTURA', model: 'factura' },
        { label: 'GD', model: 'gd' },
        { label: 'CLIENTE', model: 'id_cliente' },
        { label: 'ID CHALECO', model: 'id_producto' },
        // { label: 'FECHA VENTA', model: 'fecha_venta' },
        { label: 'PRECIO', model: 'precio' },
        // ... otros campos
      ],
      ventas:[],
      ventasHeaders:[
        { title: "ID", key: "id_venta" },
        { title: "ID CHALECO", key: "id_producto" },
        { title: "FACTURA", key: "factura" },
        { title: "GD", key: "gd" },
        { title: "FECHA VENTA", key: "fecha_venta" },
        { title: 'PRECIO', key: 'precio'},
        { title: 'MODELO', key: 'modelo' },
        { title: "STATUS", key: "status" },
        { title: "TALLA", key: "talla" },
        { title: 'LOTE', key: 'lote' },
        { title: "SERIE", key: "serie" },
        { title: "IDIC", key: "idic" },
        { title: "POLIZA NOMBRE", key: "poliza_nombre" },
        { title: "VENCIMIENTO POLIZA", key: "fecha_poliza_vencimiento" },
        { title: "VENCIMIENTO PANEL", key: "vencimiento_chelco" },
        { title: "VENCIMIENTO FUNDA", key: "vencimiento_funda" },
        { title: "CLIENTE", key: "nombre" },
        { title: 'DUP ESTADO', key: 'dup_status' },
        { title: "Acción", key: "actions", sortable: false },
      ]
    },
    mutations:{
      SET_VENTA(state, data){
        state.ventas=data
      },
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
      async leerVentas({ commit, state }){
        const url = state.urlMode +"ventas";
        const response = await axios.get(url);
        console.log(response.data)
        const idicsFormateados = response.data.map(idic => ({
          
          ...idic,
          fecha_poliza: formatearFecha(idic.fecha_poliza),
          fecha_poliza_vencimiento: formatearFecha(idic.fecha_poliza_vencimiento),
          fecha_venta: formatearFecha(idic.fecha_venta),
          fecha_creacion: formatearFecha(idic.fecha_creacion)
        }));
        commit("SET_VENTA", idicsFormateados);
      },
      async updateVentas({ dispatch, state }, payload) {

        payload.item.precio = parseFloat(payload.item.precio);
        payload.item.comentarios = "bla"
        
        const url = state.urlMode + `ventas/${payload.item._id}`;
        // payload.item.fecha_poliza = convertirDDMMYYYYaISO(payload.item.fecha_poliza);
        // payload.item.fecha_poliza_vencimiento = convertirDDMMYYYYaISO(payload.item.fecha_poliza_vencimiento);
        payload.item.fecha_venta = convertirDDMMYYYYaISO(payload.item.fecha_venta)
        // payload.item.fecha_creacion = convertirDDMMYYYYaISO(payload.item.fecha_creacion)
         // Incluye el ID en la URL
        console.log(payload.item)
        await axios.put(url, payload.item); // El segundo argumento es el cuerpo de la solicitud
        dispatch('leerVentas');
        // commit('UPDATE_DESSERT', payload.index,response.data);
      },
      async createVenta({ dispatch, state }, payload) {
        console.log(payload.item)
        const url=  state.urlMode + "ventas"
        // payload.item.fecha_poliza = convertirDDMMYYYYaISO(payload.item.fecha_poliza);
        // payload.item.fecha_venta = convertirDDMMYYYYaISO(payload.item.fecha_venta);
        console.log(payload.item)
        await axios.post(url, payload.item);
        dispatch('leerVentas');
      },
      async deleteVenta({ dispatch, state }, payload) {
        const url = state.urlMode + `ventas/${payload.item._id}`;
        await axios.delete(url);
        dispatch('leerVentas');
      },
      
    }
    
    // mutations y actions si las necesitas
  }


  function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // getMonth() es base-0
    const año = fecha.getFullYear();
    // const hora = fecha.getHours().toString().padStart(2, '0');
    // const minutos = fecha.getMinutes().toString().padStart(2, '0');
    return `${dia}-${mes}-${año}`;
  }
  
  
  function convertirDDMMYYYYaISO(fechaDDMMYYYY) {
    const [dia, mes, año] = fechaDDMMYYYY.split('-');
    const fecha = new Date(año, mes - 1, dia);
    return fecha.toISOString();
  }