/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import store from '@/store'
import axios from 'axios';
// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.auth.token}`;

const app = createApp(App)

registerPlugins(app)

app.use(store)
app.mount('#app')



