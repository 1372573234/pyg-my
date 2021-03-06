import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login/Login.vue";
import Home from "./views/Home/Home.vue";
import User from "./views/User/User.vue";
import Roles from "./views/Roles/Roles.vue";
import Rights from "./views/Rights/Rights.vue";
import Goods from "./views/Goods/Goods.vue";
import Categories from "./views/Goods/Categories.vue";
import Goods_add from "./views/Goods/Goods-add.vue";

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
          path: "/users",
          component: User
        },
        {
          path: "/roles",
          component: Roles
        },
        {
          path: "/rights",
          component: Rights
        },
        {
          path: "/goods",
          component: Goods
        },
        {
          path: "/categories",
          component: Categories
        },
        {
          path: "/goods-add",
          component: Goods_add
        }
      ]
    }
  ]
});
