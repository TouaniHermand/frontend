import "bootstrap/dist/css/bootstrap.min.css";
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";

const app = createApp(App);

// Assurez-vous que Pinia est utilisé avant tout autre code
app.use(createPinia());

app.mount("#app");
