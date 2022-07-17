import "./assets/less/antd.less";

import { createApp } from "vue";
import { createPinia } from "pinia";
import Antd from "ant-design-vue";
import App from "./App.vue";
import router from "./router";
import HighchartsVue from "highcharts-vue";

const app = createApp(App);

app.use(createPinia()).use(Antd).use(router).use(HighchartsVue).mount("#app");
