import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login/Login.vue";
import Home from "./views/Home/Home.vue";
import User from "./views/User/User.vue";
import Roles from "./views/Roles/Roles.vue";
import Rights from "./views/Rights/Rights.vue";

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
        },
        {
          path: "/roles",
          component: Roles
        },
        {
          path: "/rights",
          component: Rights
        }
      ]
    }
  ]
});
