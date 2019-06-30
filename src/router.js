import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Home from "./views/Home.vue";
import User from "./views/User.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/login",
      // name: "login",
      component: Login
    },
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      // name: "login",
      component: Home,
      children: [
        {
          path: "/user",
          component: User
        }
      ]
    }
  ]
});
