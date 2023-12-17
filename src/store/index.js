
import { createStore } from 'vuex';
import polizas from './modules/polizas';
import chalecos from './modules/chalecos';
import ventas from './modules/ventas';
import usuarios from './modules/usuarios';
import clientes from './modules/clientes';
import menu from './modules/menu';



export default createStore({
  modules: {
    polizas,
    ventas,
    chalecos,
    usuarios,
    clientes,
    menu
  }
});
