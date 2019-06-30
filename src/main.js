import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/index.css";

Vue.use(ElementUI);

Vue.config.productionTip = false;

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

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
