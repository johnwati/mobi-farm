// import "ant-design-vue/dist/antd.css";
// import "ant-design-vue/dist/antd.less";
import "./assets/less/antd.less";

import { createApp } from "vue";
import { createPinia } from "pinia";
import Antd from "ant-design-vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia()).use(Antd).use(router).mount("#app");
