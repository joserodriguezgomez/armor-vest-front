import { createStore } from 'vuex';
import polizas from './modules/polizas';
import chalecos from './modules/chalecos';
import menu from './modules/menu';


export default createStore({
  modules: {
    polizas,
    chalecos,
    menu

  }
});
