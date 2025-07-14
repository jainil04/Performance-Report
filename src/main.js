import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import PrimeVue from 'primevue/config';

const app = createApp(App);

app.use(ElementPlus);
app.use(router);
app.use(PrimeVue);
app.mount("#app");