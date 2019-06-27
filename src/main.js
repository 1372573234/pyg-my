import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/index.css";

Vue.use(ElementUI);

Vue.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

Vue.config.productionTip = false;
