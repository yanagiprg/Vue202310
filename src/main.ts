import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./assets/styles.css";
import DialogComponent from "@/components/shared/DialogComponent.vue";
import LoadingComponent from "@/components/shared/LoadingComponent.vue";

const app = createApp(App as any);
app.component("DialogComponent", DialogComponent as any);
app.component("LoadingComponent", LoadingComponent as any);

app.use(router);
app.use(store);
app.mount("#app");
