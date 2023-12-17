//index.js

import { createStore } from 'vuex';
import polizas from './modules/polizas';
import ventas from './modules/ventas';
import clientes from './modules/clientes';
import usuarios from './modules/usuarios';

export default createStore({
  modules: {
    polizas,
    ventas,
    clientes,
    usuarios

  }
});
