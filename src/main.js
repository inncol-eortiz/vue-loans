import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

import "./style.css";

import { createApp } from "vue";
import { VueQueryPlugin } from "@tanstack/vue-query";

const pinia = createPinia();
const app = createApp(App);

app.use(VueQueryPlugin);
app.use(pinia);
app.use(router);
app.mount("#app");
