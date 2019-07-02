import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/index.css";

import axios from "axios";

Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  // eslint-disable-next-line no-console

  if (to.path === "/login") {
    next();
  }

  if (localStorage.getItem("token")) {
    next();
  } else {
    router.push("/login");
  }

  // console.log(to, from);
});

axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";

axios.interceptors.request.use(function(config) {
  config.headers.Authorization = localStorage.getItem("token");
  return config;
});

Vue.prototype.$http = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
