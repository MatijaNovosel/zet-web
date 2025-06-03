import i18n from "@/i18n";
import ComponentsPlugin from "@/plugins/components";
import { loadFonts } from "@/plugins/fontLoader";
import pinia from "@/plugins/pinia";
import vuetify from "@/plugins/vuetify";
import router from "@/router";
import { createApp } from "vue";
import App from "./App.vue";

import "leaflet/dist/leaflet.css";
import "./style/site.scss";

loadFonts();

const app = createApp(App);

app.use(vuetify);
app.use(router);
app.use(pinia);
app.use(i18n);
app.use(ComponentsPlugin);

app.mount("#app");
