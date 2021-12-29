import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'

let app;

if (!app) {
  app = createApp(App);
  app.config.globalProperties.$axios = axios;
  app.mount("#app");
}