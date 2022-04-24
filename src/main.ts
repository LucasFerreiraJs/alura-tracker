import { createApp } from 'vue'
import App from './App.vue'

//rotas
import router from "./router"

//css
import "@fortawesome/fontawesome-free/css/all.css";
import { key, store } from './store';

createApp(App)
  .use(router)
  .use(store, key)
  .mount('#app')
