
import { createStore } from 'vuex';
import products from './modules/products';
import auth from './modules/auth';
import usuarios from './modules/usuarios';


export default createStore({
  modules: {
    products,
    auth,
    usuarios

  }
});
