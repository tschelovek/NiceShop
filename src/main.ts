import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {store, key} from "./store/store";
import router from "./router";

createApp(App)
    .use(store, key)
    .use(router)
    .mount('#app')
