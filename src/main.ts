import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./assets/styles.css";
import DialogComponent from "@/components/shared/DialogComponent.vue";
import LoadingComponent from "@/components/shared/LoadingComponent.vue";

const app = createApp(App);
app.component("DialogComponent", DialogComponent);
app.component("LoadingComponent", LoadingComponent);

app.use(router);
app.use(store);
app.mount("#app");
