//index.js

import { createStore } from 'vuex';
import polizas from './modules/polizas';
import ventasModule from './modules/ventas';
import clientesModule from './modules/clientes';

export default createStore({
  modules: {
    polizas,
    ventasModule,
    clientesModule

  }
});
